import pptr from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import to from 'await-to-js';
import dayjs from 'dayjs';
import chalkPipe from 'chalk-pipe';
import { map } from 'ramda';
import { colors } from '../theme';
import { restoreCookies } from '../utils';
import captchaTemplate from './captchaTemplate';

pptr.use(pluginStealth());

const harvestCaptcha = async captchaBank => {
  const options = {
    width: 480,
    height: 750,
    host: 'http://supremenewyork.com/',
    sitekey: '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz',
  };

  const browser = await pptr.launch({
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--ignore-certificate-errors',
      '--enable-features=NetworkService',
      '--allow-running-insecure-content',
      '--disable-web-security',
      `--window-size=${options.width},${options.height}`,
    ],
  });

  const [err, page] = await to(browser.newPage());
  if (err) throw new Error('Failed to create new captcha browser');

  await page.setViewport({
    width: 480,
    height: 750,
  });

  await page.setUserAgent(
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36`
  );

  await restoreCookies(page);

  await page.setRequestInterception(true);

  const captchaReset = () => window.grecaptcha.reset();

  await page.exposeFunction('sendCaptcha', token => {
    const captchaItem = {
      token,
      timestamp: dayjs().format(),
      host: options.host,
      sitekey: options.sitekey,
    };

    captchaBank.push(captchaItem);

    (async () => {
      await page.evaluate(captchaReset);
    })();
  });

  const isCaptchaExpired = captcha => {
    const currTime = dayjs();
    const bankTime = dayjs(captcha.timestamp);
    if (currTime.diff(bankTime, 'second') > 90) {
      console.log(
        chalkPipe(colors.slightOrange)('Removing Expired Captcha Token')
      );
      captchaBank.splice(0, 1);
    }
  };

  // every second check if captcha is expired
  // expired- captcha greater than 1.5 minutes old
  setInterval(() => {
    if (captchaBank.length > 0) {
      map(isCaptchaExpired, captchaBank);
    }
  }, 1000);

  page.on('request', req => {
    if (req.url() === options.host) {
      req.respond({
        status: 200,
        contentType: 'text/html',
        body: captchaTemplate,
      });
    } else {
      req.continue();
    }
  });

  await page.goto(options.host);
};

export default harvestCaptcha;
