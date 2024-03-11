import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/Models/blog';
import {
  GetControlName,
  getId,
  imageTypeCheck,
} from 'src/app/Models/commonFunctions';
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
  isFormatError: boolean = false;
  editedBlog?: Blog;
  unSelectedBlogTags: string[] = [];
  editedBlogId!: number;
  isBlogEdited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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
    this.updateFormTagsArray();
  }

  onBlogCreation() {
    if (!this.blogForm.valid) {
      this.showToast();
      return;
    }
    if (this.isBlogEdited && this.editedBlogId) {
      this.blogService.updateBlog(
        this.editedBlogId,
        this.blogForm,
        this.imageFileName as string
      );

      this.router.navigateByUrl(getId(this.editedBlogId));
    } else {
      this.blogService.addBlog(this.blogForm, this.imageFileName as string);
    }
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

  onCancelClicked() {
    this.resetForm();
  }

  ngOnInit(): void {
    this.isBlogEdited = this.activatedRoute.snapshot.queryParams['edit'];
    this.editedBlogId = Number(this.activatedRoute.snapshot.queryParams['id']);

    if (this.editedBlogId !== undefined && this.isBlogEdited) {
      this.blogService.blogSubject.subscribe((blogs) => {
        this.editedBlog = blogs.find(
          (blog) => blog.blogId === this.editedBlogId
        );
      });
      this.setEditedBlogValue();
      this.updateFormTagsArray(this.editedBlog?.tags as string[]);
      this.imageFileName = this.editedBlog?.blogImageFileName;

      this.unSelectedBlogTags = BLOGTAGS.filter(
        (tag) => !this.editedBlog?.tags.includes(tag)
      );
    } else {
      this.updateFormTagsArray(BLOGTAGS);
    }
  }

  private updateFormTagsArray(tags: string[]) {
  updateFormTagsArray() {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.clear();
    tags.forEach((tag) => {
      tagArray.push(new FormControl(tag));
    });
  }

  showToast() {
    if (this.blogForm.get('title')?.errors?.['required']) {
      this.toastrService.error('Title is required', 'Title');
    } else if (this.blogForm.get('title')?.errors?.['minlength']) {
      this.toastrService.error('Please enter a valid Title', 'Title');
    } else if (this.blogForm.get('blogImage')?.errors?.['required']) {
      this.toastrService.error('Please select a image', 'Image');
    } else if (this.blogForm.get('description')?.errors?.['required']) {
      this.toastrService.error('Description is required', 'Description');
    } else if (this.blogForm.get('description')?.errors?.['minlength']) {
      this.toastrService.error(
        'Please enter a valid description',
        'Description'
      );
    }
  }

  ngOnInit(): void {
    this.updateFormTagsArray(BLOGTAGS);
  }

  toggleBlogForm() {
    this.blogService.hideShowBlogForm();
  }

  onCancelClicked() {
    this.resetForm();
  }

  private setEditedBlogValue() {
    this.blogForm.patchValue({
      title: this.editedBlog?.blogTitle,
      blogImage: this.editedBlog?.blogImage,
      description: this.editedBlog?.description,
    });
  }
}
