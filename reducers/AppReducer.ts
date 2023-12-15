import { User } from 'firebase/auth'
import { THEME_DARK, THEME_LIGHT } from '../constants/theme'

type Theme = 'dark' | 'light'

export type State = {
  user: User | null
}

export enum ActionType {
  UPDATE = 'UPDATE',
}

type UpdateAction = {
  type: ActionType.UPDATE
  field: string
  value: any
}

export type Action = UpdateAction

// useReducer initState
export const initState: State = {
  user: null,
}

// useReducer
export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE: {
      return { ...state, [action.field]: action.value }
    }
    default:
      throw new Error('useReducer error!!!')
  }
}
