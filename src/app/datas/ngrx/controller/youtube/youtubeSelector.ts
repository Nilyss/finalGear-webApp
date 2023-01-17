// ********** NGRX **********
import { createSelector } from '@ngrx/store'
import { YoutubeState } from './youtubeReducer'

export interface AppState {
  youtubeDatas: YoutubeState
}

export const youtubeData = (state: AppState) => state.youtubeDatas

export const selectYoutubePlaylist = createSelector(
  youtubeData,
  (state: YoutubeState) => state.youtubePlaylists
)
