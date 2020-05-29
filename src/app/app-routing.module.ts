import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/Authentication/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canLoad: [AuthGuard] }, /*<--- add canload to autologin */
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  { path: 'admob', loadChildren: './pages/admob/admob.module#AdmobPageModule', canLoad: [AuthGuard]},
  { path: 'hotels', loadChildren: './pages/hotels/hotels.module#HotelsPageModule', canLoad: [AuthGuard]},
  { path: 'add', loadChildren: './pages/add/add.module#AddPageModule', canLoad: [AuthGuard]},
  {
    path: 'search-bar',
    children: [
      {
        path: '',
        loadChildren: './pages/search-bar/search-bar.module#SearchBarPageModule'
      },
      {
        path: ':placeId',
        loadChildren:
          './pages/search-bar/hotels-details/hotels-details.module#HotelsDetailsPageModule'
      }
    ], canLoad: [AuthGuard]
  },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule', canLoad: [AuthGuard]},
  { path: 'payments', loadChildren: './pages/payments/payments.module#PaymentsPageModule', canLoad: [AuthGuard]},
  { path: 'languages', loadChildren: './pages/languages/languages.module#LanguagesPageModule', canLoad: [AuthGuard]},
  { path: 'animations', loadChildren: './pages/animations/animations.module#AnimationsPageModule', canLoad: [AuthGuard]},
  { path: 'gallery', loadChildren: './pages/gallery/gallery.module#GalleryPageModule', canLoad: [AuthGuard]},
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
