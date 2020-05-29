import { Component, OnInit } from '@angular/core';
import { AdmobService } from '../../services/admob/admob.service';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-admob',
  templateUrl: './admob.page.html',
  styleUrls: ['./admob.page.scss'],
})
export class AdmobPage implements OnInit {
  
    //-------------- Admob ads

  constructor(
    private admobFreeService: AdmobService,
    public sidebar: SidebarService
  ) {}

  ngOnInit() {
   //-------------- Banner  
    this.admobFreeService.BannerAd();
  }
 
  showInterstitial(){
   //-------------- Interstitial  
    this.admobFreeService.InterstitialAd();
  }
  
  showRewardVideo(){
   //-------------- Rewarded Video
    this.admobFreeService.RewardVideoAd();
  }
 
}