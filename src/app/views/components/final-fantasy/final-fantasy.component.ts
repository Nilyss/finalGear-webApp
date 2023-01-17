import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** SERVICES **********
import { YoutubeService } from '../../../datas/services/youtube.service'

// ********** MODELS **********
import { Youtube } from '../../../datas/models/youtube'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import * as YoutubeActions from '../../../datas/ngrx/controller/youtube/youtubeAction'
import * as YoutubeSelectors from '../../../datas/ngrx/controller/youtube/youtubeSelector'

// ***** STATE & REDUCER *****
import { YoutubeState } from '../../../datas/ngrx/controller/youtube/youtubeReducer'

@Component({
  selector: 'app-final-fantasy',
  template: `
    <section class="section">
      <div *ngIf="youtubePlaylists" class="finalFantasy" data-aos="slide-right">
        <ul
          *ngFor="let playlist of youtubePlaylists"
          class="finalFantasy__playlistsWrapper"
        >
          <li class="finalFantasy__playlistsWrapper__playlist">
            <h2 class="finalFantasy__playlistsWrapper__playlist__title">
              {{ playlist['name'] }}
            </h2>
            <figure
              class="finalFantasy__playlistsWrapper__playlist__imageWrapper"
            >
              <img
                [src]="playlist['episodes'][0]['thumbnail']"
                alt="Episode 1 thumbnail"
                class="finalFantasy__playlistsWrapper__playlist__imageWrapper__image"
              />
            </figure>
            <p class="finalFantasy__playlistsWrapper__playlist__length">
              Vidéo(s) : {{ playlist['episodes'].length }}
            </p>
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrls: ['./final-fantasy.component.scss'],
})
export class FinalFantasyComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  youtubePlaylists: Youtube['playlist'][]
  isYoutubePlaylistsLoaded: boolean = false

  getYoutubePlaylists() {
    if (!this.isYoutubePlaylistsLoaded) {
      this.subscription = this.youtubeService
        .getYoutubePlaylist()
        .subscribe((res: Youtube['playlist'][]) => {
          this.store.dispatch(
            YoutubeActions.getYoutubePlaylists({ youtubePlaylists: res })
          )
          this.isYoutubePlaylistsLoaded = true
        })
    }

    // get Final Fantasy playlists from ngrx store
    this.subscription = this.store
      .select(YoutubeSelectors.selectYoutubePlaylist)
      .subscribe((res: Youtube['playlist'][]) => {
        if (!res) {
          return
        }
        this.youtubePlaylists = res['finalFantasy']
      })
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
