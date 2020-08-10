import 'bootstrap';
import './scss/main.scss';
import processor from './mnemojicProcessor';

document.addEventListener('DOMContentLoaded', function () {
  console.log('Site loaded');

  const convertForm = document.getElementById('mnemonic-convert-form');
  convertForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();

      const errorDiv = document.getElementById('mnemonic-convert-error');

      // cleanup error
      errorDiv.innerHTML = '';
      try {
        const sourcePhrase = document.getElementById('source-phrase').value;
        const destLang = document.getElementById('dest-lang').value;

        const convertedMnemonic = processor.convertMnemonic(sourcePhrase, undefined, destLang);
        document.getElementById('dest-phrase').value = convertedMnemonic.join(' ');
      } catch (e) {
        console.log('Error converting', e);
        errorDiv.innerHTML = 'Error converting. ' + e.message;
      }
    },
    false,
  );
});
