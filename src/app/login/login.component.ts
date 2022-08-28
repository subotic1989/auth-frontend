import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MarkFormGroupTouched } from 'src/utils/form.service';
import { UpdateActiveUserService } from '../services/update-active-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isDialog: Boolean = false;
  responseMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private updateActiveUserService: UpdateActiveUserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [
        null,
        {
          validators: [Validators.required],
        },
      ],
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
      this.http.post('/api/v1/auth/login', this.form.value).subscribe(
        (data: any) => {
          this.isDialog = true;
          this.responseMsg = data.msg;
          this.updateActiveUserService.update.next(data.user);

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
