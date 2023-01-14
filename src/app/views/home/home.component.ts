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
        <p>Accueil</p>
      </main>
      <app-footer></app-footer>
    </body>
  `,
  styles: ['.body {min-height: 100vh}'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  isFinalGearInfosLoaded: boolean = false
  finalGearInfo: FinalGear | undefined

  getFinalGearInfos() {
    if (!this.isFinalGearInfosLoaded) {
      this.subscription = this.finalGearService
        .getFinalGearInfos()
        .subscribe((res: FinalGear) => {
          this.store.dispatch(
            FinalGearActions.getFinalGearInfos({ finalGearInfo: res })
          )
          this.isFinalGearInfosLoaded = true
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
