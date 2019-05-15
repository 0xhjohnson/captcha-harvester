import path from 'path';

const appDataPath =
  process.env.APPDATA ||
  (process.platform === 'darwin'
    ? `${process.env.HOME}/Library/Preferences`
    : `${process.env.HOME}/.local/share`);

const captchaPath = path.join(appDataPath, '/captcha/');
const cookiesPath = path.join(appDataPath, '/captcha/cookies.json');

export { captchaPath, cookiesPath };
