//@flow
export default class greet {
  prop: string;
  constructor() {
    this.prop = "Have a great day!";
  }
  hello(): string {
    return this.prop;
  }
}
