import { Component } from '@angular/core';

@Component({
  selector: 'app-cuisines',
  standalone: true,
  imports: [],
  templateUrl: './cuisines.html',
  styleUrl: './cuisines.sass',
})
export class Cuisines {
  cuisines = [
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?w=1200&h=400&fit=crop&q=80",
      restaurants: "150+ restaurants"
    },
    {
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1651843465180-5965076f7368?w=1200&h=400&fit=crop&q=80",
      restaurants: "120+ restaurants"
    },
    {
      name: "Asian",
      image: "https://images.unsplash.com/photo-1652937916838-09b9c2ff8b45?w=1200&h=400&fit=crop&q=80",
      restaurants: "200+ restaurants"
    },
    {
      name: "Healthy",
      image: "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?w=1200&h=400&fit=crop&q=80",
      restaurants: "80+ restaurants"
    },
    {
      name: "Desserts",
      image: "https://images.unsplash.com/photo-1759426016293-1b8be5849a72?w=1200&h=400&fit=crop&q=80",
      restaurants: "100+ restaurants"
    }
  ];
}
