import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../Services/user.service';

export const GetControlName = (
  formControlGroup: FormGroup,
  formControl: string
) => {
  return formControlGroup.get(formControl) as FormControl;
};
