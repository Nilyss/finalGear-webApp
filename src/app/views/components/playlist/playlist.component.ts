import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** UTILS **********
import { ComponentToggleService } from '../../../utils/services/componentToggle.service'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** MODELS **********
import { Youtube } from '../../../datas/models/youtube'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import * as YoutubeSelectors from '../../../datas/ngrx/controller/youtube/youtubeSelector'

// ***** STATE & REDUCER *****
import { YoutubeState } from '../../../datas/ngrx/controller/youtube/youtubeReducer'

@Component({
  selector: 'app-playlist',
  template: `
    <section class="section">
      <!-- ********** SELECTED PLAYLIST ********** -->

      <div
        *ngIf="selectedPlaylist"
        class="selectedPlaylist"
        data-aos="slide-right"
      >
        <ul
          *ngFor="let playlist of selectedPlaylist"
          class="selectedPlaylist__playlistsWrapper"
        >
          <li
            (click)="
              goToVideoPlayer(playlist.id, selectedPlaylistIndex, playlist.name)
            "
            class="selectedPlaylist__playlistsWrapper__playlist"
          >
            <h2 class="selectedPlaylist__playlistsWrapper__playlist__title">
              {{ playlist.name }}
            </h2>
            <figure
              class="selectedPlaylist__playlistsWrapper__playlist__imageWrapper"
            >
              <img
                [src]="playlist.episodes[0].thumbnail"
                alt="Episode 1 thumbnail"
                class="selectedPlaylist__playlistsWrapper__playlist__imageWrapper__image"
              />
            </figure>
            <p class="selectedPlaylist__playlistsWrapper__playlist__length">
              Vidéo(s) : {{ playlist.episodes.length }}
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
  selectedPlaylist: Youtube['playlists']
  selectedPlaylistIndex: number

  getSelectedLicense() {
    // Find PlaylistName
    this.subscription =
      this.componentToggleService.currentPlaylistName.subscribe(
        (playlistName: string) => {
          this.playlistName = playlistName
        }
      )

    // get All playlists from ngrx store and find the selected playlist by name and set index
    this.subscription = this.store
      .select(YoutubeSelectors.selectYoutubePlaylist)
      .subscribe((res: Youtube[]) => {
        if (!res) {
          return
        }
        res.find((playlist: Youtube) => {
          if (playlist.license === this.playlistName)
            this.selectedPlaylist = playlist.playlists
        })
        res.findIndex((playlist: Youtube, index: number) => {
          if (playlist.license === this.playlistName)
            this.selectedPlaylistIndex = index
        })
      })
  }

  goToVideoPlayer(id: string, index: number, name: string) {
    this.componentToggleService.togglePlaylistComponent('', '', false)
    this.componentToggleService.toggleVideoPlayerComponentOn(id, index, name)
  }

  constructor(
    private store: Store<{ youtubeDatas: YoutubeState }>,
    private componentToggleService: ComponentToggleService
  ) {}

  ngOnInit() {
    this.getSelectedLicense()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
