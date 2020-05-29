import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { HotelsService } from '../../../services/hotel/hotels.service';
import { Place } from '../../../Model/place.model';
import { AuthService } from '../../../services/Authentication/auth.service';
import { MapModalComponent } from '../../../components/shared/map-modal/map-modal.component';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-hotels-details',
  templateUrl: './hotels-details.page.html',
  styleUrls: ['./hotels-details.page.scss'],
})
export class HotelsDetailsPage implements OnInit {
  place: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private HotelsService: HotelsService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
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
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/hotels-list');
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;
      this.authService.userId
        .pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('Found no user!');
            }
            fetchedUserId = userId;
            return this.HotelsService.getPlace(paramMap.get('placeId'));
          })
        )
        .subscribe(
          place => {
            this.place = place;
            this.isBookable = place.userId !== fetchedUserId;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places/tabs/hotels-list']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }


// location details
  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.place.location.lat,
            lng: this.place.location.lng
          },
          selectable: false,
          closeButtonText: 'Close',
          title: this.place.location.address
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
