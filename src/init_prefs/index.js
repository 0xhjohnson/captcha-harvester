import * as pino from 'pino';
import chalkPipe from 'chalk-pipe';
import { existsSync, mkdir } from 'fs';
import { promisify } from 'util';
import { colors } from '../theme';
import { captchaPath } from '../utils';

const logger = pino();
const mkdirAsync = promisify(mkdir);

const initPrefs = async () => {
  try {
    if (!existsSync(captchaPath)) {
      await mkdirAsync(captchaPath, { recursive: true });
    }
    console.log(
      chalkPipe(colors.slightGreen)(
        'captcha harvester successfully initialized'
      )
    );
  } catch (err) {
    logger.error(err);
  }
};

export default initPrefs;
