import { Component, OnInit, OnDestroy } from '@angular/core'

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
        <p>accueil component works!</p>
      </main>
      <app-footer></app-footer>
    </body>
  `,
  styles: ['.main {min-height: 34vh}'],
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

  constructor(
    private finalGearService: FinalGearService,
    private store: Store<{ finalGearInfo: FinalGearState }>
  ) {}
  ngOnInit() {
    this.getFinalGearInfos()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
