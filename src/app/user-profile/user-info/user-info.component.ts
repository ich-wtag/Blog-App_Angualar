import { Component } from '@angular/core';
import {
  FACEBOOKICON,
  INSTRAGRAMICON,
  TWITTERICON,
  USERIMAGE,
  YOUTUBEICON,
} from 'src/app/Models/constants';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  constructor(private authService: AuthService) {}
  userImage: string = USERIMAGE;
  facebookIcon: string = FACEBOOKICON;
  twitterIcon: string = TWITTERICON;
  instragamIcon: string = INSTRAGRAMICON;
  youtubeIcon: string = YOUTUBEICON;

  loggedInUser = this.authService.loggedInUser;

  userDescription: string =
    'Meet Jonathan Doe, a passionate writer and blogger with a love for technology and travel. Jonathan holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives.';
}
