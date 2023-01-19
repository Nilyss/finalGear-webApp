// ********** MODULES **********
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// ********** COMPONENTS **********
import { HeaderComponent } from '../header/header.component'
import { HomeComponent } from './home.component'
import { FinalFantasyComponent } from '../components/final-fantasy/final-fantasy.component'
import { VideoPlayerComponent } from '../components/video-player/video-player.component'
import { FooterComponent } from '../footer/footer.component'
import { BackToTopComponent } from '../components/back-to-top/backToTop.component'

const homeRoutes: Routes = [{ path: 'accueil', component: HomeComponent }]

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FinalFantasyComponent,
    VideoPlayerComponent,
    FooterComponent,
    BackToTopComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(homeRoutes), FontAwesomeModule],
})
export class HomeModule {}
