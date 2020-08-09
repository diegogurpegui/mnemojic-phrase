const { program } = require('commander');
const utils = require('./src/utils');

program.version('0.1.0');

program
  .command('convert <mnemonicPhrase>')
  .description('Covert a mnemonic phrase from one language to the other')
  .option('--sourcelang <sourceLang>', 'Source language')
  .option('--destlang <destLang>', 'Destination language')
  .action((mnemonicPhrase, options) => {
    const sourceLang = options.sourcelang;
    const destLang = options.destlang;

    console.log(`Converting phrase from '${sourceLang}' to '${destLang}'`);

    const mnemonicWords = mnemonicPhrase.split(' ');
    const convertedMnemonic = utils.convertMnemonic(mnemonicWords, sourceLang, destLang);
    console.log(convertedMnemonic.join(' '));
  });

program.parse(process.argv);
