import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { NewPasswordComponent } from './new-password.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
  ],
})
export class NewPasswordModule {}
