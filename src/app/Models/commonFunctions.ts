import { FormControl, FormGroup } from '@angular/forms';

export const GetControlName = (
  formControlGroup: FormGroup,
  formControl: string
) => {
  return formControlGroup.get(formControl) as FormControl;
};
