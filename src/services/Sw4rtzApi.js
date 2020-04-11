import axios from 'axios';
import { SW4RTZIT_API, ARWEAVE_VIEW_TX } from '../constants'

export const Sw4rtzAPI = {
  // Get a list of all existing articles
  all: () => axios.get(`${SW4RTZIT_API}/all`).then(res => res.data),

  // Create a link to the Arweave explorer from a transaction id
  getExplorerLink: (txId) => `${ARWEAVE_VIEW_TX}/${txId}`,

  permify: (doi) => axios({
      method: 'post',
      url: `${SW4RTZIT_API}/new`,
      data: {
        arXivID: doi
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.data),

  get: (doi) => axios.get(`${SW4RTZIT_API}/arXivID/${doi}`).then(res => res.data)
}
