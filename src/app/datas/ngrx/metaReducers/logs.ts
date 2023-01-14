import { Action, ActionReducer } from '@ngrx/store'

export function logMetaReducer<S, A extends Action>(
  reducer: ActionReducer<S, A>
): ActionReducer<S, A> {
  return function (state: S, action: A): S {
    const nextState = reducer(state, action)
    console.groupCollapsed(action.type)
    console.log('[Log Meta-Reducer] Previous state : ', state)
    console.log('[Log Meta-Reducer] Action : ', action)
    console.log('[Log Meta-Reducer] Next state : ', nextState)
    console.groupEnd()
    return nextState
  }
}
