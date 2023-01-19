import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** UTILS **********
import { ComponentToggleService } from '../../utils/services/componentToggle.service'

// ********** ANIMATIONS **********
import AOS from 'aos'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** SERVICES **********
import { FinalGearService } from '../../datas/services/finalGear.service'

// ********** MODELS **********
import { FinalGear } from '../../datas/models/finalGear'

// ********** NGRX **********
import { Store } from '@ngrx/store'
// ***** ACTIONS *****
import * as FinalGearActions from '../../datas/ngrx/controller/finalGear/finalGearAction'

// ***** STATE & REDUCER *****
import { FinalGearState } from '../../datas/ngrx/controller/finalGear/finalGearReducer'

@Component({
  selector: 'app-home',
  template: `
    <body class="body">
      <app-header></app-header>
      <main class="main">
        <app-final-fantasy *ngIf="isFinalFantasyVisible"></app-final-fantasy>
        <app-video-player *ngIf="isVideoPlayerVisible"></app-video-player>
      </main>
      <app-footer></app-footer>
      <app-back-to-top></app-back-to-top>
    </body>
  `,
  styles: [
    '.body{overflow-x: hidden} .main {min-height: 34vh; background-color: #2b2a33}',
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  isFinalGearInfoLoaded: boolean = false

  // ********** IS COMPONENT DISPLAYED  **********
  isFinalFantasyVisible: boolean
  isVideoPlayerVisible: boolean

  // ********** STORE DATAS FROM HTTP REQ. **********

  getFinalGearInfos() {
    if (!this.isFinalGearInfoLoaded) {
      this.subscription = this.finalGearService
        .getFinalGearInfos()
        .subscribe((res: FinalGear) => {
          this.store.dispatch(
            FinalGearActions.getFinalGearInfos({ finalGearInfo: res })
          )
          this.isFinalGearInfoLoaded = true
        })
    }
  }

  // ********** INIT APP ANIMATIONS **********

  initAoS() {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    })
    AOS.refreshHard()
    AOS.refresh()
  }

  // ********** DISPLAY COMPONENTS **********

  finalFantasyVisibility() {
    this.subscription =
      this.componentToggleService.currentFinalFantasyComponentVisibility.subscribe(
        (isVisible: boolean) => {
          this.isFinalFantasyVisible = isVisible
        }
      )
  }

  videoPlayerVisibility() {
    this.subscription =
      this.componentToggleService.currentVideoPlayerComponentVisibility.subscribe(
        (isVisible: boolean) => {
          this.isVideoPlayerVisible = isVisible
        }
      )
  }

  // ********** COMPONENT INIT **********

  constructor(
    private finalGearService: FinalGearService,
    private store: Store<{ finalGearInfo: FinalGearState }>,
    private componentToggleService: ComponentToggleService
  ) {}
  ngOnInit() {
    this.getFinalGearInfos()
    this.initAoS()
    this.finalFantasyVisibility()
    this.videoPlayerVisibility()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
