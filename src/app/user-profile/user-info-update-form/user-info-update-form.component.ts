import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  userImageSource: any;
  profileImageFileName?: string;
  loggedInUser = this.authService.loggedInUser;

  getControlName = GetControlName;

  userInfoForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(7)]),
    subTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    about: new FormControl('', [Validators.required, Validators.minLength(12)]),
    profileImage: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private blogService: BlogService,
    private toasterService: ToastrService
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
      profileImage: this.loggedInUser?.image,
    });
    this.userImageSource = this.loggedInUser?.image || DUMMY_USER_IMAGE;
    this.profileImageFileName = this.loggedInUser?.imageFileName;
  }

  resetForm() {
    this.userInfoForm.reset();
  }

  onSubmnitUserInfo() {
    if (this.userInfoForm.invalid) {
      this.showToast();
      return;
    }

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
    this.blogService.toggleUserEditForm();
    this.resetForm();
    this.toasterService.success('Successfully updated user information');
  }

  showToast() {
    if (
      this.userInfoForm.get('name')?.errors?.['required'] &&
      this.userInfoForm.get('name')?.touched
    ) {
      this.toasterService.error('name is required', 'Name');
    } else if (
      this.userInfoForm.get('name')?.errors?.['minlength'] &&
      this.userInfoForm.get('name')?.touched
    ) {
      this.toasterService.error('Please enter a valid name', 'Name');
    } else if (
      this.userInfoForm.get('subTitle')?.errors?.['required'] &&
      this.userInfoForm.get('subTitle')?.touched
    ) {
      this.toasterService.error('Sub Title is required field', 'Sub Title');
    } else if (
      this.userInfoForm.get('subTitle')?.errors?.['minlength'] &&
      this.userInfoForm.get('subTitle')?.touched
    ) {
      this.toasterService.error('Please add a valid sub title', 'Sub Title');
    } else if (
      this.userInfoForm.get('profileImage')?.errors?.['required'] &&
      this.userInfoForm.get('profileImage')?.touched
    ) {
      this.toasterService.error(
        'Please select a profileImage',
        'Profile Image'
      );
    } else if (
      this.userInfoForm.get('about')?.errors?.['required'] &&
      this.userInfoForm.get('about')?.touched
    ) {
      this.toasterService.error('About is required field', 'About');
    } else if (
      this.userInfoForm.get('about')?.errors?.['minlength'] &&
      this.userInfoForm.get('about')?.touched
    ) {
      this.toasterService.error(
        'Please add a valid description of yourself',
        'About'
      );
    } else {
      this.toasterService.error(
        'Name, Sub title, Profile image and about are the required field'
      );
    }
  }
}
