import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { UpdateActiveUserService } from '../services/update-active-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null;

  constructor(
    private http: HttpClient,
    private updateActiveUserService: UpdateActiveUserService
  ) {}

  ngOnInit(): void {
    this.initValues();
    this.updateActiveUser();
  }

  initValues() {
    this.http.get('/api/v1/auth/showUser').subscribe((data: any) => {
      this.user = data.user.name;
    });
  }

  updateActiveUser() {
    this.updateActiveUserService.update.subscribe((data) => {
      this.user = data?.name;
    });
  }
  // initValues() {
  //   this.userDataService.activeUser.subscribe((data: any) => {
  //     console.log(data);
  //     this.user = data;
  //   });
  // }
}
