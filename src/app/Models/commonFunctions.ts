import { FormControl, FormGroup } from '@angular/forms';

export const GetControlName = (
  formControlGroup: FormGroup,
  formControl: string
) => {
  return formControlGroup.get(formControl) as FormControl;
};

export const imageTypeCheck = (imageName: string) => {
  if (/\.(jpe?g|png|gif)$/i.test(imageName)) {
    return true;
  }

  return false;
};
