import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { HotelsService } from "../../services/hotel/hotels.service";
import { switchMap } from 'rxjs/operators';
import { PlaceLocation } from '../../Model/location.model';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  public regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private HotelsService: HotelsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    public sidebar: SidebarService,
    private toastController: ToastController, 

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
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),

    /*  short_description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(80)]
      }),*/

      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),

      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),

      avg: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1),  Validators.max(10)]
      }),

      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required,  Validators.pattern(this.regexEmail)]
      }),

      website : new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),

      mobile: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(10)]
      }),

      star: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1),  Validators.max(5)]
      }),

      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null/*, { validators: [Validators.required] }*/),
      image: new FormControl(null),
    });
  }
//-------------- LocationPicked 
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

//-------------- to add new hotel 

  Addhotel() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating hotel...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.HotelsService
          .uploadImage(this.form.get('image').value)
          .pipe(
            switchMap(uploadRes => {
              return this.HotelsService.addhotel(
                this.form.value.title,
              //  this.form.value.short_description,
                this.form.value.description,
                +this.form.value.price,
                +this.form.value.avg,
                this.form.value.email,
                this.form.value.website,
                +this.form.value.mobile,
                +this.form.value.star,
                new Date(this.form.value.dateFrom),
                new Date(this.form.value.dateTo),
                this.form.value.location,
                uploadRes.imageUrl
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home']);
          });
      }); 
    //  this.presentToast('Sorry, you can t use this option with demo app', false, 'bottom', 2000);

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
