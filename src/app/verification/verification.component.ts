import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  responseMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getQueryString();
  }

  getQueryString() {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      const token = params['token'];

      this.http.post('/api/v1/auth/verification', { email, token }).subscribe(
        (data: any) => {
          console.log(data);
          this.responseMsg = data.msg;
        },
        (err) => {
          this.responseMsg = err.error.msg;
        }
      );
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
