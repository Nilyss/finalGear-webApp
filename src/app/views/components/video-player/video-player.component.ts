import { Component, OnInit, OnDestroy } from '@angular/core'

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
      <div *ngFor="let episode of requestedPlaylist['episodes']">
        <p>{{ episode['name'] }}</p>
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

  // ********** INIT COMPONENT  **********

  constructor(
    private store: Store<{ youtubeDatas: YoutubeState }>,
    private componentToggleService: ComponentToggleService
  ) {}

  ngOnInit() {
    this.getRequestedVideoOrPlaylist()
    this.getRequestedVideo()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
