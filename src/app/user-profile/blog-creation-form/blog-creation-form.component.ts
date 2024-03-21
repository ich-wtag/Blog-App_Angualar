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
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-blog-creation-form',
  templateUrl: './blog-creation-form.component.html',
  styleUrls: ['./blog-creation-form.component.scss'],
})
export class BlogCreationFormComponent implements OnInit {
  imageFileName?: string;
  blogTags: string[] = BLOG_TAGS;
  selectedTags: string[] = [];
  isFormatError: boolean = false;
  editedBlog?: Blog;
  unSelectedBlogTags: string[] = [];
  editedBlogId!: string;
  isBlogEdited: boolean = false;

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
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  getLoggedInUser() {
    this.authService.getLoggedInUser();
    return this.authService.loggedInUser;
  }

  getSelectedTag(tag: string) {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.push(new FormControl(tag));
  }

  resetForm() {
    this.blogForm.reset();
    this.imageFileName = '';
    this.selectedTags = [];
    this.updateFormTagsArray(BLOG_TAGS);
  }

  onBlogCreation() {
    const loggedInUser = this.getLoggedInUser();
    if (Object.keys(<User>loggedInUser).length === 0) {
      this.toastrService.error('Please login befor add or edit a blog');
      return;
    }

    if (this.blogForm.invalid) {
      this.showToast();
      return;
    }
    if (this.isBlogEdited && this.editedBlogId) {
      // this.blogService.updateBlog(
      //   this.editedBlogId,
      //   this.blogForm,
      //   this.imageFileName as string
      // );
      // this.router.navigateByUrl(getId(this.editedBlogId));
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

  ngOnInit(): void {
    this.isBlogEdited = this.activatedRoute.snapshot.queryParams['edit'];
    this.editedBlogId = this.activatedRoute.snapshot.queryParams['id'];

    if (this.editedBlogId !== undefined && this.isBlogEdited) {
      this.blogService.getSingleBlog(this.editedBlogId);

      this.blogService.blogSubject.subscribe((blogs) => {
        if (blogs.length) {
          this.editedBlog = blogs.find((blog) => {
            return blog.blogId === this.editedBlogId;
          });
          if (this.editedBlog?.blogId) {
            this.setEditedBlogValue();
            this.updateFormTagsArray(this.editedBlog?.tags as string[]);
            this.imageFileName = this.editedBlog?.blogImageFileName;

            this.unSelectedBlogTags = BLOG_TAGS.filter(
              (tag) => !this.editedBlog?.tags.includes(tag)
            );
          }
        }
      });
    } else {
      this.updateFormTagsArray(BLOG_TAGS);
    }
  }

  updateFormTagsArray(tags: string[]) {
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.clear();
    tags.forEach((tag) => {
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

  toggleBlogForm() {
    this.blogService.hideShowBlogForm();
  }

  onCancelClicked() {
    if (this.editedBlogId && this.isBlogEdited) {
      this.router.navigateByUrl(getId(this.editedBlogId));
    }
    this.resetForm();
  }

  setEditedBlogValue() {
    this.blogForm.patchValue({
      title: this.editedBlog?.blogTitle,
      blogImage: this.editedBlog?.blogImage,
      description: this.editedBlog?.description,
    });
  }
}
