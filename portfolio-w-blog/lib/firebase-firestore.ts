import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { BlogType } from "@/types/blog-type";

export async function addUser(email: string, fullname: string, username: string, userId: string) {
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

export async function getAllBlogs(): Promise<BlogType[] | null> {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs: BlogType[] = querySnapshot.docs.map((doc) => (
        { 
            id: doc.id, 
            title: doc.data().title, 
            content: doc.data().content,
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            author: "Sudip Mahata"
        }
    ));

    console.log(blogs);
    return blogs
  } catch (error) {
    console.log(error);
    return null
  }
}
