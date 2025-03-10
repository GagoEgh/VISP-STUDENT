import { Component, output, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AppRoutes } from '../pages-routes';
import { ExclamationIcon } from '../../common/ui/exclamation-icon';
import { AccountBoxIcon } from '../../common/ui/account-box-icon';
import { SchoolIcon } from '../../common/ui/school-icon';
import { EventNoteIcon } from '../../common/ui/event-note-icon';
import { CreditCardIcon } from '../../common/ui/credit-card-icon';
import { LiveHelpIcon } from '../../common/ui/live-help-icon';
import { HomeIcon } from '../../common/ui/home-icon';
import { ProctorIcon } from '../../common/ui/proctor-icon';
import { MenuIcon } from '../../common/ui/menu-icon';
import {CommonModule, UpperCasePipe} from "@angular/common";


@Component({
  selector: 'visp-nav',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule, 
    UpperCasePipe,
    ExclamationIcon,
    AccountBoxIcon,
    SchoolIcon,
    EventNoteIcon,
    CreditCardIcon,
    LiveHelpIcon,
    HomeIcon,
    MenuIcon,
    ProctorIcon],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  public isOpen = signal(false);
  readonly routes = AppRoutes;
  public isOpenChange = output<boolean>();
  
  public opened(): void {
    this.isOpen.update(open => !open);
    this.isOpenChange.emit(this.isOpen());
  }

}
