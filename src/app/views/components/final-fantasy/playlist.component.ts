import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** UTILS **********
import { ComponentToggleService } from '../../../utils/services/componentToggle.service'

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
  selector: 'app-playlist',
  template: `
    <section class="section">
      <!-- ********** FINAL FANTASY PLAYLIST ********** -->

      <div *ngIf="selectedPlaylist" class="finalFantasy" data-aos="slide-right">
        <ul
          *ngFor="let playlist of selectedPlaylist"
          class="finalFantasy__playlistsWrapper"
        >
          <li
            (click)="
              goToVideoPlayer(
                playlist['_id'],
                finalFantasyPlaylistIndex,
                playlistName
              )
            "
            class="finalFantasy__playlistsWrapper__playlist"
          >
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
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  playlistName: string

  // ********** FINAL FANTASY PLAYLISTS **********
  firstPlaylist: Youtube[] | undefined
  finalFantasyPlaylistIndex: number

  // ********** TIERS PLAYLISTS **********
  secondPlaylist: Youtube[] | undefined
  tiersPlaylistIndex: number

  // ********** METAL GEAR PLAYLISTS **********
  thirdPlaylist: Youtube[] | undefined
  metalGearPlaylistIndex: number

  // ********** INIT COMPONENT **********

  isYoutubePlaylistsLoaded: boolean = false

  selectedPlaylist: string

  getYoutubePlaylists() {
    if (!this.isYoutubePlaylistsLoaded) {
      this.subscription = this.youtubeService
        .getYoutubePlaylist()
        .subscribe((res: Youtube[]) => {
          this.store.dispatch(
            YoutubeActions.getYoutubePlaylists({ youtubePlaylists: res })
          )
          this.isYoutubePlaylistsLoaded = true
        })
    }

    // Find PlaylistName
    this.subscription =
      this.componentToggleService.currentPlaylistName.subscribe(
        (playlistName: string) => (this.playlistName = playlistName)
      )

    // get All playlists from ngrx store
    this.subscription = this.store
      .select(YoutubeSelectors.selectYoutubePlaylist)
      .subscribe((res: Youtube[]) => {
        if (!res) {
          return
        }
        res.find(
          (playlist: Youtube) =>
            (this.selectedPlaylist = playlist[`${this.playlistName}`])
        )
      })
  }

  goToVideoPlayer(id: string, index: number, name: string) {
    this.componentToggleService.togglePlaylistComponent(name, false)
    this.componentToggleService.toggleVideoPlayerComponentOn(id, index, name)
  }

  constructor(
    private youtubeService: YoutubeService,
    private store: Store<{ youtubeDatas: YoutubeState }>,
    private componentToggleService: ComponentToggleService
  ) {}

  ngOnInit() {
    this.getYoutubePlaylists()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
