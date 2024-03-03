import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBlogsComponent } from './personal-blogs.component';

describe('PersonalBlogsComponent', () => {
  let component: PersonalBlogsComponent;
  let fixture: ComponentFixture<PersonalBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalBlogsComponent]
    });
    fixture = TestBed.createComponent(PersonalBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
