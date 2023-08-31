import { storage } from './init.js';
import { ref, uploadBytesResumable, getDownloadURL, uploadString } from 'firebase/storage';


export function uploadBase64(path, dataurl){
    return new Promise((res, rej) => {
        uploadString(ref(storage, path), dataurl, 'data_url')
            .then(async snapshot => res(await getDownloadURL(snapshot.ref)))
            .catch(rej);
            
    })
}

export function getUploadUrl(path, file){
    console.log(file);
    return new Promise((res, rej) => {
        const task = uploadBytesResumable(ref(storage, path), file, {
            contentType: file.type
        })
        task.on('state_changed', () => {} , rej, async () => {
            res(await getDownloadURL(task.snapshot.ref));
        })
    })
}