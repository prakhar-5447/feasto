import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-skeleton',
  imports: [],
  templateUrl: './categories-skeleton.html',
  styleUrl: './categories-skeleton.sass',
})
export class CategoriesSkeleton {
  readonly skeletonItems = Array(10);
}