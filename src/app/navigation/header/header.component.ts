import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth : boolean = false;
  authSubscription!: Subscription;
  @Output() sidenav = new EventEmitter<void>();
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe( authStatus =>{
      this.isAuth = authStatus;
    })
  }

  onToggle(){
    this.sidenav.emit()
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
