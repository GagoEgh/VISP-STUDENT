import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[vispClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output()outsideClick = new EventEmitter<void>();
  constructor(private currentElementRef:ElementRef) { }

  @HostListener('document:mouseup', ['$event.target'])
  onClickOutside(targetElem:HTMLElement){

    const elem = this.currentElementRef.nativeElement;
    const popup = document.getElementById("popup");
    let clickedInside = false;

    if(popup){
      clickedInside= popup!.contains(targetElem);
    }

    if(!clickedInside){
      this.outsideClick.emit();
    }
   
  }
}
