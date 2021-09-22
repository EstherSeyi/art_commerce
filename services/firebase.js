import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore/lite";
import { db } from "../config/firebase";

export async function getImageById(imageId) {
  const docRef = doc(db, "images", imageId);
  const result = await getDoc(docRef);

  return result;
}

const initialProducts = (last, by, direction) => {
  return query(
    collection(db, "products"),
    limit(6),
    orderBy(by, direction),
    startAfter(last ?? "")
  );
};

// Get a list of products from database
export async function getProducts(last, by, direction) {
  const prodductsCol = initialProducts(last, by ?? "name", direction ?? "asc");

  const productSnapshot = await getDocs(prodductsCol);
  const productList = productSnapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  return productList;
}

export async function sortProducts(by) {
  const q = query(collection(db, "products"), orderBy(by, "desc"), limit(6));
  const x = await getDocs(q);

  return x.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
}

export async function getPaginated(last = "", by, direction, type = "next") {
  const next = query(
    collection(db, "products"),
    orderBy(by ?? "name", direction ?? "asc"),
    startAfter(last),
    limit(6)
  );
  const nextPage = await getDocs(next);

  if (type === "next") {
    return nextPage.docs.map((doc) => {
      return { ...doc.data(), docId: doc.id };
    });
  } else {
    return [];
  }
}
