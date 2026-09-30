import { Component } from '@angular/core';

import { LucideDownload, LucideSmartphone } from '@lucide/angular';

@Component({
  selector: 'app-app-promotion',
  standalone: true,
  imports: [LucideSmartphone, LucideDownload],
  templateUrl: './app-promotion.html',
  styleUrl: './app-promotion.sass',
})
export class AppPromotion { }