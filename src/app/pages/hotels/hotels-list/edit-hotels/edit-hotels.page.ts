import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HotelsService } from '../../../../services/hotel/hotels.service';
import { Place } from '../../../../Model/place.model';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-edit-hotels',
  templateUrl: './edit-hotels.page.html',
  styleUrls: ['./edit-hotels.page.scss'],
})
export class EditHotelsPage implements OnInit {
  place: Place;
  placeId: string;
  form: FormGroup;
  isLoading = false;
  public regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private HotelsService: HotelsService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,    
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
        this.navCtrl.navigateBack('/hotels/tabs/hotels-list');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.isLoading = true;
      this.placeSub = this.HotelsService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          place => {
            this.place = place;
            this.form = new FormGroup({

              title: new FormControl(this.place.title, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),

              description: new FormControl(this.place.description, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              }),

              price: new FormControl(this.place.price, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
              }),
        
              avg: new FormControl(this.place.avg, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1),  Validators.max(10)]
              }),
        
              email: new FormControl(this.place.email, {
                updateOn: 'blur',
                validators: [Validators.required,  Validators.pattern(this.regexEmail)]
              }),
        
              website : new FormControl(this.place.Website, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
        
              mobile: new FormControl(this.place.mobile, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(10)]
              }),
        
              star: new FormControl(this.place.star, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1),  Validators.max(5)]
              }),
        
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: 'Place could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/hotels/tabs/hotels-list']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }
//--------- edit
  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.HotelsService
          .updatehotel(
            this.place.id,
            this.form.value.title,
            this.form.value.description,
            this.form.value.price,
            this.form.value.avg,
            this.form.value.email,
            this.form.value.website,
            this.form.value.mobile,
            this.form.value.star
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/hotels/tabs/hotels-list']);
          });
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
