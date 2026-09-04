import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
  standalone: true
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    console.log('BEFORE:', value);

    if (!value) return '';

    const result = value
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());

    console.log('AFTER:', result);

    return result;
  }
}