# Mnemojic-phrase

The mnemonic languange that nobody asked for: **emojis**<br/>
And the tool that nobody asked for: the mnemomnic phrase lang converter.

Based on the [BIP 39 spec](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

## Web tool

You have a web tool available here:<br/>
https://diegogurpegui.com/mnemojic-phrase

The files for that web version are automatically served from the "web" directory in this repo.

## CLI tool

There is also a cli tool un Node.js that you can use by running:
```
$ node cli convert [options] <mnemonicPhrase>
```

Options:
* `--sourcelang <sourceLang>`<br/>
  Source language
* `--destlang <destLang>`<br/>
  Destination language
* `-h, --help`<br/>
  Display help for command

The `<mnemonicPhrase>` is just the mnemonicPhrase.

## Emojis selection and word list

I selected a group of 64 emojis that are combined with another group of 32 emojis to form 2048 two-emojis words.

The reason for this is that I wanted emojis that can occupy only one character, which leaves us with less than 2048 emojis (the required amount to have a BIP39 word list).

Since we cannot get to the 2048 emojis I decided to use two-emoji words. I selected 64 emojis from the "smiley faces" group and 32 emojis from the "hands and body" group. This was done arbitrarily based on emojis that are widely supported, and look distinctively enough.

The wordlist can be found here:<br/>
https://github.com/diegogurpegui/mnemojic-phrase/blob/master/utils/emoji.txt