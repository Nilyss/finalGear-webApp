// ********** NGRX **********
import { createAction, props } from '@ngrx/store'

// ********** MODELS **********
import { FinalGear } from '../../../models/finalGear'

export const initApp = createAction('[Final Gear] Init App')

export const getFinalGearInfos = createAction(
  '[Final Gear] Get Final Gear Infos',
  props<{ finalGearInfo: FinalGear }>()
)
