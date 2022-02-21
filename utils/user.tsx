/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import fetch from 'isomorphic-unfetch'

// Global to save the user, so we don't have to fetch it again after page navigations
let userState: any

const User = React.createContext({ user: null, loading: false })

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState
  }

  const res = await fetch('/api/me')
  userState = res.ok ? await res.json() : null
  return userState
}

export const UserProvider = ( value: any, children: any ) => {
  const { user } = value

  // Add user to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user
    }
  }, [])

  return <User.Provider value={value}>{children}</User.Provider>
}

export const useUser = () => React.useContext(User)

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
  })

  React.useEffect(() => {
    if (userState !== undefined) {
      return
    }

    let isMounted = true

    fetchUser().then(user => {
      // Set user only component still mounted
      if (isMounted) {
        setUser({ user, loading: false })
      }
    })

    return () => {
      isMounted = false
    }
  }, [userState])

  return data
}
