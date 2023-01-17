// ********** MODULES **********
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// ********** COMPONENTS **********
import { HeaderComponent } from '../header/header.component'
import { HomeComponent } from './home.component'
import { FinalFantasyComponent } from '../components/final-fantasy/final-fantasy.component'
import { FooterComponent } from '../footer/footer.component'

const homeRoutes: Routes = [{ path: 'accueil', component: HomeComponent }]

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FinalFantasyComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(homeRoutes), FontAwesomeModule],
})
export class HomeModule {}
