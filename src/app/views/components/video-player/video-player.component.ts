import { Component, OnInit, OnDestroy } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import { YoutubeState } from '../../../datas/ngrx/controller/youtube/youtubeReducer'
import * as YoutubeSelector from '../../../datas/ngrx/controller/youtube/youtubeSelector'

// ********** MODELS **********
import { Youtube } from '../../../datas/models/youtube'

// ********** UTILS **********
import { ComponentToggleService } from '../../../utils/services/componentToggle.service'

@Component({
  selector: 'app-video-player',
  template: `
    <section class="section">
      <div class="youtubePlayer" data-aos="slide-left">
        <div class="youtubePlayer__titleWrapper">
          <h2 class="youtubePlayer__title">{{ requestedName }}</h2>
        </div>
        <ul class="youtubePlayer__episodeWrapper">
          <li
            *ngFor="let episode of requestedPlaylist; let i = index"
            class="youtubePlayer__episodeWrapper__episode"
          >
            <div class="youtubePlayer__episodeWrapper__episode__titleWrapper">
              <p
                class="youtubePlayer__episodeWrapper__episode__titleWrapper__title"
              >
                {{ episode.name }}
              </p>
            </div>
            <div
              *ngIf="safeUrls[i]"
              [hidden]="!safeUrls[i]"
              class="youtubePlayer__episodeWrapper__episode__playerWrapper"
            >
              <iframe
                class="youtubePlayer__episodeWrapper__episode__playerWrapper__player"
                [src]="safeUrls[i]"
                allowfullscreen
              ></iframe>
            </div>
            <div
              class="youtubePlayer__episodeWrapper__episode__durationWrapper"
            >
              <p
                class="youtubePlayer__episodeWrapper__episode__durationWrapper__duration"
              >
                Durée de la vidéo : {{ episode.duration }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  isYoutubeDatasLoaded: boolean

  requestedId: string

  requestedIndex: number

  requestedName: string

  requestedVideo: string | undefined

  requestedPlaylist
  embedId: string | undefined

  safeUrls = []

  // ***** GET REQUESTED ID  *****

  getRequestedVideoOrPlaylist() {
    this.subscription =
      this.componentToggleService.currentVideoPlayerItemId.subscribe(
        (id: string) => (this.requestedId = id)
      )
    this.subscription =
      this.componentToggleService.currentVideoPlayerItemIndex.subscribe(
        (index: number) => (this.requestedIndex = index)
      )
    this.subscription =
      this.componentToggleService.currentVideoItemName.subscribe(
        (name: string) => (this.requestedName = name)
      )
  }

  // ********** GET REQUESTED VIDEO **********

  getRequestedVideo() {
    if (!this.isYoutubeDatasLoaded) {
      this.subscription = this.store
        .select(YoutubeSelector.selectYoutubePlaylist)
        .subscribe((youtubePlaylist: Youtube[]) => {
          if (!youtubePlaylist) return
          youtubePlaylist[this.requestedIndex].playlists.find((playlist) => {
            if (playlist.name === this.requestedName)
              this.requestedPlaylist = playlist.episodes
          })
        })
    }
  }

  getEmbedUrl() {
    if (!this.requestedPlaylist) return
    this.requestedPlaylist.forEach((episode) => {
      this.requestedVideo = episode.url
      this.embedId = this.requestedVideo?.split('/').pop()
      const URL = 'https://www.youtube.com/embed/' + this.embedId
      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL)
      this.safeUrls.push(safeUrl)
    })
  }

  // ********** INIT COMPONENT  **********

  constructor(
    private store: Store<{ youtubeDatas: YoutubeState }>,
    private componentToggleService: ComponentToggleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getRequestedVideoOrPlaylist()
    this.getRequestedVideo()
    this.getEmbedUrl()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
