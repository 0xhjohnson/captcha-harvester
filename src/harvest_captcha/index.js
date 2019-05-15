import Koa from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import harvestCaptcha from './harvestCaptcha';

const app = new Koa();
const router = new Router();

const captchaApp = async () => {
  const captchaBank = [];
  const port = 3001;

  console.log(`Captcha app listening on port ${port}`);

  await harvestCaptcha(captchaBank);

  router.get('/fetch', koaBody(), ctx => {
    ctx.request.body = captchaBank;
    ctx.body = JSON.stringify(ctx.request.body);
    captchaBank.splice(0, 1);
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(port);
};

export default captchaApp;
