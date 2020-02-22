import axios from 'axios';
import { SW4RTZIT_API } from '../constants'

export const Sw4rtzAPI = {
  all: () => axios.get(`${SW4RTZIT_API}/all`).then(res => res.data)
}
