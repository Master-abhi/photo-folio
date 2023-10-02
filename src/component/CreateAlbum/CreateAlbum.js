
import { useState, useRef } from "react"
import styles from "./CreateAlbum.module.css"


const  CreateAlbum = (props) =>{
    
    const albumRef = useRef("")
    
    const clearField = () => {
        albumRef.current.value = ""
    }

    const callCreateAlbum = ()=>{
        props.createAlbum(albumRef.current.value);
        clearField();
    }



    return(
        <>
        <div className={styles.createContainer}>
            <div className={styles.createAlbum}>
                <div className={styles.title}>
                    <h3>Create an Album</h3>
                </div>
                <div className={styles.form}>
                    <input type="text" placeholder="Album Name" ref={albumRef}/>
                    <div className={styles.btns}>
                    <button onClick={clearField} className={styles.clear}>Clear</button>
                    <button onClick={callCreateAlbum} className={styles.create}>Create</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default CreateAlbum;