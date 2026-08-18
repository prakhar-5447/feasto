import { Component } from '@angular/core';

import { Footer } from "../../shared/components/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [RouterOutlet, Footer],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.sass',
})
export class LandingLayout {
}
