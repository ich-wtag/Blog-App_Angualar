import { FormControl, FormGroup } from '@angular/forms';

export const GetControlName = (
  formControlGroup: FormGroup,
  formControl: string
) => {
  return formControlGroup.get(formControl) as FormControl;
};

export const imageTypeCheck = (imageName: string) =>
  /\.(jpe?g|png|gif)$/i.test(imageName);

export const getId = (id: number) => {
  return `blog/${id}`;
};
