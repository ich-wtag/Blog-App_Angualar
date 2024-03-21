import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BLOGID, HOME, LOGIN, REGISTER, USER } from './Models/constants';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { showSearchBox: true } },
  { path: HOME, component: HomeComponent, data: { showSearchBox: true } },
  { path: LOGIN, component: LoginComponent },
  { path: REGISTER, component: RegisterComponent },
  {
    path: USER,
    component: UserProfileComponent,
  },
  { path: BLOGID, component: BlogDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
