import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** UTILS **********
import { ComponentToggleService } from '../../utils/services/componentToggle.service'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import { FinalGearState } from '../../datas/ngrx/controller/finalGear/finalGearReducer'
import * as FinalGearSelectors from '../../datas/ngrx/controller/finalGear/finalGearSelector'

// ********** MODELS **********
import { FinalGear } from '../../datas/models/finalGear'

// ************ ICONS ************
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="background">
        <figure *ngIf="finalGearImages" class="background__imageWrapper">
          <img
            class="background__imageWrapper__image"
            [src]="finalGearImages.banner"
            alt="background image"
          />
          <img
            class="background__imageWrapper__image--tabletAndMobile"
            [src]="finalGearImages.bannerWithoutText"
            alt="background image"
          />
        </figure>
      </div>

      <!-- ********** CONTAINER TOP ********** -->

      <div class="containerTop">
        <div class="containerTop__titleWrapper">
          <h1
            (click)="toggleLanding('landing', true)"
            class="containerTop__titleWrapper__title"
          >
            FINAL GEAR
          </h1>
          <p class="containerTop__titleWrapper__subtitle">
            Final Fantasy, Zelda, Resident Evil, Kingdom Hearts...
          </p>
        </div>
        <div class="containerTop__socialNetworkWrapper">
          <nav
            *ngFor="let socialNetwork of finalGearSocials"
            class="containerTop__socialNetworkWrapper__nav"
          >
            <a
              class="containerTop__socialNetworkWrapper__nav__links"
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
      </div>

      <!-- ********** CONTAINER BOTTOM ********** -->
      <div class="containerBottom">
        <div class="containerBottom__appNavWrapper">
          <nav class="containerBottom__appNavWrapper__linkWrapper">
            <a
              (click)="toggleLanding('landing', true)"
              class="containerBottom__appNavWrapper__linkWrapper__link"
            >
              Accueil
            </a>
            <a
              (click)="togglePlaylist('finalFantasy')"
              class="containerBottom__appNavWrapper__linkWrapper__link"
            >
              Final Fantasy
            </a>
            <a
              (click)="togglePlaylist('tiers')"
              class="containerBottom__appNavWrapper__linkWrapper__link"
            >
              Tiers List
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  finalGearImages: FinalGear['images']
  finalGearSocials: FinalGear['socialNetwork']

  // ************ ICONS ************

  youtubeIcon = BrandIcons.faYoutube
  twitchIcon = BrandIcons.faTwitch
  facebookIcon = BrandIcons.faFacebook
  twitterIcon = BrandIcons.faTwitter
  instagramIcon = BrandIcons.faInstagram
  discordIcon = BrandIcons.faDiscord

  // ********** GET DATAS FROM NGRX STORE **********
  getFinalGearInfo() {
    this.subscription = this.store
      .select(FinalGearSelectors.selectFinalGearInfo)
      .subscribe((finalGearInfo: FinalGear) => {
        if (!finalGearInfo) {
          return
        }
        this.finalGearImages = finalGearInfo.images
        this.finalGearSocials = finalGearInfo.socialNetwork
      })
  }

  // ********** TOGGLE **********

  toggleLanding(name: string, boolean?: boolean) {
    this.componentToggleService.toggleLandingComponent(boolean)
    this.componentToggleService.togglePlaylistComponent(name, false)
    this.componentToggleService.toggleVideoPlayerComponentOff()
  }

  togglePlaylist(name: string) {
    const playlistComponentName: string =
      this.componentToggleService.currentPlaylistName.value

    if (playlistComponentName === name) {
      return
    }

    this.componentToggleService.togglePlaylistComponent('', false)
    this.componentToggleService.togglePlaylistComponent(name, true)
    this.componentToggleService.toggleLandingComponent(false)
  }

  // ********** INIT COMPONENT **********

  constructor(
    private store: Store<{ finalGearInfo: FinalGearState }>,
    private componentToggleService: ComponentToggleService
  ) {}
  ngOnInit() {
    this.getFinalGearInfo()
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
    this.componentToggleService.currentPlaylistName.unsubscribe()
  }
}
