export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'police' | 'admin';
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  profile?: {
    phone?: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
    preferences?: {
      language: string;
      notifications: boolean;
    };
  };
};

type AuthResponse = {
  success: boolean;
  message?: string;
  token: string;
  user: AuthUser;
};

type ApiError = {
  error?: string;
  details?: Array<{ msg?: string; path?: string[] | string; param?: string; message?: string }>;
};

const BASE_URL = (import.meta as any).env?.VITE_AUTH_API_URL || "http://localhost:5000";

function getHeaders(withAuth = false): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (withAuth) {
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as any;
  if (!res.ok) {
    const apiErr = data as ApiError;
    const detailMsg = apiErr?.details?.[0]?.msg || apiErr?.error || "Request failed";
    throw new Error(detailMsg);
  }
  return data as T;
}

export async function signup(name: string, email: string, password: string, role: 'tourist' | 'police' = 'tourist'): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, role }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function getProfile(): Promise<{ success: boolean; user: AuthUser }> {
  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    method: "GET",
    headers: getHeaders(true),
  });
  return handleResponse(res);
}

export function saveToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export function saveUser(user: AuthUser) {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  const userStr = localStorage.getItem("auth_user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth_token");
}

export function hasRole(role: 'tourist' | 'police' | 'admin'): boolean {
  const user = getUser();
  return user?.role === role;
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: getHeaders(true),
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    clearToken();
  }
}


