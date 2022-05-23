export interface UserType {
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  manufactures: {
    id: string;
    name: string;
  }[];
  shops: {
    id: string;
    name: string;
  }[];
}
