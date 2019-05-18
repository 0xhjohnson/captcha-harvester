[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![Install Size][size]][size-url]
[![Downloads][downloads]][downloads-url]

- [About](#about)
  - [How to install](#how-to-install)
  - [Commands](#commands)
- [Getting started](#getting-started)

## About

captcha-harvester spins up a localhost server to harvest captchas from supremenewyork. Uses [puppeteer](https://github.com/GoogleChrome/puppeteer) project to open chromium browsers. Google account one click support via cookies. Cookies can be retrieved via a basic request to `localhost:3001/fetch`. Captcha tokens are removed on successful fetch.

### How to install

Installing from [npm](https://www.npmjs.com/package/captcha-harvester) is the easiest way to get up and running. 

npm: `npm install captcha-harvester -g`
yarn: `yarn global add captcha-harvester`

### Commands

captcha-harvester supports a few commands to make things easy.

- `captcha-harvester -h|--help` - Returns all available commands.
- `captcha-harvester init|initialize` - Initialize captcha preferences.
- `captcha-harvester sg|setgoogle` - Set Google account to be used.
- `captcha-harvester hc|harvestcaptcha` - Starts localhost server to harvest captcha tokens.

## Getting started

After installation to increase our likelihood of getting one-clicks, we are going to first initalize captcha-harvester with `captcha-harvester init` then we can run `captcha-harvester sg` to set the google account we are going to use. Your Google account information is stored locally in your appdata path.

```sh
captcha-harvester init
captcha-harvester sg
captcha-harvester hc
```

You now have a captcha-harvester running at `localhost:3001`. To retrieve captcha tokens make a request to `loclahost:3001/fetch`.

[deps]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Funtitled-m9syrx0900b2.runkit.sh%2Fdeps
[deps-url]: https://david-dm.org/0xhjohnson/captcha-harvester
[downloads]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Funtitled-m9syrx0900b2.runkit.sh%2Fdownloads
[downloads-url]: https://www.npmjs.com/package/captcha-harvester
[npm]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Funtitled-m9syrx0900b2.runkit.sh%2Fnpm
[npm-url]: https://www.npmjs.com/package/captcha-harvester
[size]: https://packagephobia.now.sh/badge?p=captcha-harvester
[size-url]: https://packagephobia.now.sh/result?p=captcha-harvester
