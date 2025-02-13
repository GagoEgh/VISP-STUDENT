import { ChangeDetectionStrategy, Component,input, model} from '@angular/core';

@Component({
  selector: 'visp-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ErrorComponent{

 public isError = model<boolean>();
 public text = input<string>();

}
