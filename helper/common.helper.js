'use strict'

const compileText = (text, config) => {
  // console.log(text,'///', config)

  Object.keys(config).forEach(key => {
    console.log(key,JSON.stringify(text))
    text = text.replace(`{{${key}}}`, config[key])
  });
  // console.log(text,'text')
  return text;
};

const stringPad = (text = '', pad = 2, padChar = '0') => {
  let length = text.length;
  if (length < Number(pad)) {
    for (let i = 1; i <= pad - length; i++) {
      text = padChar + text;
    }
  }
  return text;
};


module.exports = {
  compileText,
  stringPad
}