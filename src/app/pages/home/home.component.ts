import { 
  ChangeDetectionStrategy,
  Component, 
  EnvironmentInjector, 
  inject, 
  runInInjectionContext, 
  signal, 
  Signal, 
  WritableSignal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/api-config/api-service';
import { FromStyleService } from '../../core/services/fromStyleService';
import { Grades } from '../../core/types/grades.interface';
import { AttendanceResponse } from '../../core/types/attendance.interface';
import { Schedule } from '../../core/types/schedule.interface';
import { CloseIcon } from '../../common/ui/close-icon';
import { StudentItnerface } from '../../core/types/student.interface';
import { StudentDataService } from '../../core/services/studentData.service';
import { DatabaseService } from '../../core/services/datebase';

@Component({
  selector: 'visp-home',
  standalone: true,
  imports: [CloseIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent{
  private db = inject(DatabaseService);
  private fromStyleService = inject(FromStyleService);
  private environmentInjector = inject(EnvironmentInjector);
  private apiService = inject(ApiService);
  private studentService = inject(StudentDataService);

  public weekday:Signal<string[] | undefined> = toSignal(this.apiService.getWeekday());
  public schedule:Signal<Schedule | undefined> = toSignal( this.apiService.getSchedule());
  public attendance:Signal<AttendanceResponse | undefined> = toSignal(this.apiService.getAttendance());
  public grades:Signal<Grades | undefined> = toSignal(this.apiService.getGrades());
  public isOpen:WritableSignal<boolean> = this.fromStyleService.getIsOpen();
  public student:WritableSignal<StudentItnerface|null>= signal(null);

  constructor(){
    this.studentService.getStudent(this.student);
  }

  public getSchedule(ev:Event){
    const day:string = (ev.target as HTMLSelectElement).value; 
    runInInjectionContext(this.environmentInjector, () => {
      this.apiService = inject(ApiService);
      this.schedule = toSignal( this.apiService.getSchedule(day))
    });
  }
  
  public addNotification(event:Event):void{
    const text = (event.target as HTMLInputElement).value;
    this.student()?.notifications.push(text);
    this.db.updateStudentInfo(this.student()!);
    this.studentService.getStudent(this.student);
    (event.target as HTMLInputElement).value = '';

  }

  public deletNotification(notifiaction:string){
    const notifications = this.student()?.notifications.filter((value)=>notifiaction !== value);
    this.studentService.updateStudentDate(this.student,notifications,'notifications')
  }

}