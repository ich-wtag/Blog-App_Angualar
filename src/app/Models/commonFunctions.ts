import { FormControl, FormGroup } from '@angular/forms';
import { IMAGE_FILE_FORMAT } from './rexgs';

export const GetControlName = (
  formControlGroup: FormGroup,
  formControl: string
) => {
  return formControlGroup.get(formControl) as FormControl;
};

export const imageTypeCheck = (imageName: string) => {
  if (IMAGE_FILE_FORMAT.test(imageName)) {
    return true;
  }

  return false;
};

export const getId = (id: number) => {
  return `/blog/${id}`;
};
