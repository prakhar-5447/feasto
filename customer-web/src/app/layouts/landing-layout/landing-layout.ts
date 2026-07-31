import { Component } from '@angular/core';
import { Footer } from "../../shared/components/footer/footer";
import { Landing } from "../../features/landing/landing";

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [Landing, Footer],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.sass',
})
export class LandingLayout {
}
