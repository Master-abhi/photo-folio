import React from "react"
import styles from "./Images.module.css"

const  Images = (props) =>{
    const toggleShowImage = ()=>{
        props.setShowImage(true)
        props.handleShowImage(props.image)
    }

    return(
        <>
            <div className={styles.imageContainer} onClick={toggleShowImage} >
                <div className={styles.logo}>
                    <img src={props.image.url}/>
                </div>
                <div className={styles.imageName}>
                    <h4>{props.image.title}</h4>
                </div>
            </div>
        </>
    )

}

export default Images;