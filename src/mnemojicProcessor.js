const wordlists = require('./wordlists.json');

const supportedLangs = [
  'chinese_simplified',
  'chinese_traditional',
  'czech',
  'english',
  'french',
  'italian',
  'japanese',
  'korean',
  'spanish',
  'emoji',
];

/**
 *
 * @param {string[]} sourceWords
 * @param {string} sourceLang
 */
const convertMnemonic = (mnemonicWords, sourceLangArg, destLangArg) => {
  // --- Work on the source lang
  let sourceLang = '';
  // if the source lang was not specificied, then detected
  if (sourceLangArg === undefined) {
    const firstWord = mnemonicWords[0];
    for (let l = 0; l < supportedLangs.length; l++) {
      const lang = supportedLangs[l];
      if (wordlists[lang].indexOf(firstWord) >= 0) {
        // lang found
        sourceLang = lang;
        break;
      }
    }
    // if still couldn't find it, then error
    if (sourceLang == '') {
      throw new Error('The source phrase does not correspond to a known language.');
    }
  } else {
    sourceLang = sourceLangArg;
  }

  // --- Work on the destination lang
  let destLang = 'emoji';
  if (destLangArg !== undefined) {
    destLang = destLangArg;
  }

  // if the source language is equal to the dest lang, the no work to be done
  if (sourceLang === destLang) {
    return mnemonicWords;
  }

  // parse the words from one lang to the other
  const convertedMnemonic = [];
  for (let w = 0; w < mnemonicWords.length; w++) {
    const word = mnemonicWords[w];
    // get the index in the source lang
    const wordIndex = wordlists[sourceLang].indexOf(word);
    // get the word in the destination lang
    convertedMnemonic.push(wordlists[destLang][wordIndex]);
  }
  return convertedMnemonic;
};

module.exports = {
  convertMnemonic,
};
