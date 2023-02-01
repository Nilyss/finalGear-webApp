// ********** MODULES **********
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// ********** COMPONENTS **********
import { HeaderComponent } from '../header/header.component'
import { HomeComponent } from './home.component'
import { LandingComponent } from '../components/landing/landing.component'
import { PlaylistComponent } from '../components/playlist/playlist.component'
import { VideoPlayerComponent } from '../components/video-player/video-player.component'
import { FooterComponent } from '../footer/footer.component'
import { BackToTopComponent } from '../components/back-to-top/backToTop.component'

const homeRoutes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LandingComponent,
    PlaylistComponent,
    VideoPlayerComponent,
    FooterComponent,
    BackToTopComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(homeRoutes), FontAwesomeModule],
})
export class HomeModule {}
