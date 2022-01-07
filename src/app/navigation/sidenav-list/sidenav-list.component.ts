import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{

  isAuth : boolean = false;
  authSubscription !: Subscription;
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
   this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onClose(){
    this.closeSideNav.emit();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }
  
  ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
  }
}
