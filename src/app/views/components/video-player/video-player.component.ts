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
    <section>
      <div class="titleWrapper">
        <h2 class="title">{{ requestedPlaylist['name'] }}</h2>
      </div>
      <div *ngFor="let episode of requestedPlaylist['episodes']; let i = index">
        <p>{{ episode['name'] }}</p>
        <div *ngIf="safeUrls[i]" [hidden]="!safeUrls[i]" class="youtubeWrapper">
          <iframe
            class="youtubeWrapper__youtube"
            [src]="safeUrls[i]"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  isYoutubeDatasLoaded: boolean

  requestedId: string

  requestedIndex: number

  requestedName: string

  requestedVideo: string | undefined

  requestedPlaylist: Youtube | undefined

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
          this.requestedPlaylist = youtubePlaylist[this.requestedIndex][
            `${this.requestedName}`
          ].find((playlist: Youtube) => playlist['_id'] === this.requestedId)
        })
    }
  }

  getEmbedUrl() {
    if (!this.requestedPlaylist) return
    this.requestedPlaylist['episodes'].forEach((episode) => {
      this.requestedVideo = episode['url']
      this.embedId = this.requestedVideo?.split('/').pop()
      const URL = 'https://www.youtube.com/embed/' + this.embedId
      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL)
      console.log('safe url =>', safeUrl)
      this.safeUrls.push(safeUrl)
      console.log('safe urls =>', this.safeUrls)
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