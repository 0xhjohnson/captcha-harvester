import chalkPipe from 'chalk-pipe';
import { writeCookies } from '../utils';
import { colors } from '../theme';

const renderPage = async browser => {
  try {
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto('https://gmail.com');
    await page.waitForSelector('.aim', { timeout: 0 });
    await writeCookies(page);
    console.log(
      chalkPipe(colors.slightGreen)('Successfully saved google account.')
    );
    await browser.close();
  } catch (err) {
    console.log(err);
  }
};

export default renderPage;
