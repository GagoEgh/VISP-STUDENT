import { Component, signal } from '@angular/core';

@Component({
  selector: 'visp-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 public weekday = signal<string[]>(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']);

 openSelect(event:any){
  console.log(event.target)
 }

}
