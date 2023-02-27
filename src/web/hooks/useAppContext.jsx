import config from "@/web/config.js"
import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
import signInService from "@/web/services/signIn.js"
import signUpService from "@/web/services/signUp.js"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { isPublicPage, ...otherProps } = props
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  // NFS: we inject all the deps to our actions here but declare them
  // in different files to not overburden the context declaration.
  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
  const signOut = useCallback(() => {
    localStorage.removeItem(config.session.localStorageKey)
    setSession(false)
  }, [])

  // NFS: we load the session in a useEffect hook, preventing SSR
  // to break because of localStorage (which is browser only).
  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT({ jwt })
  }, [])

  // NFS: if we're neither on a public nor the session has been
  // loaded through the useEffect, then let's make the user wait.
  // Technically this is useless as there is no network load, it's
  // done directly from the localStorage, but if it was the case,
  // then showing a loader may be useful. As for now, returning
  // (almost) anything even null would work just fine.

  if (!isPublicPage && session === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        actions: {
          signUp,
          signOut,
          signIn,
        },
        state: {
          session,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
