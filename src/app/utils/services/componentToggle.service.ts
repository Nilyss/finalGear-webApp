import { Injectable } from '@angular/core'

// ********** RXJS **********
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ComponentToggleService {
  // ********** LANDING COMPONENT  **********
  private isLandingComponentVisible = new BehaviorSubject<boolean>(true)
  currentLandingComponentVisibility =
    this.isLandingComponentVisible.asObservable()

  toggleLandingComponent(boolean?: boolean) {
    if (boolean === false) {
      return this.isLandingComponentVisible.next(false)
    }
    if (boolean === true) {
      return this.isLandingComponentVisible.next(true)
    }
    this.isLandingComponentVisible.next(!this.isLandingComponentVisible.value)
  }

  // ********** PLAYLIST COMPONENT **********
  public isPlaylistComponentVisible = new BehaviorSubject<boolean>(false)
  public currentPlaylistName = new BehaviorSubject<string>('')

  public currentPlaylistId = new BehaviorSubject<string>('')

  currentPlaylistComponentVisibility =
    this.isPlaylistComponentVisible.asObservable()

  togglePlaylistComponent(name: string, id: string, isVisible: boolean) {
    isVisible
      ? (this.currentPlaylistName.next(name),
        this.currentPlaylistId.next(id),
        this.isPlaylistComponentVisible.next(true))
      : (this.currentPlaylistName.next(name),
        this.currentPlaylistId.next(id),
        this.isPlaylistComponentVisible.next(false))
  }

  // ********** VIDEO PLAYER COMPONENT **********

  private isVideoPlayerComponentVisible = new BehaviorSubject<boolean>(false)
  currentVideoPlayerComponentVisibility =
    this.isVideoPlayerComponentVisible.asObservable()
  currentVideoPlayerItemId = new BehaviorSubject<string>('')
  currentVideoPlayerItemIndex = new BehaviorSubject<number>(null)
  currentVideoItemName = new BehaviorSubject<string>('')

  toggleVideoPlayerComponentOff() {
    this.isVideoPlayerComponentVisible.next(false)
  }

  toggleVideoPlayerComponentOn(id: string, index: number, name: string) {
    this.isVideoPlayerComponentVisible.next(true)
    this.currentVideoPlayerItemId.next(id)
    this.currentVideoPlayerItemIndex.next(index)
    this.currentVideoItemName.next(name)
  }
}
