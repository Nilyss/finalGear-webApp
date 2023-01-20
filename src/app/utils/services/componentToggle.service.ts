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

  // ********** FINAL FANTASY COMPONENT **********
  private isFinalFantasyComponentVisible = new BehaviorSubject<boolean>(false)
  currentFinalFantasyComponentVisibility =
    this.isFinalFantasyComponentVisible.asObservable()

  toggleFinalFantasyComponent(boolean?: boolean) {
    if (boolean === false) {
      return this.isFinalFantasyComponentVisible.next(false)
    }
    if (boolean === true) {
      return this.isFinalFantasyComponentVisible.next(true)
    }
    this.isFinalFantasyComponentVisible.next(
      !this.isFinalFantasyComponentVisible.value
    )
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
