import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.sass',
})
export class Categories {

  categories = [
    {
      id: 'pizza',
      name: 'Pizza',
      icon: '🍕'
    },
    {
      id: 'burger',
      name: 'Burger',
      icon: '🍔'
    },
    {
      id: 'biryani',
      name: 'Biryani',
      icon: '🍛'
    },
    {
      id: 'chinese',
      name: 'Chinese',
      icon: '🥡'
    },
    {
      id: 'dessert',
      name: 'Dessert',
      icon: '🍰'
    },
    {
      id: 'south-indian',
      name: 'South Indian',
      icon: '🥞'
    },
    {
      id: 'north-indian',
      name: 'North Indian',
      icon: '🍲'
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: '🥤'
    }
  ];;

  selectedCategory: string | null = null;

  @Output()
  categorySelected = new EventEmitter<string | null>();
  selectCategory(id: string) {
    if (this.selectedCategory === id) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = id;
    }
    this.categorySelected.emit(this.selectedCategory);
  }
}
