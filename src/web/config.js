const config = {
  api: {
    baseApiURL: "/api",
    baseURL: process.env.BASE_URL,
    hostPath: process.env.HOST_PATH,
  },
  session: {
    localStorageKey: "airnes-session",
  },
}

export default config
