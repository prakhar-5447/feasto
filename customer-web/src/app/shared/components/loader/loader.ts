import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.sass',
})
export class Loader {
  @Input() loading = true
  @Input() size = 18
  @Input() borderSize = 2
  @Input() color = '#ea580c'
  @Input() text = ''
  @Input() overlay = false
}
