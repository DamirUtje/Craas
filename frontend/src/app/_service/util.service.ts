import { Injectable } from '@angular/core';

/**
 * Utils service
 * @author Frank, Damir
 */
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
    return window.innerWidth <= 850 && window.innerHeight <= 850;
  }

  camelCaseToRegular(text: string): string {
    text = text.replace(/([A-Z])/g, ' $1').toLocaleLowerCase(); // insert a space before all capital letters
    text = text.charAt(0).toUpperCase() + text.slice(1); // uppercase the first character
    return text;
  }

  getFormattedTime(): string {
    let today = new Date();
    let y = today.getFullYear();
    // JavaScript months are 0-based.
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let h = today.getHours();
    let mi = today.getMinutes();
    let s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
  }

  getOptimumPageSize(navBarHeight: number): number {
    let pageSize = (window.innerHeight - navBarHeight) / 60;

    return Math.max(Math.floor(pageSize), 10);
  }
}
