import { Component } from '@angular/core';
import { boltIcon, ClarityIcons, clipboardIcon, fileIcon, userIcon } from '@cds/core/icon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';
  selected = 2;
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('ar');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ar');
    ClarityIcons.addIcons(userIcon,fileIcon,clipboardIcon);
}
}
