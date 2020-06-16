export class Packages {
  constructor(
    public packageId: number,
    public summary: string,
    public term: string,
    public amount: number,
    public selected: boolean,
    public type: string
  ) { }
}     