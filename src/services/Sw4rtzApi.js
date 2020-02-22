import axios from 'axios';
import { SW4RTZIT_API, ARWEAVE_EXPLORER } from '../constants'

export const Sw4rtzAPI = {
  // Get a list of all existing articles
  all: () => axios.get(`${SW4RTZIT_API}/all`).then(res => res.data),

  // Create a link to the Arweave explorer from a transaction id
  getExplorerLink: (txId) => `${ARWEAVE_EXPLORER}/${txId}`

}
