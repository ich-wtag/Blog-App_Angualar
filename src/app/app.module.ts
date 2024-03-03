import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
