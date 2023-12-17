'use client'

import { auth } from '@/lib/firebase/firebase'
import { Action, ActionType, State, initState, reducer } from '@/reducers/AppReducer'
import {
  GoogleAuthProvider,
  getIdToken,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import toast from 'react-hot-toast'

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
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential!.accessToken
      dispatch({
        type: ActionType.UPDATE,
        field: 'token',
        value: token,
      })
      // idToken which firebase admin sdk to verify user at custom nextjs app router handle
      const idToken = await result.user.getIdToken(true)
      dispatch({
        type: ActionType.UPDATE,
        field: 'idToken',
        value: idToken,
      })
      const user = result.user
      dispatch({
        type: ActionType.UPDATE,
        field: 'user',
        value: user,
      })
      toast.custom(t => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-3`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photoURL ?? ''}
                  alt={user.displayName ?? ''}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-900">{user.displayName}</p>
                <p className="mt-1 text-sm text-gray-500">欢迎亲亲访问本站~</p>
              </div>
            </div>
          </div>
        </div>
      ))
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
      if (!state.idToken && auth.currentUser) {
        getIdToken(auth.currentUser).then(token => {
          dispatch({
            type: ActionType.UPDATE,
            field: 'idToken',
            value: token,
          })
        })
      }
    })
    return () => unsubscribe()
  }, [state.user, state.idToken])

  const googleSignOut = async () => {
    await signOut(auth)
    dispatch({
      type: ActionType.UPDATE,
      field: 'token',
      value: '',
    })
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
