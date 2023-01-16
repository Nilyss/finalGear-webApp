// ********** NGRX **********
import { Action, createReducer, on } from '@ngrx/store'

// ********** MODELS **********
import { Youtube } from '../../../models/youtube'

// ********** ACTIONS **********
import * as YoutubeActions from './youtubeAction'

export interface YoutubeState {
  isDataLoaded: boolean
  youtubePlaylists: Youtube['playlists'][]
}

export const initialState: YoutubeState = {
  isDataLoaded: false,
  youtubePlaylists: null,
}

export const youtubeDatasReducer = createReducer(
  initialState,
  on(YoutubeActions.initApp, (state) => ({
    ...state,
    isDataLoaded: false,
  })),
  on(YoutubeActions.getYoutubePlaylists, (state, props) => ({
    ...state,
    isDataLoaded: true,
    youtubePlaylists: props.youtubePlaylists,
  }))
)

export function YoutubeDatasReducer(state: YoutubeState, action: Action) {
  return youtubeDatasReducer(state, action)
}
