import { Deserializable } from './desirializable.model';
export class Event implements Deserializable {
  id: string;
  description: string;
  start_date: string;
  end_date: string;
  guests: string;

  desirialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
