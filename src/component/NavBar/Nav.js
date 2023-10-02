import React from "react"
import styles from "./Nav.module.css"

const  Nav = () =>{

    return(
        <>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <img src="https://cdn-icons-png.flaticon.com/128/148/148813.png"/>
                    <h3>PhotoFolio</h3>
                </div>
            </div>
        </>
    )

}

export default Nav;