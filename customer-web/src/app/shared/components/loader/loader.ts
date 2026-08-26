import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loader {

  readonly size =
    input<number>(18);

  readonly borderSize =
    input<number>(2);

  readonly text =
    input<string>('');

  readonly overlay =
    input<boolean>(false);

  readonly label =
    input<string>('Loading...');
}