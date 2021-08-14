
import { log } from '../decorator/helper';

class User {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @log
  public id: number;

  @log
  public name: string;

  info() {
    return {
      id: this.id,
      name: this.name
    };
  }
}