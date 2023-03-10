import { Component, OnInit, OnDestroy, HostListener } from '@angular/core'
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
        <ul class="youtubePlayer__episodeWrapper" (scroll)="onScroll($event)">
          <li
            *ngFor="let episode of displayedEpisodes; let i = index"
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
                Dur??e de la vid??o : {{ episode.duration }}
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
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let scrollY = window.scrollY || window.pageYOffset
    let bottom = document.body.offsetHeight - (scrollY + window.innerHeight)
    if (bottom < 200) {
      if (this.allEpisode.length === this.displayedEpisodes.length) return

      const newEpisodes = this.allEpisode.slice(
        this.currentLength,
        this.currentLength + 5
      )

      this.displayedEpisodes = this.displayedEpisodes.concat(newEpisodes)
      this.currentLength += 5
    }
  }
  private currentLength = 0

  subscription: Subscription | undefined

  isYoutubeDatasLoaded: boolean

  requestedId: string

  requestedIndex: number

  requestedName: string

  requestedVideo: string | undefined
  requestedPlaylist
  embedId: string | undefined

  safeUrls = []

  displayedEpisodes = []

  allEpisode = []

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
    if (this.isYoutubeDatasLoaded) {
      return
    }

    this.subscription = this.store
      .select(YoutubeSelector.selectYoutubePlaylist)
      .subscribe((youtubePlaylist: Youtube[]) => {
        if (!youtubePlaylist) return
        const playlist = youtubePlaylist[this.requestedIndex].playlists.find(
          (playlist) => playlist.name === this.requestedName
        )
        if (!playlist) return

        if (playlist.episodes.length > 20) {
          this.currentLength = 10
          this.requestedPlaylist = playlist.episodes.slice().reverse()
          this.allEpisode = this.requestedPlaylist
          this.displayedEpisodes = this.allEpisode.slice(0, 10)
        } else {
          this.requestedPlaylist = playlist.episodes
          this.allEpisode = this.requestedPlaylist
          this.displayedEpisodes = this.allEpisode
        }
      })
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
