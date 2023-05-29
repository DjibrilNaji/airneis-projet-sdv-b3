import config from "@/web/config.js"
import axios from "axios"

const createAPIClient = ({ jwt, server } = {}) =>
  axios.create({
    baseURL: server ? config.api.baseURL : config.api.baseApiURL,
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
  })

export default createAPIClient
