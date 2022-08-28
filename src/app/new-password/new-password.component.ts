import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkFormGroupTouched } from 'src/utils/form.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;

  email: string;
  token: string;

  isDialog: Boolean = false;
  responseMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getQueryString();
  }

  getQueryString() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  initForm() {
    this.form = this.fb.group({
      password: [
        null,
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.http
        .post('/api/v1/auth/set-new-password', {
          email: this.email,
          token: this.token,
          password: this.form.value,
        })
        .subscribe(
          (data: any) => {
            this.isDialog = true;
            this.responseMsg = data.msg;

            setTimeout(() => {
              this.isDialog = false;
              this.router.navigate(['/']);
            }, 2000);
          },
          (err) => {
            this.isDialog = true;
            this.responseMsg = err.error.msg;
            setTimeout(() => (this.isDialog = false), 2000);
          }
        );
    } else {
      MarkFormGroupTouched(this.form);
    }
  }
}
