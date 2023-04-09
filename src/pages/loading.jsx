import RequiredSingnInPage from "./requiredSignIn/requiredSignInPage"
import React, { useEffect, useState } from "react"

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const publicState = LoadingPage.isPublic

  useEffect(() => {
    // Creating a timeout within the useEffect hook
    if (publicState == true) {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    } else {
      return <RequiredSingnInPage />
    }
  })

  if (isLoading) {
    return <div className="spinner">It's loading</div>
  }

  return (
    <>
      <div>Hello, World</div>
    </>
  )
}

LoadingPage.isPublic = true

export default LoadingPage
