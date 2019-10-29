import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform, AlertController } from '@ionic/angular';


import { LanguageService, ConfigService, AnalyticsService } from '@igo2/core';
import { AuthOptions } from '@igo2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;
  private themeClass = 'blue-theme';

  constructor(
    protected languageService: LanguageService,
    private configService: ConfigService,
    private analyticsService: AnalyticsService,
    private renderer: Renderer2,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private alertController: AlertController,

    private titleService: Title
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          let locationPermissions = false;
          let storagePermissions = false;
          let internetStatePermission = false;
          this.androidPermissions.checkPermission('android.permission.WRITE_EXTERNAL_STORAGE').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.ACCESS_FINE_LOCATION').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.ACCESS_BACKGROUND_LOCATION').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.WRITE_EXTERNAL_STORAGE').then(
            result => (storagePermissions = result.hasPermission),
            err => (storagePermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.READ_EXTERNAL_STORAGE').then(
            result => (storagePermissions = result.hasPermission),
            err => (storagePermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.ACCESS_NETWORK_STATE').then(
            result => (internetStatePermission = result.hasPermission),
            err => (internetStatePermission = false)
          );

          if (internetStatePermission === false) {
            this.androidPermissions.requestPermissions([
              'android.permission.ACCESS_NETWORK_STATE']);
          }

          if (locationPermissions === false) {
            this.androidPermissions.requestPermissions([
              'android.permission.ACCESS_COARSE_LOCATION',
              'android.permission.ACCESS_FINE_LOCATION',
              'android.permission.ACCESS_BACKGROUND_LOCATION']);
          }

          if (storagePermissions === false) {
            this.androidPermissions.requestPermissions([
              'android.permission.WRITE_EXTERNAL_STORAGE',
              'android.permission.READ_EXTERNAL_STORAGE']);
          }
        }
        this.statusBar.styleLightContent();
        this.statusBar.show();
        this.splashScreen.hide();
      }
    });

    this.authConfig = this.configService.getConfig('auth');

    const title = this.configService.getConfig('title');
    if (title) {
      this.titleService.setTitle(title);
    }

    const theme = this.configService.getConfig('theme') || this.themeClass;
    if (theme) {
      this.renderer.addClass(document.body, theme);
    }
  }
}
