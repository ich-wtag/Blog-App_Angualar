import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HOME, LOGIN, REGISTER, ME } from './Models/constants';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: HOME, component: HomeComponent },
  { path: LOGIN, component: LoginComponent },
  { path: REGISTER, component: RegisterComponent },
  { path: ME, component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
