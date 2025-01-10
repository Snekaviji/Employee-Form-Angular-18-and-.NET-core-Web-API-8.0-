export interface LoginRequest {
username:string;
password:string;
}

export interface LoginResponse {
  message: string; // Message indicating the result of login
  userId?: number; // Optional userId if login is successful
}