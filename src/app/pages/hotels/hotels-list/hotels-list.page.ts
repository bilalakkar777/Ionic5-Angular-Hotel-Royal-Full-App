import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { HotelsService } from '../../../services/hotel/hotels.service';
import { Place } from '../../../Model/place.model';
import { AuthService } from '../../../services/Authentication/auth.service';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.page.html',
  styleUrls: ['./hotels-list.page.scss'],
})
export class HotelsListPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private HotelsService: HotelsService,
    private menuCtrl: MenuController,
    private authService: AuthService,
    public sidebar: SidebarService,
    
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }

  ngOnInit() {
    //To See all added hotels
    this.placesSub = this.HotelsService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.HotelsService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
