import { parseString } from 'xml2js';

export const parseXML = (xmlStr) => {
  return new Promise((resolve, reject) => {
    parseString(xmlStr, (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

// From: http://arxiv.org/abs/2002.00012v1
// to: 2002.00012v1
// We use reduceRight - without second arg - to get last elem in array
// SO: https://stackoverflow.com/a/52349873/2057532
export const arXivIDFromURL = (url) => url.split('/').reduceRight(l => l)


export const truncate = ({ str, start, end }) => {
  const ellipsis = '...';
  return str.length > start + end + ellipsis.length ?
    `${str.substring(0, start)}${ellipsis}${str.substring(str.length - end)}`
    : str
}
