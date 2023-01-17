import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import * as FinalGearActions from '../../datas/ngrx/controller/finalGear/finalGearSelector'

// ********** MODELS **********
import { FinalGear } from '../../datas/models/finalGear'
import { FinalGearState } from '../../datas/ngrx/controller/finalGear/finalGearReducer'

// ************ ICONS ************
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  template: `
    <footer id="footer" class="footer">
      <div class="titleWrapper">
        <h2 class="titleWrapper__title">FINAL GEAR</h2>
      </div>
      <div class="socialNetworkWrapper">
        <nav
          *ngFor="let socialNetwork of finalGearSocials"
          class="socialNetworkWrapper__nav"
        >
          <a
            class="socialNetworkWrapper__nav__links"
            [title]="socialNetwork.name"
            [href]="socialNetwork.url"
          >
            <fa-icon
              *ngIf="socialNetwork.name === 'YouTube'"
              [icon]="youtubeIcon"
            ></fa-icon>
            <fa-icon
              *ngIf="socialNetwork.name === 'Twitch'"
              [icon]="twitchIcon"
            ></fa-icon>
            <fa-icon
              *ngIf="socialNetwork.name === 'Facebook'"
              [icon]="facebookIcon"
            ></fa-icon>
            <fa-icon
              *ngIf="socialNetwork.name === 'Twitter'"
              [icon]="twitterIcon"
            ></fa-icon>
            <fa-icon
              *ngIf="socialNetwork.name === 'Instagram'"
              [icon]="instagramIcon"
            ></fa-icon>
            <fa-icon
              *ngIf="socialNetwork.name === 'Discord'"
              [icon]="discordIcon"
            ></fa-icon>
          </a>
        </nav>
      </div>
      <p class="footer__credential">
        © Website made by
        <a class="footer__credential__link" href="https://ndecressac.fr"
          >Nicolas Decressac</a
        >
        — 2023
      </p>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  finalGearImages: FinalGear['images']
  finalGearSocials: FinalGear['socialNetwork']

  youtubeIcon = BrandIcons.faYoutube
  twitchIcon = BrandIcons.faTwitch
  facebookIcon = BrandIcons.faFacebook
  twitterIcon = BrandIcons.faTwitter
  instagramIcon = BrandIcons.faInstagram
  discordIcon = BrandIcons.faDiscord

  getFinalGearInfo() {
    this.subscription = this.store
      .select(FinalGearActions.selectFinalGearInfo)
      .subscribe((finalGearInfo: FinalGear) => {
        if (!finalGearInfo) {
          return
        }
        this.finalGearImages = finalGearInfo.images
        this.finalGearSocials = finalGearInfo.socialNetwork
      })
  }

  constructor(private store: Store<{ finalGearInfo: FinalGearState }>) {}
  ngOnInit() {
    this.getFinalGearInfo()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
