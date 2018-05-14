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
import { ProfileNewsfeedComponent } from './profilenewsfeed/profilenewsfeed.component';
import { FooterComponent } from './footer/footer.component';
import { VerifysuccessComponent } from './verifysuccess/verifysuccess.component';
import { PostboxComponent } from './postbox/postbox.component';
import { NewsfeedboxComponent } from './newsfeed/newsfeedbox/newsfeedbox.component';
import { FriendsPreviewComponent } from './profile/friends-preview/friends-preview.component';
import { NewsfeedLoadingboxComponent } from './newsfeed-loadingbox/newsfeed-loadingbox.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { SmallUserLoaderComponent } from './small-user-loader/small-user-loader.component';
import { FriendRequestIconComponent } from './friend-request-icon/friend-request-icon.component';
import { GlobalSearchBoxComponent } from './global-search-box/global-search-box.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchAllComponent } from './search-all/search-all.component';
import { OnlineListComponent } from './online-list/online-list.component';
import { PersonResultRowComponent } from './person-result-row/person-result-row.component';
import { CommentsContainerComponent } from './comments-container/comments-container.component';
import { CommentRowComponent } from './comment-row/comment-row.component';
import { CommentLoaderComponent } from './comment-loader/comment-loader.component';
import { CommentReplyRowComponent } from './comment-reply-row/comment-reply-row.component';
import { CommentReplyContainerComponent } from './comment-reply-container/comment-reply-container.component';
import { PostReactionsComponent } from './post-reactions/post-reactions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentReactionsComponent } from './comment-reactions/comment-reactions.component';

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
    path:'search/people',
    component:SearchPeopleComponent,
  },
  {
    path:'search/all',
    component:SearchAllComponent,
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
    ProfileNewsfeedComponent,
    FooterComponent,
    VerifysuccessComponent,
    PostboxComponent,
    NewsfeedboxComponent,
    FriendsPreviewComponent,
    NewsfeedLoadingboxComponent,
    FriendRequestsComponent,
    SmallUserLoaderComponent,
    FriendRequestIconComponent,
    GlobalSearchBoxComponent,
    SearchPeopleComponent,
    SearchAllComponent,
    OnlineListComponent,
    PersonResultRowComponent,
    CommentsContainerComponent,
    CommentRowComponent,
    CommentLoaderComponent,
    CommentReplyRowComponent,
    CommentReplyContainerComponent,
    PostReactionsComponent,
    CommentReactionsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'}),
    HttpClientModule,
    BrowserAnimationsModule
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
