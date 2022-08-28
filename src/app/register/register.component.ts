import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkFormGroupTouched } from 'src/utils/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isDialog: Boolean = false;
  responseMsg = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [
        null,
        {
          validators: [Validators.required],
        },
      ],
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
      this.http.post('/api/v1/auth/register', this.form.value).subscribe(
        (data: any) => {
          this.isDialog = true;
          this.responseMsg = data.msg;
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
