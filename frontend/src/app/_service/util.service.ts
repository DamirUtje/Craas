import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  getLocale(): string {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator['userLanguage']
        || navigator.language
        || navigator['browserLanguage']
        || 'en'; // fallback locale
    }
  }

  isMobile(): boolean {
    if(window.innerWidth <= 800 && window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
  }

}
