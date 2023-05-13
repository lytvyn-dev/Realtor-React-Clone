import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useContext } from "react";
import AuthContext from "../store/AuthContext";

export function useAuthStatus() {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ctx.logInHandler();
      }
      ctx.checkAuthHandler();
    });
  }, [ctx]);
}
