import { Component, OnInit, OnDestroy } from '@angular/core'

// ********** SERVICES **********
import { ComponentToggleService } from '../../utils/services/componentToggle.service'
import { YoutubeService } from '../../datas/services/youtube.service'

// ********** RXJS **********
import { Subscription } from 'rxjs'

// ********** NGRX **********
import { Store } from '@ngrx/store'
import { FinalGearState } from '../../datas/ngrx/controller/finalGear/finalGearReducer'
import * as FinalGearSelectors from '../../datas/ngrx/controller/finalGear/finalGearSelector'
import { YoutubeState } from '../../datas/ngrx/controller/youtube/youtubeReducer'
import * as YoutubeSelectors from '../../datas/ngrx/controller/youtube/youtubeSelector'

// ********** MODELS **********
import { FinalGear } from '../../datas/models/finalGear'

// ************ ICONS ************
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'
import { Youtube } from '../../datas/models/youtube'
import * as YoutubeActions from '../../datas/ngrx/controller/youtube/youtubeAction'

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
            Final Fantasy, Metal Gear, Zelda, Resident Evil, Kingdom Hearts...
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
              *ngFor="let license of licenses"
              (click)="togglePlaylist(license)"
              class="containerBottom__appNavWrapper__linkWrapper__link"
            >
              {{ license }}
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

  isYoutubePlaylistsLoaded: boolean = false
  licenses: Youtube['license'][]

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

  getYoutubePlaylists() {
    if (!this.isYoutubePlaylistsLoaded) {
      this.subscription = this.youtubeService
        .getYoutubePlaylist()
        .subscribe((res: Youtube[]) => {
          this.store.dispatch(
            YoutubeActions.getYoutubePlaylists({ youtubePlaylists: res })
          )
          this.isYoutubePlaylistsLoaded = true
        })
    }
  }

  getLicencesNames() {
    this.store
      .select(YoutubeSelectors.selectYoutubePlaylist)
      .subscribe((res: Youtube[]) => {
        if (!res) {
          return
        }
        this.licenses = res.map((licenses: Youtube) => licenses.license)
      })
  }
  // ********** TOGGLE **********

  toggleLanding(name: string, boolean?: boolean) {
    this.componentToggleService.toggleLandingComponent(boolean)
    this.componentToggleService.togglePlaylistComponent(name, false)
    this.componentToggleService.toggleVideoPlayerComponentOff()
  }

  togglePlaylist(name: string) {
    this.componentToggleService.togglePlaylistComponent('', false)

    // Create a delay to wait the end of component destruction before to toggle the new component
    setTimeout(() => {
      this.componentToggleService.togglePlaylistComponent(name, true)
      this.componentToggleService.toggleLandingComponent(false)
      this.componentToggleService.toggleVideoPlayerComponentOff()
    }, 1)
  }

  // ********** INIT COMPONENT **********

  constructor(
    private store: Store<{
      finalGearInfo: FinalGearState
      youtubeDatas: YoutubeState
    }>,
    private componentToggleService: ComponentToggleService,
    private youtubeService: YoutubeService
  ) {}
  ngOnInit() {
    this.getFinalGearInfo()
    this.getYoutubePlaylists()
    this.getLicencesNames()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
