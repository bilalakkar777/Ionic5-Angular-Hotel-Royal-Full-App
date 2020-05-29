import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { BookingService } from '../../../services/Booking/booking.service';
import { Booking } from '../../../Model/booking.model';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];
  isLoading = false;
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController, 
    public sidebar: SidebarService,    
    private translate: TranslateService,
    private storage: Storage
  ) {
    //Automatically change the language depending on your phone
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }
  
  ngOnInit() {
    this.presentToast('Drag to the left for delete booking', false, 'bottom', 2000);

    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.presentToast('Drag to the left for delete booking', false, 'bottom', 2000);

    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  // to cancel a booking
  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

}
