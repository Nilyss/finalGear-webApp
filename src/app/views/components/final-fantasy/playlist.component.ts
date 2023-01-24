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

      <div *ngIf="firstPlaylist" class="finalFantasy" data-aos="slide-right">
        <ul
          *ngFor="let playlist of firstPlaylist"
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

      <!-- ********** TIERS PLAYLIST ********** -->

      <div *ngIf="secondPlaylist" class="finalFantasy" data-aos="slide-right">
        <ul
          *ngFor="let playlist of secondPlaylist"
          class="finalFantasy__playlistsWrapper"
        >
          <li
            (click)="
              goToVideoPlayer(playlist['_id'], tiersPlaylistIndex, playlistName)
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

      <!-- ********** METAL GEAR PLAYLIST ********** -->

      <div *ngIf="thirdPlaylist" class="finalFantasy" data-aos="slide-right">
        <ul
          *ngFor="let playlist of thirdPlaylist"
          class="finalFantasy__playlistsWrapper"
        >
          <li
            (click)="
              goToVideoPlayer(
                playlist['_id'],
                metalGearPlaylistIndex,
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

  isYoutubePlaylistsLoaded: boolean = false

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
        this.firstPlaylist = res[0][`${this.playlistName}`]
        this.finalFantasyPlaylistIndex = 0
        this.secondPlaylist = res[1][`${this.playlistName}`]
        this.tiersPlaylistIndex = 1
        this.thirdPlaylist = res[2][`${this.playlistName}`]
        this.metalGearPlaylistIndex = 2
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
