import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";



export const registerUser = async (
  email: string,
  password: string
) => {
  try {
    // Create Firebase account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    return {
      success: true,
      user: user,
      message:
        "Account created successfully. Please check your email and verify your account.",
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      message: getAuthErrorMessage(error.code),
    };
  }
};

const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return "Registration failed. Please try again.";
  }
};

//sign in
export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    // Sign in user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const user = userCredential.user;

    // Check whether email is verified
    if (!user.emailVerified) {
      return {
        success: false,
        user: user,
        message:
          "Please verify your email before signing in. Check your email inbox.",
      };
    }

    // Login successful
    return {
      success: true,
      user: user,
      message: "Login successful",
    };

  } catch (error: any) {
    return {
      success: false,
      user: null,
      message: getAuthErrorMessage(error.code),
    };
  }
};

//logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Logout failed. Please try again.",
    };
  }
};

//forget password

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email.trim());

    return {
      success: true,
      message: "Password reset link has been sent to your email.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: getResetPasswordError(error.code),
    };
  }
};


const getResetPasswordError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return "Unable to send reset link. Please try again.";
  }
};



 