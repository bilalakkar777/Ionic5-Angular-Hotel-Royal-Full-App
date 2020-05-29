import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController , AlertController} from "@ionic/angular";
import { PlatformStateService } from "src/app/services/platform-service/platform-service.service";
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from '../../services/Authentication/auth.service';
import { Observable } from 'rxjs';

import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup;
  public currentYear: number = new Date().getFullYear();
  public regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	loaderProcess = false;
	isLoading = false;
  isLogin = true;


  
  constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		public platformState: PlatformStateService,
		public loadingController: LoadingController,
		private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,

    private translate: TranslateService,
    private storage: Storage
) {
    this.createForm();

    //-------------- translate
    this.translate.setDefaultLang(window.navigator.language.split("-")[0]);
    
    //-------------- Your Phone language 
    this.storage.get("lang").then(lang => {
      if (lang) translate.use(lang);
      else storage.set("lang", window.navigator.language.split("-")[0]);
    });
  }

    //-------------- Validations 
	createForm() {
		this.loginForm = this.formBuilder.group({
			email: [
				"",
				[Validators.required,  Validators.pattern(this.regexEmail)]
			],
			password: [
				"",
				[Validators.required, Validators.maxLength(12), Validators.minLength(6)]
			],
			resterconnecter: [true]
		});
	}


    //-------------- To make sure your email and password is absolutely correct
  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: this.translate.instant('login.logging') })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = this.translate.instant('login.conx');
            if (code === 'EMAIL_EXISTS') {
              message = this.translate.instant('login.email-ex');
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = this.translate.instant('login.email-not-found');
            } else if (code === 'INVALID_PASSWORD') {
              message = this.translate.instant('login.pass-not-found');
            }
            this.showAlert(message);
          }
        );
      });
  }

    //-------------- Submit 

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: this.translate.instant('login.Authentication-failed'),
        message: message,
        buttons: [this.translate.instant('login.Okay')]
      })
      .then(alertEl => alertEl.present());
	}

	ngOnInit() {}
}
