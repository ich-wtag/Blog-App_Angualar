import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetControlName, imageTypeCheck } from 'src/app/Models/commonFunctions';
import { DUMMYUSERIMAGE } from 'src/app/Models/constants';

@Component({
  selector: 'app-user-info-update-form',
  templateUrl: './user-info-update-form.component.html',
  styleUrls: ['./user-info-update-form.component.scss'],
})
export class UserInfoUpdateFormComponent {
  userImageSource: any = DUMMYUSERIMAGE;
  profileImageFileName?: string;

  getControlName = GetControlName;

  constructor(private formBuilder: FormBuilder) {}

  userInfoForm: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    subTitle: new FormControl(''),
    about: new FormControl(''),
    profileImage: new FormControl(''),
  });

  handleImageChange(event: any) {
    if (event.target?.files.length) {
      const file: File = event.target?.files[0];
      if (imageTypeCheck(file.name)) {
        this.profileImageFileName = file.name;
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          this.userInfoForm.patchValue({
            profileImage: event.target?.result,
          });
          this.userImageSource = event.target?.result;
        };

        fileReader.readAsDataURL(file);
      }
    }
  }

  onSubmnitUserInfo() {
    console.log(this.userInfoForm.value);
  }
}
