import { Component } from '@angular/core';
import { ClarityIcons, clipboardIcon, fileIcon, userIcon, languageIcon, cogIcon, applicationIcon } from '@cds/core/icon';
import { TranslateService } from '@ngx-translate/core';
import '@cds/core/icon/register.js';
import '@cds/core/button/register.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    const lang = browserLang ? (browserLang.match(/en|fr/) ? browserLang : 'en') : 'en';
    this.translate.use(lang);
    ClarityIcons.addIcons(userIcon, fileIcon, clipboardIcon, languageIcon, cogIcon, applicationIcon);
  }

  selectLang(lang: string) {
    this.translate.use(lang);
  }

  themUpdate(theme: string) {
    console.log(`them is : ${theme}`)
  }

  isLoggedIn(): boolean {
    return Boolean(sessionStorage.getItem('login'));
  }
}
