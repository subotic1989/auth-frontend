import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.interface';
import { UpdateActiveUserService } from '../services/update-active-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private http: HttpClient,
    private updateActiveUserService: UpdateActiveUserService
  ) {}

  ngOnInit(): void {
    this.initValue();
  }

  initValue() {
    this.http.get('/api/v1/auth/showUser').subscribe((data: any) => {
      this.user = data?.user;
    });
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  onLogout() {
    this.http.delete('/api/v1/auth/logout').subscribe((data: any) => {
      this.user = data.user;
      this.updateActiveUserService.update.next(data.user);
    });
  }
}
