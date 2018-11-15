/* export interface Result {
  id: number;
  name: string;
  description: string;
  //..and so on
}
*/

export class Result {
  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public body: string
  ) {}
}

