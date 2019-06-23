import program from 'commander';
import chalkPipe from 'chalk-pipe';
import { colors } from './theme';
import initPrefs from './init_prefs';
import setGoogleAcct from './set_google_account';
import captchaApp from './harvest_captcha';

// display help if no command is entered
if (!process.argv.slice(2).length) {
  program.outputHelp(chalkPipe(colors.pastelRed));
}

// on unknown command output helpful info
program.on('command:*', () => {
  console.log(
    chalkPipe(colors.pastelRed)(`Invalid command: ${program.args.join(' ')}`)
  );
  console.log(`captcha-harvester --help for a list of available commands.`);
});

program
  .command('initialize')
  .alias('init')
  .description('Initialize captcha preferences')
  .action(() => initPrefs());

program
  .command('setgoogle')
  .alias('sg')
  .description('Set a Google account')
  .action(() => setGoogleAcct());

program
  .command('harvestcaptcha')
  .option('-s, --set', 'Set different site than supreme')
  .arguments('[url] [sitekey]')
  .alias('hc')
  .description('Harvest captcha tokens')
  .action((url, sitekey) => captchaApp(url, sitekey));

program.parse(process.argv);
