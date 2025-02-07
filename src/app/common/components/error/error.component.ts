import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';

@Component({
  selector: 'visp-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ErrorComponent{
  private cdr = inject(ChangeDetectorRef);
 
  @Input()text ='';
  _isError = false;

  get isError(){
    return this._isError
  }


  @Input() set isError(value:boolean){
    this._isError = value;
    if(this.isError){
      setTimeout(()=>{
        this.isError=false;
        this.isErroreChange.emit(this.isError);
        this.cdr.detectChanges()
      },2000)
    }
 
  }

  @Output()isErroreChange = new EventEmitter();

 
  
}
