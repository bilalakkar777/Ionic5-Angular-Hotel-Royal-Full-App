import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HotelsPage } from './hotels.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HotelsPage,
    children: [
      {
        path: 'hotels-list',
        children: [
          {
            path: '',
            loadChildren: './hotels-list/hotels-list.module#HotelsListPageModule'
          },
          {
            path: ':placeId',
            loadChildren:
              './hotels-list/hotels-details/hotels-details.module#HotelsDetailsPageModule'
          },
          { 
            path: 'edit/:placeId', 
            loadChildren:
              './hotels-list/edit-hotels/edit-hotels.module#EditHotelsPageModule' 
          },

        ]
      },
      {
        path: 'bookings',
        children: [
          {
            path: '',
            loadChildren: './bookings/bookings.module#BookingsPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/hotels/tabs/hotels-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/hotels/tabs/hotels-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule {}
