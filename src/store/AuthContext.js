import { createContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const AuthContext = createContext({
  isLoggedIn: false,
  checkAuth: true,
  logInHandler: () => {},
  checkAuthHandler: () => {},
  logOutHandler: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkAuth, setCheckAuth] = useState(true);

  const logInHandler = () => {
    setIsLoggedIn(true);
  };

  const logOutHandler = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      throw new Error("Something were wrong!");
    }
  };

  const checkAuthHandler = () => {
    setCheckAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, checkAuth, logInHandler, logOutHandler, checkAuthHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
