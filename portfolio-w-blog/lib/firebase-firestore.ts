import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { BlogType } from "@/types/blog-type";
import { UserType } from "@/types/user-type";

/**
 * Adds a user to the database.
 * @param {string} email - The user's email
 * @param {string} fullname - The user's fullname
 * @param {string} username - The user's username
 * @param {string} userId - The ID of the user
 * @returns {Promise<void>} - A promise that resolves when the user is successfully added, rejects otherwise
 * @throws {FirebaseError} - If there is an error while adding the user
 */
export async function addUser(
  email: string,
  fullname: string,
  username: string,
  userId: string
) {
  try {
    const docRef = await setDoc(doc(db, "users", userId), {
      email,
      fullname,
      username,
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserFromUID(userId: string): Promise<UserType | null> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return { ...docSnap.data(), uid: userId } as UserType;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
}

/**
 * Adds a blog to the database
 * @param {string} title - The title of the blog
 * @param {string} content - The content of the blog
 * @param {string} userId - The ID of the user who is adding the blog
 * @returns {Promise<boolean>} - A promise that resolves to the ID of the blog if it is successfully added, null otherwise
 * @throws {FirebaseError} - If there is an error while adding the blog
 */
export async function addBlog(
  title: string,
  content: string,
  userId: string
): Promise<boolean> {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      content,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      userRef: `/users/${userId}`,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.log("Error adding document: ", error);
    return false;
  }
}

export async function deleteBlogwithId(blogId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getBlogWithId(blogId: string): Promise<BlogType | null> {
  try {
    const docRef = doc(db, "blogs", blogId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // get user from ref
      const uid = docSnap.data().userRef.toString().split("/")[2];
      const user = await getUserFromUID(uid);
      console.log("Document data:", docSnap.data());
      if (!user) {
        console.log("User not found");
        return null;
      }
      return {
        id: blogId,
        title: docSnap.data().title,
        author: user?.fullname,
        content: docSnap.data().content,
        createdAt: docSnap.data().createdAt,
        updatedAt: docSnap.data().updatedAt,
      } as BlogType;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUIDOfBlog(blogId: string): Promise<string | null> {
  try {
    const docRef = doc(db, "blogs", blogId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // get userID from ref
      const uid = docSnap.data().userRef.toString().split("/")[2];
      return uid;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Retrieves all the blogs from the database.
 * @returns {Promise<BlogType[] | null>} - A promise that resolves to an array of blogs if they are successfully retrieved, null otherwise
 * @throws {FirebaseError} - If there is an error while retrieving the blogs
 */
export async function getAllBlogs(): Promise<BlogType[] | null> {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs: BlogType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      author: "Sudip Mahata",
    }));

    console.log(blogs);
    return blogs;
  } catch (error) {
    console.log(error);
    return null;
  }
}
