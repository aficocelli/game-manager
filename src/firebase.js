// import Firebase from 'firebase'


// const app = Firebase.initializeApp({

//     apiKey: "AIzaSyAxc_NvskZr-891YlDT0OEOZTfaltDKOQ8",
//     authDomain: "games-db-e3d09.firebaseapp.com",
//     databaseURL: "https://games-db-e3d09-default-rtdb.firebaseio.com",
//     projectId: "games-db-e3d09",
//     storageBucket: "games-db-e3d09.appspot.com",
//     messagingSenderId: "526183554071",
//     appId: "1:526183554071:web:89fad56cfefb45678a9052",
//     measurementId: "G-Q7E9YBFFBB"


// })

// export const db = app.database()
// export const gamesRef = db.ref('Games')

import firebase from 'firebase/app'
import 'firebase/database'

export const app = firebase
    .initializeApp({ 
        apiKey: "AIzaSyAxc_NvskZr-891YlDT0OEOZTfaltDKOQ8",
        authDomain: "games-db-e3d09.firebaseapp.com",
        databaseURL: "https://games-db-e3d09-default-rtdb.firebaseio.com",
        projectId: "games-db-e3d09",
        storageBucket: "games-db-e3d09.appspot.com",
        messagingSenderId: "526183554071",
        appId: "1:526183554071:web:89fad56cfefb45678a9052",
        measurementId: "G-Q7E9YBFFBB"
    })
    .database()


export const gamesRef = app.ref('Games')