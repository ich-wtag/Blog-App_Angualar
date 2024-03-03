import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetControlName, imageTypeCheck } from 'src/app/Models/commonFunctions';
import { BLOGTAGS } from 'src/app/Models/constants';
import { BlogService } from 'src/app/Services/blog.service';
import { ValidatorsService } from 'src/app/Services/validators.service';

@Component({
  selector: 'app-blog-creation-form',
  templateUrl: './blog-creation-form.component.html',
  styleUrls: ['./blog-creation-form.component.scss'],
})
export class BlogCreationFormComponent implements OnInit {
  imageFileName?: string;
  blogTags: string[] = BLOGTAGS;
  isFormatError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {}

  getControlName = GetControlName;

  blogForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    tags: new FormArray([], {
      validators: [Validators.required],
    }),
    blogImage: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onBlogCreation() {
    this.blogService.addBlog(this.blogForm);
    this.resetForm();
    this.toggleBlogForm();
  }

  onImageSelection(event: any) {
    if (event.target?.files?.length) {
      const file: File = event.target.files[0];

      if (imageTypeCheck(file.name)) {
        this.isFormatError = false;
        this.imageFileName = file.name;
        const reader: FileReader = new FileReader();

        reader.onload = (e) => {
          this.blogForm.patchValue({
            blogImage: e.target?.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.isFormatError = true;
        this.imageFileName = '';
      }
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

  onCancelClicked() {
    this.resetForm();
  }

  ngOnInit(): void {
    this.updateFormTagsArray();
  }

  private updateFormTagsArray() {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.clear();
    this.blogTags.forEach((tag) => {
      tagArray.push(new FormControl(tag));
    });
  }

  private resetForm() {
    this.blogForm.reset();
    this.imageFileName = '';
    this.updateFormTagsArray();
  }

  private toggleBlogForm() {
    this.blogService.hideShowBlogForm();
  }
}
