// ********** MODULES **********
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

// ********** COMPONENTS **********
import { HomeComponent } from './home.component'
import { HeaderComponent } from '../header/header.component'
import { FooterComponent } from '../footer/footer.component'

const homeRoutes: Routes = [{ path: 'accueil', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
