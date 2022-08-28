import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarkFormGroupTouched } from 'src/utils/form.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isDialog: Boolean = false;
  responseMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
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
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.http.post('/api/v1/auth/reset-password', this.form.value).subscribe(
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

          setTimeout(() => {
            this.isDialog = false;
          }, 2000);
        }
      );
    } else {
      MarkFormGroupTouched(this.form);
    }
  }
}
