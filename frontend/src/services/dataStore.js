import { collection, query, onSnapshot, getDocs, where,updateDoc,doc, getDoc} from 'firebase/firestore';
import { db } from './firebase';

const getAllFiles = async () => {

    let files = [];

    let firebaseQuery = query(collection(db, 'list'), where('isActive', '==', true));
    const data = await getDocs(firebaseQuery);

    data.docs.map((doc) => { 
        files.push(doc.data().name) 
    })

    return files;
}


const checkIfAuthorized = async (password) => {

    if (!password)
        return false;
    let users = [];
    let firebaseQuery = query(collection(db, 'users'), where('isActive', '==', true), where('password', '==', password));

    const data = await getDocs(firebaseQuery);

    data.docs.map((doc) => { users.push({ ...doc.data() }) });

    if (users && users.length)
        return true;
    return false;

}

const getFileData = async (fileName) => {
    if (!fileName)
        return null;
    let files = [];
    let firebaseQuery = query(collection(db, 'list'), where('isActive', '==', true), where('name', '==', fileName));

    const data = await getDocs(firebaseQuery);

    data.docs.map((doc) => { files.push({ ...doc.data() }) });

    if (files && files.length && files[0])
        return files[0];
    return null;

}

const updateFileData = async(fileName,content) =>{

    let docId;

    let firebaseQuery = query(collection(db, 'list'), where('isActive', '==', true), where('name', '==', fileName));

    const data = await getDocs(firebaseQuery);

    docId = data.docs[0].id

    let docRef = doc(db,'list',docId)
    updateDoc(docRef,{content: content})
    .catch((err)=>{
        console.log(err)
    })

    return;
}

export { getAllFiles, checkIfAuthorized, getFileData ,updateFileData};