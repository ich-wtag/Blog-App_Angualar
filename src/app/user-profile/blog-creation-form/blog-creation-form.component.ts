import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetControlName, imageTypeCheck } from 'src/app/Models/commonFunctions';
import { BLOG_TAGS } from 'src/app/Models/constants';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-blog-creation-form',
  templateUrl: './blog-creation-form.component.html',
  styleUrls: ['./blog-creation-form.component.scss'],
})
export class BlogCreationFormComponent implements OnInit {
  imageFileName?: string;
  blogTags: string[] = BLOG_TAGS;
  selectedTags: string[] = [];

  getControlName = GetControlName;

  blogForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    tags: new FormArray([]),
    blogImage: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private toastrService: ToastrService
  ) {}

  getSelectedTag(tag: string) {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.push(new FormControl(tag));
  }

  resetForm() {
    this.blogForm.reset();
    this.imageFileName = '';
    this.selectedTags = [];
    this.updateFormTagsArray();
  }

  onBlogCreation() {
    if (this.blogForm.invalid) {
      this.showToast();
      return;
    }
    this.blogService.addBlog(this.blogForm);
    this.resetForm();
    this.toggleBlogForm();
    this.toastrService.success('New blog created successfully');
  }

  onImageSelection(files: FileList | null) {
    if (files?.length) {
      const file: File = files[0];

      if (imageTypeCheck(file.name)) {
        this.imageFileName = file.name;
        const reader: FileReader = new FileReader();

        reader.onload = (e) => {
          this.blogForm.patchValue({
            blogImage: e.target?.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.imageFileName = '';
        this.toastrService.error(
          'Please select the specified image type',
          'Image'
        );
      }
    }
  }

  removeUnselectedTags(indexNumber: number) {
    let tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.removeAt(indexNumber);
  }

  updateFormTagsArray() {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.clear();
    this.blogTags.forEach((tag) => {
      tagArray.push(new FormControl(tag));
    });
  }

  showToast() {
    if (
      this.blogForm.get('title')?.errors?.['required'] &&
      this.blogForm.get('title')?.touched
    ) {
      this.toastrService.error('Title is required', 'Title');
    } else if (
      this.blogForm.get('title')?.errors?.['minlength'] &&
      this.blogForm.get('title')?.touched
    ) {
      this.toastrService.error('Please enter a valid Title', 'Title');
    } else if (
      this.blogForm.get('blogImage')?.errors?.['required'] &&
      this.blogForm.get('blogImage')?.touched
    ) {
      this.toastrService.error('Please select a image', 'Image');
    } else if (
      this.blogForm.get('description')?.errors?.['required'] &&
      this.blogForm.get('description')?.touched
    ) {
      this.toastrService.error('Description is required', 'Description');
    } else if (
      this.blogForm.get('description')?.errors?.['minlength'] &&
      this.blogForm.get('description')?.touched
    ) {
      this.toastrService.error(
        'Please enter a valid description',
        'Description'
      );
    } else {
      this.toastrService.error(
        'Title, Image and body are required field for blog creation'
      );
    }
  }

  ngOnInit(): void {
    this.updateFormTagsArray();
  }

  toggleBlogForm() {
    this.blogService.hideShowBlogForm();
  }

  onCancelClicked() {
    this.resetForm();
  }
}
