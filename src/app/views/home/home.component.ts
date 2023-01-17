import { Component, OnInit, OnDestroy } from '@angular/core'

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
        <app-final-fantasy></app-final-fantasy>
      </main>
      <app-footer></app-footer>
    </body>
  `,
  styles: ['.body{overflow-x: hidden} .main {min-height: 34vh}'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  isFinalGearInfoLoaded: boolean = false

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

  constructor(
    private finalGearService: FinalGearService,
    private store: Store<{ finalGearInfo: FinalGearState }>
  ) {}
  ngOnInit() {
    this.getFinalGearInfos()
    this.initAoS()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
