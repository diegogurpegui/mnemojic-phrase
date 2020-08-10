const fs = require('fs');
const path = require('path');
// this JSON was taken from https://github.com/amio/emoji.json
const emojis = require('./emoji.json');

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
 * Generate the wordlist of emojis
 */
const generateEmojiFiles = () => {
  // lists of Unicode emojis for the first and second half of the "word"
  const firstEmojiCodeList = [
    '1F600',
    '1F604',
    '1F601',
    '1F606',
    '1F605',
    '1F923',
    '1F602',
    '1F642',
    '1F643',
    '1F609',
    '1F60A',
    '1F607',
    '1F970',
    '1F60D',
    '1F929',
    '1F618',
    '1F617',
    '1F61A',
    '1F619',
    '1F60B',
    '1F61B',
    '1F61C',
    '1F92A',
    '1F61D',
    '1F911',
    '1F917',
    '1F92D',
    '1F92B',
    '1F914',
    '1F910',
    '1F928',
    '1F610',
    '1F611',
    '1F636',
    '1F60F',
    '1F612',
    '1F644',
    '1F62C',
    '1F925',
    '1F60C',
    '1F614',
    '1F62A',
    '1F924',
    '1F634',
    '1F637',
    '1F912',
    '1F915',
    '1F922',
    '1F92E',
    '1F927',
    '1F975',
    '1F976',
    '1F974',
    '1F635',
    '1F92F',
    '1F920',
    '1F973',
    '1F60E',
    '1F913',
    '1F9D0',
    '1F615',
    '1F61F',
    '1F641',
    '1F62E',
  ];
  const secondEmojiCodeList = [
    '1F44B',
    '1F91A',
    '1F590',
    '1F596',
    '1F44C',
    '1F91E',
    '1F91F',
    '1F918',
    '1F919',
    '1F448',
    '1F449',
    '1F446',
    '1F595',
    '1F447',
    '1F44D',
    '1F44E',
    '1F44A',
    '1F91B',
    '1F91C',
    '1F44F',
    '1F64C',
    '1F450',
    '1F932',
    '1F91D',
    '1F64F',
    '1F4AA',
    '1F9B5',
    '1F9B6',
    '1F442',
    '1F443',
    '1F9E0',
    '1F440'
  ];

  const usableEmojis = {
    first: [],
    second: [],
  };

  for (let e = 0; e < emojis.length; e++) {
    const emoji = emojis[e];

    if (firstEmojiCodeList.indexOf(emoji.codes) >= 0) {
      usableEmojis.first.push(emoji);
    } else if (secondEmojiCodeList.indexOf(emoji.codes) >= 0) {
      usableEmojis.second.push(emoji);
    }
  }

  console.log(`First half emoji count: ${usableEmojis.first.length}`); // 64
  console.log(`Second half emoji count: ${usableEmojis.second.length}`); // 32

  const mnemonicEmojis = [];
  let wordIndex = 0;
  // now generate the words made up of emojis
  for (let f = 0; f < usableEmojis.first.length; f++) {
    const firstEmoji = usableEmojis.first[f];
    for (let s = 0; s < usableEmojis.second.length; s++) {
      const secondEmoji = usableEmojis.second[s];

      const wordmoji = {
        index: wordIndex,
        codes: `${firstEmoji.codes} ${secondEmoji.codes}`,
        text: `${firstEmoji.char}${secondEmoji.char}`,
      };
      mnemonicEmojis.push(wordmoji);

      wordIndex += 1;
    }
  }

  // prepare a JSON file for future use and reference
  fs.writeFileSync('./mnemonic-emojis.json', JSON.stringify(mnemonicEmojis));

  // prepare the wordlist text file
  const wordlist = mnemonicEmojis.map((e) => e.text).join('\n');
  fs.writeFileSync('./langs/emoji.txt', wordlist);
};

/**
 * Load the word lists for each language into the wordlists file
 */
const generateWordlistsFiles = () => {
  const wordlists = {};

  for (let l = 0; l < supportedLangs.length; l++) {
    const lang = supportedLangs[l];

    const wordlistText = fs.readFileSync(path.join(__dirname, './langs', `${lang}.txt`), { encoding: 'utf-8' });
    const wordList = wordlistText.split('\n');
    wordlists[lang] = wordList;
  }

  // save to file
  fs.writeFileSync('./wordlists.json', JSON.stringify(wordlists));
};

generateEmojiFiles();
generateWordlistsFiles();
