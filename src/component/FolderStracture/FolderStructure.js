import styles from "./FolderStructure.module.css";
import AddImage from "../AddImage/AddImage"
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseinit";
import { doc, collection, onSnapshot, addDoc, updateDoc, arrayUnion , deleteDoc} from "firebase/firestore"; 
import Images from "../Images/Images";


const FolderStructure = (props) => {
    const [images, setImages] = useState({images: []});
    const [edit, setEdit] = useState(false);
    const [editdata, setEditData] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `/albums/${props.folder.id}/images`), snapShot => {
            const image = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages({ images: image });
        });

        return () => {
            unsubscribe();
        };
    }, [props.folder.id]); 


    const addImage = async (data) => {
        const dataRef = collection(db, `/albums/${props.folder.id}/images`);
        await addDoc(dataRef, {
            title: data.title,
            url: data.url
        });
        // toggleAddValue();
        console.log(data)
    }
    
    const handleDelete = async (id)=>{
        console.log(id)
        await deleteDoc(doc(db, `/albums/${props.folder.id}/images`, id));
    }

    const handleEdit = (data) =>{
        props.setShowAddImageValue(true)
        setEdit(true)
        setEditData(data)
    }
    
    const handleUpdate = async (data) =>{
        const docRef = doc(db, `/albums/${props.folder.id}/images`, data.id);
        await updateDoc(docRef, {
            title: data.title,
            url: data.url
        });
    }

    const handleShowImage = (data) =>{
        console.log(data.url)
        setImageUrl(data.url)
    }
    
    return (
        <>
       
        {showImage? <> <div className={styles.imageContainer}>
            <button className={styles.cut} onClick={()=> {setShowImage(false)}}>X</button>
            <img src={imageUrl} className={styles.showImage}/> 
            </div></>
        : null}
        
        
        <div className={styles.FolderContainer}>
            {props.showAddImageValue ? <AddImage addImage={addImage} edit={edit} 
            editdata={editdata}
            handleUpdate={handleUpdate}
            setEdit={setEdit}
            /> : null}
            
            <div className={styles.albumNav}>
                    <button onClick={()=> props.backBtn()} className={styles.backBtn2}>
                        back
                    </button>
        
                    <button onClick={props.toggleAddImageValue} className={styles.cancelandAdd}>
                        {props.showAddImageValue ? "Cancel" : "Add Image"}
                    </button>
            </div>

            {images.images.length === 0 ? <h3>No Images Found in  {props.folder.name}</h3> : <h3>Images in {props.folder.name}</h3>}
            <div className={styles.imageBody}>
            {images.images.map((image, index) => (
                <div key={index}>
                    <div className={styles.container}>
                    <div onClick={()=>handleDelete(image.id)} className={styles.deleteBtn}><img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png"/></div>
                    <div onClick={()=>handleEdit(image)} className={styles.editBtn}><img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"/></div>
                    <Images image={image} setShowImage={setShowImage} handleShowImage={handleShowImage}/></div>
                    </div>
            ))}
            </div>
            
        </div>
        </>
    );
}

export default FolderStructure;
