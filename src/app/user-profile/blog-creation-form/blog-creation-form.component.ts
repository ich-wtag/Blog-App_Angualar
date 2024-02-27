import { Component, ElementRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetControlName } from 'src/app/Models/commonFunctions';
import { ValidatorsService } from 'src/app/Services/validators.service';

@Component({
  selector: 'app-blog-creation-form',
  templateUrl: './blog-creation-form.component.html',
  styleUrls: ['./blog-creation-form.component.scss'],
})
export class BlogCreationFormComponent {
  imageSrc?: string;
  imageFileName?: string;

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService
  ) {}

  getControlName = GetControlName;

  blogForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    tags: new FormArray(
      [
        new FormControl('Technology'),
        new FormControl('Poetry'),
        new FormControl('Films'),
        new FormControl('World Politics'),
      ],
      {
        validators: [Validators.required],
      }
    ),
    bannerImage: new FormControl(Object, {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onBlogCreation() {
    console.log(this.blogForm.value);
  }

  onImageSelection(event: any) {
    if (event.target?.files?.length) {
      this.imageSrc = URL.createObjectURL(event.target.files[0]);
      this.imageFileName = event.target.files[0].name;

      this.blogForm.patchValue({
        bannerImage: this.imageSrc,
      });
    }
  }

  getSelectedTag(tag: string) {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.push(new FormControl(tag));
  }

  removeUnselectedTags(indexNumber: number) {
    let tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.removeAt(indexNumber);
  }
}
