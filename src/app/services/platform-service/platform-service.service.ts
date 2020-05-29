import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformStateService {

  constructor(private platform: Platform) { }

  /**
   * Checks if the platform is a mobile device
   */
  isPlatformMobile(): boolean {
    return this.platform.is('mobile') && this.platform.is('tablet') === false;
  }

  /**
   * Checks if the platform is a tablet device
   */
  isPlatformTablet(): boolean {
    return this.platform.is('tablet');
  }

  /**
   * Checks if the platform is a laptop or desktop device
   */
  isPlatformDesktop(): boolean {
    return this.platform.is('desktop');
  }

  /**
   * Checks if the screen orientation is on portrait mode
   */
  isPortrait(): boolean {
    return this.platform.isPortrait();
  }

  /**
   * Checks if the screen orientation is on landscape mode
   */
  isLandscape(): boolean {
    return this.platform.isLandscape();
  }
}
