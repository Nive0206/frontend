import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import "./Account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent infinite loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || "User",
          email: currentUser.email || "No email provided",
        });
      } else {
        setUser(null);
      }
      setLoading(false); // Stop loading once data is set
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Temporary loading indicator
  }

  if (!user) {
    return <p>Please log in to view your account.</p>; // Redirect if not logged in
  }

  return (
    <div className="account-container">
      <h2>Hi, {user.displayName}!</h2>

      {/* Account Sections */}
      <div className="account-sections">
        <div className="account-box">
          <h3>Your Orders</h3>
          <p>Track, return, or buy things again</p>
        </div>

        <div className="account-box">
          <h3>Login & Security</h3>
          <p>Edit login, name, and mobile number</p>
        </div>

        <div className="account-box">
          <h3>Your Addresses</h3>
          <p>Edit addresses for orders and gifts</p>
        </div>

        <div className="account-box">
          <h3>Contact Us</h3>
          <p>Get help or send us a message</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
