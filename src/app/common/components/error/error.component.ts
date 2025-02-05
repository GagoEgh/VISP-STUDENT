import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';

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
        this.isError=false},2000)
    }
    this.cdr.detectChanges()
  }
  
}
