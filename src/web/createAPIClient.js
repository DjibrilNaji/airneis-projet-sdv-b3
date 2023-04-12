import config from "@/web/config.js"
import axios from "axios"

const createAPIClient = ({ jwt } = {}) =>
  axios.create({
    baseURL: config.api.baseApiURL,
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
  })

export default createAPIClient
