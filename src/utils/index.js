import { parseString } from 'xml2js';

export const parseXML = (xmlStr) => {
  return new Promise((resolve, reject) => {
    parseString(xmlStr, (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}
