import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatabaseService } from '../../../core/services/datebase';

@Component({
  selector: 'visp-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SuccessComponent {
  public db = inject(DatabaseService)
  public text = 'Information is updatenig';

  constructor(){}
}
