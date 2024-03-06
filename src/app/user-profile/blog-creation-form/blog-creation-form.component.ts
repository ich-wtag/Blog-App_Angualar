import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/Models/blog';
import {
  GetControlName,
  getId,
  imageTypeCheck,
} from 'src/app/Models/commonFunctions';
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
    const tagArray = <FormArray>this.blogForm.get('tags');
    tagArray.clear();
    tags.forEach((tag) => {
      tagArray.push(new FormControl(tag));
    });
  }

  private resetForm() {
    this.blogForm.reset();
    this.imageFileName = '';
    this.updateFormTagsArray(BLOGTAGS);
  }

  private toggleBlogForm() {
    this.blogService.hideShowBlogForm();
  }

  private setEditedBlogValue() {
    this.blogForm.patchValue({
      title: this.editedBlog?.blogTitle,
      blogImage: this.editedBlog?.blogImage,
      description: this.editedBlog?.description,
    });
  }
}
