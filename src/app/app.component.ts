import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SiteConfigService } from './site-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CNHI-CSS-TO-SCSS';
  clientName: string;

  constructor(private router: Router,
    @Inject(DOCUMENT) private document,
    private siteConfigService: SiteConfigService) {
    console.log('router', router);
    console.log('document', document);
    console.log('domain', this.document.location.hostname);

    console.log('Client :: ', this.siteConfigService.port);
    this.clientName = this.siteConfigService.port.charAt(this.siteConfigService.port.length-1);

  }

  onThemeChange(theme) {
    this.siteConfigService.getSiteConfig(theme).then((data) => {
      this.clientName = data.charAt(data.length-1);
    })
    /*  const cssUrl = 'assets/themes/' + theme + '.css';
     let _themeElement = document.getElementById('apptheme');
     console.log('_themeElement', _themeElement);
     if (_themeElement) {
       console.log('cssUrl', cssUrl);
       _themeElement.setAttribute('href', cssUrl);
       _themeElement.setAttribute('rel', 'stylesheet');
       _themeElement.setAttribute('type', 'text/css');
     } */
  }
}
