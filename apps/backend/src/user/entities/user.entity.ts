export default interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  birthday: Date;
  imgUrl?: string;
}
