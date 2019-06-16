const settings = {
  sitekey: '6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF',
};
const { sitekey } = settings;

const captchaTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Captcha Harvester</title>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <style>
    .flex {
      display: flex;
    }
    .justify-center {
      justify-content: center;
    }
    .items-center {
      align-items: center;
    }
    .mt-6 {
      margin-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="flex justify-center items-center mt-6">
    <div id="captchaFrame" class="g-recaptcha" data-callback="sendCaptcha" data-sitekey=${sitekey} data-theme="dark"></div>
  </div>
</body>
</html>
`;

export default captchaTemplate;
