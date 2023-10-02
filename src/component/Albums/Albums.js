import React from "react"
import styles from "./Albums.module.css"

const  Albums = (props) =>{

    return(
        <>
            <div className={styles.albumContainer} onClick={()=> props.albumClicked(props.album)}>
                <div className={styles.logo}>
                    <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png"/>
                </div>
                <div className={styles.albumName}>
                    <h4>{props.album.name}</h4>
                </div>
            </div>
        </>
    )

}

export default Albums;