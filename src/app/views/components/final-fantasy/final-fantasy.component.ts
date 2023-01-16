import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** SERVICES **********
import { YoutubeService } from '../../../datas/services/youtube.service'

// ********** MODELS **********
import { Youtube } from '../../../datas/models/youtube'

// ********** NGRX **********
import { Store } from '@ngrx/store'

// ***** ACTIONS *****
import * as YoutubeActions from '../../../datas/ngrx/controller/youtube/youtubeAction'

// ***** STATE & REDUCER *****
import { YoutubeState } from '../../../datas/ngrx/controller/youtube/youtubeReducer'

@Component({
  selector: 'app-final-fantasy',
  template: ` <p>final-fantasy works!</p> `,
  styleUrls: ['./final-fantasy.component.scss'],
})
export class FinalFantasyComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  youtubePlaylists: Youtube['playlists'][]
  isYoutubePlaylistsLoaded: boolean = false

  getYoutubePlaylists() {
    if (!this.isYoutubePlaylistsLoaded) {
      this.subscription = this.youtubeService
        .getYoutubePlaylist()
        .subscribe((res: Youtube['playlists'][]) => {
          this.store.dispatch(
            YoutubeActions.getYoutubePlaylists({ youtubePlaylists: res })
          )
          this.isYoutubePlaylistsLoaded = true
        })
    }
  }

  constructor(
    private youtubeService: YoutubeService,
    private store: Store<{ youtubeDatas: YoutubeState }>
  ) {}

  ngOnInit() {
    this.getYoutubePlaylists()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
