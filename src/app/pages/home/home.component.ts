import { 
  ChangeDetectionStrategy,
  Component, 
  EnvironmentInjector, 
  inject, 
  runInInjectionContext, 
  Signal, 
  WritableSignal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/api-config/api-service';
import { FromStyleService } from '../../core/services/fromStyleService';
import { Grades } from '../../core/types/grades.interface';
import { AttendanceResponse } from '../../core/types/attendance.interface';
import { Schedule } from '../../core/types/schedule.interface';

@Component({
  selector: 'visp-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent{

  private fromStyleService = inject(FromStyleService);
  private environmentInjector = inject(EnvironmentInjector);
  private apiService = inject(ApiService);
  
  public weekday:Signal<string[] | undefined> = toSignal(this.apiService.getWeekday());
  public schedule:Signal<Schedule | undefined> = toSignal( this.apiService.getSchedule());
  public attendance:Signal<AttendanceResponse | undefined> = toSignal(this.apiService.getAttendance());
  public grades:Signal<Grades | undefined> = toSignal(this.apiService.getGrades());
  public isOpen:WritableSignal<boolean> = this.fromStyleService.getIsOpen();


  public getSchedule(ev:Event){
    const day:string = (ev.target as HTMLSelectElement).value; 
    runInInjectionContext(this.environmentInjector, () => {
      this.apiService = inject(ApiService);
      this.schedule = toSignal( this.apiService.getSchedule(day))
    });
  }

}