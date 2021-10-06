import { Deserializable } from './desirializable.model';
export class User implements Deserializable {
  id: string;
  email: string;
  name: string;

  desirialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
