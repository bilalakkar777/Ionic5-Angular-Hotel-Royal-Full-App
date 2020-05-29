import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController , AlertController} from "@ionic/angular";
import { PlatformStateService } from "src/app/services/platform-service/platform-service.service";
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/Authentication/auth.service';
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	public loginForm: FormGroup;
	public currentYear: number = new Date().getFullYear();
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
				[Validators.required]
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
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.signup(email, password).subscribe(
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
            }
            this.showAlert(message);
          }
        );
      });
	}
    //-------------- Register 

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
