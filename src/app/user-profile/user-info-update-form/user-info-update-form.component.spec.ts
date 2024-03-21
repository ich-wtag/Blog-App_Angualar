import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoUpdateFormComponent } from './user-info-update-form.component';

describe('UserInfoUpdateFormComponent', () => {
  let component: UserInfoUpdateFormComponent;
  let fixture: ComponentFixture<UserInfoUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoUpdateFormComponent],
    });
    fixture = TestBed.createComponent(UserInfoUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
