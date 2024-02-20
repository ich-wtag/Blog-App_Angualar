import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreationFormComponent } from './blog-creation-form.component';

describe('BlogCreationFormComponent', () => {
  let component: BlogCreationFormComponent;
  let fixture: ComponentFixture<BlogCreationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCreationFormComponent]
    });
    fixture = TestBed.createComponent(BlogCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
