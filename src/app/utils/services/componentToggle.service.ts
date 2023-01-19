import { Injectable } from '@angular/core'

// ********** RXJS **********
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ComponentToggleService {
  // ********** FINAL FANTASY COMPONENT **********
  private isFinalFantasyComponentVisible = new BehaviorSubject<boolean>(false)
  currentFinalFantasyComponentVisibility =
    this.isFinalFantasyComponentVisible.asObservable()

  toggleFinalFantasyComponent() {
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
