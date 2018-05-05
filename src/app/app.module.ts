import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes , RouterModule , CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './httpInterceptor';
import { HttpModule } from '@angular/http';
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
import { VerifiedGuard } from './guards/verified.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { PostedComponent } from './posted/posted.component';
import { FooterComponent } from './footer/footer.component';
import { VerifysuccessComponent } from './verifysuccess/verifysuccess.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    canActivate:[GuestGuard],
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate:[AuthGuard,VerifiedGuard],
  },
  {
    path: 'check-your-email',
    component:ConfirmationComponent,
    // canActivate:[],
  },
  {
    path:'profile/:id',
    component:ProfileComponent,
  },
  {
    path:'verified',
    component:VerifysuccessComponent,
  },


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
    PostedComponent,
    FooterComponent,
    VerifysuccessComponent,
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
    GuestGuard,
    VerifiedGuard,
    {
     provide: HTTP_INTERCEPTORS,
     useClass: MyHttpInterceptor,
     multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
