import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { addUser } from "./firebase-firestore";

/**
 * Signs up a user with the given fullname, email and password.
 * @param {string} fullname - The user's fullname
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is successfully signed up, false otherwise
 * @throws {FirebaseError} - If there is an error while signing up the user
 */
export async function signUp(
  fullname: string,
  email: string,
  password: string
): Promise<boolean> {
  try {

    // creating user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // extracting user
    const user = userCredential.user;

    // generating username
    const username = email.split("@")[0] + "_" + user.uid.slice(0, 5)

    // adding user to firestore
    await addUser(email, fullname, username, user.uid);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) console.log(error.code, error.message);
    else console.error("Something went wrong while creating user.");
    return false;
  }
}

/**
 * Signs in a user with the given email and password.
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is successfully signed in, false otherwise
 * @throws {FirebaseError} - If there is an error while signing in the user
 */
export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  try {
    // signing in
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) console.log(error.code, error.message);
    else console.error("Something went wrong while logging in.");
    return false;
  }
}
