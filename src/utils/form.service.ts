import { FormGroup } from '@angular/forms';

export const MarkFormGroupTouched = (formGroup: FormGroup) => {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();

    if (control.controls) {
      MarkFormGroupTouched(control);
    }
  });
};
