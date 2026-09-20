import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";



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


// Firebase error messages
 