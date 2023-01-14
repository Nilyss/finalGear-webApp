// ********** NGRX **********
import { createSelector } from '@ngrx/store'
import { FinalGearState } from './finalGearReducer'

export interface AppState {
  finalGearInfo: FinalGearState
}

export const finalGearInfo = (state: AppState) => state.finalGearInfo

export const selectFinalGearInfo = createSelector(
  finalGearInfo,
  (state: FinalGearState) => state.finalGearInfo
)
