import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'visp-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SuccessComponent {
 public isSuccess = model<boolean>();
 public text = input<string>();
}
