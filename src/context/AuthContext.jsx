import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user on mount
    const savedUser = localStorage.getItem("eventmitra_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
  const userInfo = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,

    // 👇 ADD THESE (VERY IMPORTANT)
    bio: userData.bio || "",
    location: userData.location || "",

    avatar: null,
    joinedDate: new Date().toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    }),
  };

  setUser(userInfo);
  localStorage.setItem("eventmitra_user", JSON.stringify(userInfo));
  return userInfo;
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("eventmitra_user");
  localStorage.removeItem("token"); // JWT clear
};


const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bio: data.bio,
      location: data.location,
    }),
  });

  const result = await res.json();

  if (!result.success) return;

  const updatedUser = {
    ...user,
    bio: result.user.bio,
    location: result.user.location,
  };

  setUser(updatedUser);
  localStorage.setItem("eventmitra_user", JSON.stringify(updatedUser));
};



  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
