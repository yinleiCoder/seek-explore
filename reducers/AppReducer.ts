import { User } from 'firebase/auth'

export type State = {
  user: User | null
  token: string | null
  idToken: string | null
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
  token: '',
  idToken: '',
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
