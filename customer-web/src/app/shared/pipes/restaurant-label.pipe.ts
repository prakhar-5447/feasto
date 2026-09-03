import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'restaurantLabel',
    standalone: true
})
export class RestaurantLabelPipe implements PipeTransform {

    transform(value: string): string {
        const name = value.replace(/-[a-f0-9]{24}$/i, '');

        return name
            .split('-')
            .filter(Boolean)
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            )
            .join(' ');
    }
}