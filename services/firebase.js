import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
} from "firebase/firestore/lite";
import { db } from "../config/firebase";

export async function getImageById(imageId) {
  const docRef = doc(db, "images", imageId);
  const result = await getDoc(docRef);

  return result;
}

const initialProducts = (last, by, direction, first, type) => {
  if (type === "prev") {
    return query(
      collection(db, "products"),
      orderBy(by, direction),
      endBefore(first),
      limitToLast(6)
    );
  } else {
    return query(
      collection(db, "products"),
      limit(6),
      orderBy(by, direction),
      startAfter(last ?? "")
    );
  }
};

// Get a list of products from database
export async function getProducts(last, by, direction, first, type) {
  const prodductsCol = initialProducts(
    last ?? "",
    by ?? "name",
    direction ?? "asc",
    first,
    type
  );

  const productSnapshot = await getDocs(prodductsCol);
  const productList = productSnapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  return productList;
}
