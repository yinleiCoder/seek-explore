'use client'

import { auth } from '@/lib/firebase'
import { Action, ActionType, State, initState, reducer } from '@/reducers/AppReducer'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

type AppContextProps = {
  state: State
  dispatch: Dispatch<Action>
  googleSignIn: () => Promise<void>
  googleSignOut: () => Promise<void>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState)

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      dispatch({
        type: ActionType.UPDATE,
        field: 'user',
        value: currentUser,
      })
    })
    return () => unsubscribe()
  }, [state.user])

  const googleSignOut = async () => {
    await signOut(auth)
  }

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
      googleSignIn,
      googleSignOut,
    }
  }, [state, dispatch])

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
