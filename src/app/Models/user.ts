export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  joiningDate: string;
  password: string;
  image?: string;
  imageFileName?: string;
  subTitle?: string;
  about?: string;
  idToken?: string;
  expiresIn?: string;
}
