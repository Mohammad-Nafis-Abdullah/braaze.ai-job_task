/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { deleteObject, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../Firebase/firebase.init";


const imgUrl = (imgName)=> {
    if (!imgName) {
        return false;
    }
    const storeName = process.env.REACT_APP_storageBucket.split('//')[1];
    return `https://firebasestorage.googleapis.com/v0/b/${storeName}/o/${imgName}?alt=media`;
}
export {imgUrl};


const imageNaming = (name='')=> {
    if (!name) {
        return;
    }
    return `${Date.now()}-${name.trim().split(' ').join('-')}`;
}


const useMyStorage = () => {
    const [uploadFile, uploading, snapshot, error] = useUploadFile();

    // single image upload
    const uploadImage = (file=undefined) => {
        if(!file){
            // console.log('no file');
            return;
        }
        
        return new Promise(async(resolve, reject) => {
            // console.log(file);
            try {
                const uploadRef = ref(storage,imageNaming(file?.name));
                // console.log(uploadRef);
                const result = await uploadFile(uploadRef, file, {
                    contentType: 'image/jpeg'
                });
                // console.log(result);
                resolve(result?.metadata);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    };

    // multiple image upload as an array
    const uploadImageArray = (files=[])=> {
        if (!files.length) {
            return;
        }
        const uploadArray = files.map(file=> uploadImage(file));

        return new Promise(async (resolve, reject) => {
            try {
                const resultArray = await Promise.all(uploadArray);
                resolve(resultArray);
            } catch (err) {
                reject(err);
            }
        });
    };

    // single image delete
    const deleteImage = (imgName='')=> {
        if(!imgName){
            return;
        }

        return new Promise(async(resolve, reject) => {
            try {
                const deleteRef = ref(storage, imgName);
                await deleteObject(deleteRef);
                resolve({deleted:true});
            } catch (err) {
                resolve({deleted:false});
            }
        });
    }

    // multiple image delete as an array
    const deleteImageArray = (imgNameArray=[])=> {
        const deleteArray = imgNameArray.map(img=>deleteImage(img));

        return new Promise(async(resolve, reject) => {
            try {
                await Promise.all(deleteArray);
                resolve({arrayDeleted:true});
            } catch (err) {
                reject(err);
            }
        })
    }


    return { uploadImage,deleteImage,uploadImageArray,deleteImageArray };
};

export default useMyStorage;