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
    return window.innerWidth <= 800 && window.innerHeight <= 600;
  }

  camelCaseToRegular(text: string): string {
    text = text.replace(/([A-Z])/g, ' $1').toLocaleLowerCase(); // insert a space before all capital letters
    text = text.charAt(0).toUpperCase() + text.slice(1); // uppercase the first character
    return text;
  }

  getFormattedTime(): string {
    var today = new Date();
    var y = today.getFullYear();
    // JavaScript months are 0-based.
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
  }
}
