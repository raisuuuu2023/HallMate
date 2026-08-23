import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on app load, restore session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const fakeUser = {
    name: "Test User",
    email,
    role: email.includes("admin")
      ? "admin"
      : email.includes("provost")
      ? "provost"
      : "student",
  };
  const fakeToken = "fake-jwt-token";

  localStorage.setItem("token", fakeToken);
  localStorage.setItem("user", JSON.stringify(fakeUser));
  setUser(fakeUser);

  return fakeUser;
    //const res = await loginUser({ email, password });
   // const { token, user: userData } = res.data;

    //localStorage.setItem("token", token);
    //localStorage.setItem("user", JSON.stringify(userData));
    //setUser(userData);

    //return userData; // so LoginForm knows where to redirect
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}