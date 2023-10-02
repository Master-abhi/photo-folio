import styles from "./Album.module.css";
import CreateAlbum from "../CreateAlbum/CreateAlbum";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseinit";
import { addDoc, collection, getDocs, onSnapshot ,doc, deleteDoc} from "firebase/firestore"; 
import Albums from "../Albums/Albums";
import FolderStructure from "../FolderStracture/FolderStructure";

const AlbumContainer = () => {
    const [showAddValue, setShowAddValue] = useState(false);
    const [showAddImageValue, setShowAddImageValue] = useState(false);
    const [state, setAlbum] = useState({albums:[]});
    const [activePage, setActivePage] = useState('album');
    const [folderId, setFolderId] = useState('');
    const [folder, setFolder] = useState("");

    const toggleAddValue = () => {
        setShowAddValue(prev => !prev);
    };
    const toggleAddImageValue = () => {
        setShowAddImageValue(prev => !prev);
    };



    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "albums"), snapShot => {
            const album = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbum({ albums: album });
        });
        return () => {
            unsubscribe();
        };
    }, []);
    

    const createAlbum = async (folderName) => {
        const albumRef = collection(db, "albums");
        await addDoc(albumRef, {name: folderName});
        // toggleAddValue();
    }

    const albumClicked = (album) =>{
        console.log("clicked: ", album )
        setActivePage("folder");
        setFolderId(album.id);
        setFolder(album)
    }

    const backBtn = () =>{
        setActivePage("album")
    }

    const handleDelete = async (id)=>{
        console.log(id)
        await deleteDoc(doc(db, 'albums', id));
    }
    

    return (
        <div className={styles.AlbumContainer}>
            {activePage === "album" ? 
            <>
            {showAddValue ? <CreateAlbum albumName={state} setAlbumName={setAlbum}
            createAlbum={createAlbum}/> : null}
            <div className={styles.albumNav}>
                    <div >
                        {showAddValue ? <button onClick={toggleAddValue} className={styles.backBtn1} >Back</button> : null}
                    </div>
                
                <div className={styles.addAlbum}>
                    <button onClick={toggleAddValue} className={styles.addBtn1}>{showAddValue ? "Cancel" : "Add album"}</button>
                </div>
                </div>
            
            <div className={styles.albumShow}>
                <h3>Your Albums</h3>
                <div className={styles.albums}>
           
                    {state.albums.map((album, index) => (
                        <div className={styles.container}>
                        <div onClick={()=>handleDelete(album.id)} className={styles.deleteBtn}>x</div>
                        <Albums key={index} album= {album} albumClicked={albumClicked} />
                        </div>
                    ))}
                    </div>
                

            </div> </> 
            : 
            <FolderStructure 
            showAddImageValue={showAddImageValue}
            setShowAddImageValue={setShowAddImageValue}
            toggleAddImageValue={toggleAddImageValue}
            backBtn={backBtn}
            folder={folder}
            /> 
            }
            
        </div>
    );
}

export default AlbumContainer;
