// ********** NGRX **********
import { createAction, props } from '@ngrx/store'

// ********** MODELS **********
import { Youtube } from '../../../models/youtube'

export const initApp = createAction('[Youtube] Init App')

export const getYoutubePlaylists = createAction(
  '[Youtube] Get Youtube Playlists',
  props<{ youtubePlaylists: Youtube['playlists'][] }>()
)
