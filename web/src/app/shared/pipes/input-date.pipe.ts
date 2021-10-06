import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputDate'
})
export class InputDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const date = value.split('T')[0];
    return date;
  }

}
