// ********** MODULES **********
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeModule } from './views/home/home.module'
import { AppRoutingModule } from './app-routing.module'
import { StoreModule } from '@ngrx/store'
import { HttpClientModule } from '@angular/common/http'

// ********** COMPONENTS **********
import { AppComponent } from './app.component'

// ********** NgRx **********
import { logMetaReducer } from './datas/ngrx/metaReducers/logs'
import { FinalGearInfoReducer } from './datas/ngrx/controller/finalGear/finalGearReducer'
import { YoutubeDatasReducer } from './datas/ngrx/controller/youtube/youtubeReducer'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    StoreModule.forRoot(
      {
        finalGearInfo: FinalGearInfoReducer,
        youtubeDatas: YoutubeDatasReducer,
      },

      { metaReducers: [logMetaReducer] }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
