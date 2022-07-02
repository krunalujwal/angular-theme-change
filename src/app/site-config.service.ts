import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService {

  date = new Date();//new Date().getTime();
  timeStamp = this.date.getDate() + '' + this.date.getFullYear() + '' + this.date.getMonth();
  client = document.location.hostname; // document.location.hostname.split('.')[0]
  port = document.location.port;
  constructor(private http: HttpClient) { }

  getSiteConfig(port = null): Promise<any> {
    if (port) { this.port = port };
    return this.http
      .get('assets/json/config.json')
      .toPromise()
      .then(appConfig => {
        let appTheme = '';
        switch (this.port) {
          case '4201':
            appTheme = 'cnhi';
            break;
          case '4202':
            appTheme = 'raven';
            break;
          case '4203':
            appTheme = 'orange';
            break;
          case '4204':
            appTheme = 'skyblue';
            break;
          case '4205':
            appTheme = 'green';
            break;
          case '4206':
            appTheme = 'purple';
            break;
          default:
            appTheme = 'default';
            break;
        }

        const cssUrl = 'assets/themes/' + appTheme + '.css';
        let _themeElement = document.getElementById('apptheme');
        if (_themeElement) {
          _themeElement.setAttribute('href', cssUrl);
          _themeElement.setAttribute('rel', 'stylesheet');
          _themeElement.setAttribute('type', 'text/css');
        }
        return this.port;
      });
  }
}
