import { collection, addDoc, query, where,getDocs, updateDoc  } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utilities/firebase"; 

export const cache = new Map();
let value = 0;
let uid = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        convertCacheToDb(uid); 
      } else {
        uid = null;
      }
})

export async function getCache() {
    if(uid!==null) {
        return await getCacheFromDb(uid);
    } else {
        return Array.from(cache.keys())
    }
    
}
export async function addToCache(item) {
    const formattedValue = item.split('=').at(0)

    if(uid!==null) {
        value++;
        await addToDb(uid,formattedValue,value,false)
        return formattedValue;
    } else {
        if(cache.has(formattedValue)) {
            return;
        }
        value++;
        cache.set(formattedValue,value);
        return formattedValue;
    }
}

const addToDb = async (uuid,id,index,activity) => {
    const existsInDb = await hasInDb(id);
    if(existsInDb) {
        return;
    }
    try {
        await addDoc(collection(db, "cache"), {
          uid: uuid,
          trackId: id,
          position: index,
          cleared: activity
        });
      } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const hasInDb = async (trackId) => {
    try {
        const cacheQuery = query(collection(db, "cache"), where("trackId", "==", trackId),where("cleared","==",false));
        const querySnapshot = await getDocs(cacheQuery);
    
        return !querySnapshot.empty; 
      } catch (e) {
        console.error("Error checking cache existence in Firestore: ", e);
        return false;
      }
}

const getCacheFromDb = async (userUid) => {
    try {
        const userCacheQuery = query(collection(db,"cache"),where("uid","==",userUid),where("cleared","==",false));
        const querySnapshot = await getDocs(userCacheQuery);

        const tempCache = [];
        querySnapshot.forEach((doc)=> {
            tempCache.push(doc.data().trackId);
        });

        return tempCache;
    } catch (e) {
        console.error("Error fetching cache from Firestore: ", e);
        return [];
      }
}

const convertCacheToDb = async (userUid) => {
    if(uid !== null && cache.size > 0) {
        try {
            for (const [key, value] of cache.entries()) {
              await addToDb(userUid, key, value,false);
            }
            cache.clear(); 
        } catch (e) {
            console.error("Error converting local cache to Firestore: ", e);
        }
    }
}

export const clearCache = async () => {
    if(uid !== null) {
        const userCacheQuery = query(collection(db,"cache"),where("uid","==",uid), where("cleared","==",false));
        const querySnapshot = await getDocs(userCacheQuery);

        querySnapshot.forEach((doc)=> {
            updateDoc(doc.ref, {
                cleared: true,
            }).catch((error) => console.error("Error clearing document: ", error));
        });
    } else {
        cache.clear();
    }
}