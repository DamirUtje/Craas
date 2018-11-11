export class LoadOptions {

  constructor(){

  }

  filter: {
    searchString: string;
    dateFrom: Date;
    dateTo: Date;
  };
  skip: number;
  take: number;
}
