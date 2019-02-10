import {ISuggestion} from "./searchSuggestion";

export class SearchInquiry implements ISuggestion {
  id: number;
  displayName: string;
  browserLanguage: string;
  mobileDevice: boolean;

  constructor(id: number, displayName: string, browserLanguage: string, mobileDevice: boolean) {
    this.id = id;
    this.displayName = displayName;
    this.browserLanguage = browserLanguage;
    this.mobileDevice = mobileDevice;
  }
}
