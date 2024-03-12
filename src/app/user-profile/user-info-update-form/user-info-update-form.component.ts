import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetControlName, imageTypeCheck } from 'src/app/Models/commonFunctions';
import { DUMMY_USER_IMAGE } from 'src/app/Models/constants';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { BlogService } from 'src/app/Services/blog.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-info-update-form',
  templateUrl: './user-info-update-form.component.html',
  styleUrls: ['./user-info-update-form.component.scss'],
})
export class UserInfoUpdateFormComponent implements OnInit {
  userImageSource: any = DUMMY_USER_IMAGE;
  profileImageFileName?: string;
  loggedInUser = this.authService.loggedInUser;

  getControlName = GetControlName;

  userInfoForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    subTitle: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required]),
    profileImage: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private blogService: BlogService
  ) {}

  handleImageChange(files: FileList | null) {
    if (files?.length) {
      const file: File = files[0];
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

  ngOnInit(): void {
    this.userInfoForm.patchValue({
      name: this.loggedInUser?.firstName + ' ' + this.loggedInUser?.lastName,
      subTitle: this.loggedInUser?.subTitle,
      about: this.loggedInUser?.about,
    });
  }

  onSubmnitUserInfo() {
    this.userService.updateUserInfo(
      this.loggedInUser?.id as number,
      this.userInfoForm,
      this.profileImageFileName as string
    );

    this.authService.updateLoginUser(
      this.loggedInUser as User,
      this.userInfoForm,
      this.profileImageFileName as string
    );

    this.blogService.updateBlogWithUser();
  }
}
