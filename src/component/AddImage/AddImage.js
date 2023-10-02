
import { useState, useRef, useEffect } from "react"
import styles from "./AddImage.module.css"


const  CreateAlbum = (props) =>{

    // const [data, setData] = useState({});
    
    const TitleRef = useRef();
    const UrlRef = useRef();
    
    const clearField = () => {
        TitleRef.current.value = "";
        UrlRef.current.value = "";
        if(props.edit){
            props.setEdit(false)
        }
    }

    useEffect(()=>{
        if(props.edit){
            TitleRef.current.value = props.editdata.title;
            UrlRef.current.value = props.editdata.url;
        }
    },[props.edit])

    const callAddImage= ()=>{

        if(!props.edit){props.addImage({
            title: TitleRef.current.value,
            url: UrlRef.current.value
        });}else{
            props.handleUpdate({
                title: TitleRef.current.value,
                url: UrlRef.current.value ,
                id: props.editdata.id
            })
        }
        // console.log(data)
        props.setEdit(false)
        clearField();
    }



    return(
        <>
        <div className={styles.addImageContainer}>
        <div className={styles.title}>
            <h3>Add an Image</h3>
        </div>
        <div className={styles.inputAndBtnContainer}>
            <div className={styles.inputContainer}>
                <input type="text" ref={TitleRef} placeholder="Title" required/>
                <input type="text" ref={UrlRef} placeholder="Image URL" required/>
            </div>
            <div className={styles.btnsContainer}>
                <button onClick={callAddImage} className={styles.addImage}>{props.edit? "Edit Image" :"Add Image"}</button>
                <button onClick={clearField} className={styles.clear}>Clear</button>
            </div>
        </div>
        </div>
        </>
    )

}

export default CreateAlbum;