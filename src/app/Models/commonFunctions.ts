import { FormControl, FormGroup } from '@angular/forms';
import { IMAGE_FILE_FORMAT } from './rexgs';
import { ToastrService } from 'ngx-toastr';

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
