export class Lang {

  // private static Values: Lang[] = {} as Lang[];

  static readonly English = new Lang("English");
  static readonly Dutch = new Lang("Nederlands");

  // -----------------------

  constructor(readonly displayValue: string) {
    // Lang.Values.push(this); // not working...
  }

  // public static parse(displayValue: string): Lang | undefined {
  //   return Lang.Values.find(l => l.displayValue === displayValue);
  // }


}
