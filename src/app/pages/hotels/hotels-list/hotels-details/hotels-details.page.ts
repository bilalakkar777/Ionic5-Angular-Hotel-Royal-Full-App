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

import { HotelsService } from '../../../../services/hotel/hotels.service';
import { Place } from '../../../../Model/place.model';
import { CreateBookingComponent } from '../../bookings/create-booking/create-booking.component';
import { BookingService } from '../../../../services/Booking/booking.service';
import { AuthService } from '../../../../services/Authentication/auth.service';
import { MapModalComponent } from '../../../../components/shared/map-modal/map-modal.component';

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
  rate : number = 0;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private HotelsService: HotelsService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
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
            this.rate = place.star;
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
// When you click on the "Book" button, you will choose a random date or specify it manually
  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: this.translate.instant('hotels-details.choose'),
        buttons: [
          {
            text: this.translate.instant('hotels-details.select_date'),
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: this.translate.instant('hotels-details.random'),
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: this.translate.instant('hotels-details.cancel'),
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  // Here you can continue booking with your date selection
  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking place...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
  // for location details
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
