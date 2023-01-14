// ********** NGRX **********
import { Action, createReducer, on } from '@ngrx/store'

// ********** MODELS **********
import { FinalGear } from '../../../models/finalGear'

// ********** ACTIONS **********
import * as FinalGearActions from './finalGearAction'

export interface FinalGearState {
  isDataLoaded: boolean
  finalGearInfo: FinalGear
}

export const initialSate: FinalGearState = {
  isDataLoaded: false,
  finalGearInfo: null,
}

export const finalGearReducer = createReducer(
  initialSate,
  on(FinalGearActions.initApp, (state) => ({
    ...state,
    isDataLoaded: false,
  })),
  on(FinalGearActions.getFinalGearInfos, (state, props) => ({
    ...state,
    isDataLoaded: true,
    finalGearInfo: props.finalGearInfo,
  }))
)

export function FinalGearInfoReducer(
  state: FinalGearState | undefined,
  action: Action
) {
  return finalGearReducer(state, action)
}
