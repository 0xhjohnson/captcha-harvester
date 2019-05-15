import * as pino from 'pino';
import pptr from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import renderPage from './renderPage';

const logger = pino();
pptr.use(pluginStealth());

const setGoogleAcct = async () => {
  try {
    const browser = await pptr.launch({
      headless: false,
      devtools: false,
    });
    await renderPage(browser);
  } catch (err) {
    logger.err(err);
  }
};

export default setGoogleAcct;
