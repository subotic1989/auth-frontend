import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';

@NgModule({
  declarations: [VerificationComponent],
  imports: [CommonModule, VerificationRoutingModule, HttpClientModule],
})
export class VerificationModule {}
