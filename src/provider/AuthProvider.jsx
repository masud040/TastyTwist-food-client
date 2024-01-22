import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithSocial = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const loggedUser = { email: currentUser?.email || user?.email };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios.post("http://localhost:3000/jwt", loggedUser, {
          withCredentials: true,
        });
      } else {
        axios
          .post("http://localhost:3000/logout", { withCredentials: true })
          .then((res) => console.log(res.data));
      }
    });
    return () => unSubscribe();
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithSocial,
    resetPassword,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
