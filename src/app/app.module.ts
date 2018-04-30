import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes , RouterModule , CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LatestLogsComponent } from './latest-logs/latest-logs.component';
import { TokenService } from './services/token.service';
import { SideCategoriesComponent } from './side-categories/side-categories.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { OtherComponent } from './other/other.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { PosterComponent } from './home/poster/poster.component';
import { PostedComponent } from './posted/posted.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    canActivate:[GuestGuard],
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'check-your-email',
    component:ConfirmationComponent,
  },
  {
    path:'profile/:id',
    component:ProfileComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LatestLogsComponent,
    SideCategoriesComponent,
    NewsfeedComponent,
    OtherComponent,
    ConfirmationComponent,
    ProfileComponent,
    TimelineComponent,
    PosterComponent,
    PostedComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'}),
    HttpClientModule,
  ],
  providers: [
    TokenService,
    AuthGuard,
    GuestGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
