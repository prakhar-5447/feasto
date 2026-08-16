import { Component } from '@angular/core';

import { Footer } from "../../shared/components/footer/footer";
import { Landing } from "../../features/landing/landing";
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
