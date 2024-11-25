import { Component, EnvironmentInjector, inject, runInInjectionContext, signal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/api-config/api-service';
import { Schedule } from '../../core/types/schedule.interface';

@Component({
  selector: 'visp-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  private environmentInjector = inject(EnvironmentInjector);
  private apiService = inject(ApiService);
  public weekday = toSignal(this.apiService.getWeekday());
  public schedule = toSignal( this.apiService.getSchedule())

  public getSchedule(ev:Event){
    const day:string = (ev.target as HTMLSelectElement).value; 
    // this.schedule = toSignal( this.apiService.getSchedule(day))
    runInInjectionContext(this.environmentInjector, () => {
      this.apiService = inject(ApiService);
      this.schedule = toSignal( this.apiService.getSchedule(day))
    });
  }
}


