export interface UserDefault {
  user: {
    name: string;
    email: string;
    username: string;
  };
  isLoggedIn: boolean;
}
const userDefault: UserDefault = {
  user: {
    name: '',
    username: '',
    email: ''
  },
  isLoggedIn: false
};

export default userDefault;
