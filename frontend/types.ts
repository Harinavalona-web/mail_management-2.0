// frontend/types.ts
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}
