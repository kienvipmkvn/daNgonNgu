import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customInput'
})
export class CustomInputPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
