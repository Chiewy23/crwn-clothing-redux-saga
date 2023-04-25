import { initializeApp } from "firebase/app";

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

import { 
    getAuth,
    signInWithPopup,
    signInWithRedirect, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyDfSuWd5WhxPAs1SONWhekzBsBXiaVtXVA",
    authDomain: "crwn-clothing-db-61eec.firebaseapp.com",
    projectId: "crwn-clothing-db-61eec",
    storageBucket: "crwn-clothing-db-61eec.appspot.com",
    messagingSenderId: "249324018099",
    appId: "1:249324018099:web:229eae4960de57eb3553c6"
};
  
export const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    propmt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCategoriesAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {

    if (!userAuth) {
        return;
    }

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
        } catch(error) {
            console.log("ERROR: Creating user - ", error.message);
        }
    }

    return userSnapshot;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}