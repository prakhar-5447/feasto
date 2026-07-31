import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return ''
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }
}
