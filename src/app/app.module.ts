import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LatestLogsComponent } from './latest-logs/latest-logs.component';
import { TokenService } from './services/token.service';
import { SideCategoriesComponent } from './side-categories/side-categories.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
  },
  {
    path: 'home',
    component:HomeComponent
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
    NewsfeedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
