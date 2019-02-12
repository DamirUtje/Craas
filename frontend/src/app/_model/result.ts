/**
 * Model for Result
 * @author Frank, Damir
 *
 */
export class Result {
  sourceId: number;
  displayName: string;
  entityType: string;
  listType: string;
  regulationType: string;
  categoryLabel: string;
  listedOn: string;
  lastDateUpdated: string;
  firstName: string;
  lastName: string;
  nameAlias: string;
  professionalFunction: string;
  dateOfBirth: string;
  placeOfBirth: string;
  passportCountry: string;
  address: string;
  country: string;
  deleted: boolean;
  deletedOn: Date;
  loadedOn: Date;
  score: number;

  constructor(
    sourceId: number, displayName: string, entityType: string, listType: string,
    regulationType: string, categoryLabel: string, listedOn: string, lastDateUpdated: string,
    firstName: string, lastName: string, nameAlias: string, professionalFunction: string,
    dateOfBirth: string, placeOfBirth: string, passportCountry: string, address: string,
    country: string, deleted: boolean, deletedOn: Date, loadedOn: Date, score: number) {
    this.sourceId = sourceId;
    this.displayName = displayName;
    this.entityType = entityType;
    this.listType = listType;
    this.regulationType = regulationType;
    this.categoryLabel = categoryLabel;
    this.listedOn = listedOn;
    this.lastDateUpdated = lastDateUpdated;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nameAlias = nameAlias;
    this.professionalFunction = professionalFunction;
    this.dateOfBirth = dateOfBirth;
    this.placeOfBirth = placeOfBirth;
    this.passportCountry = passportCountry;
    this.address = address;
    this.country = country;
    this.deleted = deleted;
    this.deletedOn = deletedOn;
    this.loadedOn = loadedOn;
    this.score = score;
  }
}

