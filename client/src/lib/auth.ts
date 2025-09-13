import { apiRequest } from "./queryClient";
import type { User, LoginRequest, InsertUser } from "@shared/schema";

export async function loginUser(credentials: LoginRequest): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/login", credentials);
  return response.json();
}

export async function registerUser(userData: InsertUser): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/register", userData);
  return response.json();
}
