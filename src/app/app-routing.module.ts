import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./verification/verification.module').then(
        (m) => m.VerificationModule
      ),
  },
  {
    path: 'new-password',
    loadChildren: () =>
      import('./new-password/new-password.module').then(
        (m) => m.NewPasswordModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
