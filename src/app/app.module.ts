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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
