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
      const sourcePhrase = document.getElementById('source-phrase').value;
      const mneminicWords = sourcePhrase.split(' ');

      const destLang = document.getElementById('dest-lang').value;

      const convertedMnemonic = processor.convertMnemonic(mneminicWords, undefined, destLang);
      document.getElementById('dest-phrase').value = convertedMnemonic.join(' ');
    },
    false,
  );
});
