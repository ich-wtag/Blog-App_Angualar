import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetControlName } from 'src/app/Models/commonFunctions';
import { ValidatorsService } from 'src/app/Services/validators.service';

@Component({
  selector: 'app-blog-creation-form',
  templateUrl: './blog-creation-form.component.html',
  styleUrls: ['./blog-creation-form.component.scss'],
})
export class BlogCreationFormComponent {
  imageSrc?: string;
  bannerImage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService
  ) {}

  getControlName = GetControlName;

  blogForm: FormGroup = this.formBuilder.group({
    title: new FormControl(''),
    tags: new FormArray([new FormControl('')]),
    bannerImage: new FormControl(Object),
    description: new FormControl(''),
  });

  onBlogCreation() {
    this.blogForm.patchValue({
      bannerImage: this.imageSrc,
    });
  }

  onImageSelection(event: any) {
    this.bannerImage = event.target.files[0];
    console.log(URL.createObjectURL(event.target.files[0]));

    this.imageSrc = URL.createObjectURL(event.target.files[0]);
  }
}
