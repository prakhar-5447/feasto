import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'slug',
    standalone: true
})
export class SlugPipe implements PipeTransform {

    transform(value: string | null | undefined): string {

        if (!value) {
            return '';
        }

        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    }
}