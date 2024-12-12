export interface CreateAdmin {
  username: string;
  email: string;
  password: string;
}

export interface UpdateAdmin {
  username?: string;
  email?: string;
}
