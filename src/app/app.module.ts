import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InputComponent } from './Models/input/input.component';
import { ButtonComponent } from './Models/button/button.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './user-profile/user-info/user-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BlogCreationFormComponent } from './user-profile/blog-creation-form/blog-creation-form.component';
import { TextareaComponent } from './Models/textarea/textarea.component';
import { SelectComponent } from './Models/select/select.component';
import { PersonalBlogsComponent } from './user-profile/personal-blogs/personal-blogs.component';
import { BlogComponent } from './Models/blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InputComponent,
    ButtonComponent,
    HomeComponent,
    HeaderComponent,
    UserInfoComponent,
    UserProfileComponent,
    BlogCreationFormComponent,
    TextareaComponent,
    SelectComponent,
    PersonalBlogsComponent,
    BlogComponent,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
