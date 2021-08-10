import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAJckmGSHZYeOxtqA7jzXpaDBoUR1p14vQ",
    authDomain: "drpizzeria-fb251.firebaseapp.com",
    databaseURL: "https://drpizzeria-fb251-default-rtdb.firebaseio.com",
    projectId: "drpizzeria-fb251",
    storageBucket: "drpizzeria-fb251.appspot.com",
    messagingSenderId: "869445374385",
    appId: "1:869445374385:web:529c4fc4e66b8faa522d90",
    measurementId: "G-ZMRM4G4VTN"
};
//dev
// const firebaseConfig = {
//     apiKey: "AIzaSyARLmgeSM3_7TRGAaeAXUAdecBlPf8BNZc",
//     authDomain: "drpizzeria-dev.firebaseapp.com",
//     projectId: "drpizzeria-dev",
//     storageBucket: "drpizzeria-dev.appspot.com",
//     messagingSenderId: "739600836782",
//     appId: "1:739600836782:web:a2520e4c5208a719a0253f"
// };
//PROD
// const firebaseConfig = {
//     apiKey: "AIzaSyAJckmGSHZYeOxtqA7jzXpaDBoUR1p14vQ",
//     authDomain: "drpizzeria-fb251.firebaseapp.com",
//     databaseURL: "https://drpizzeria-fb251-default-rtdb.firebaseio.com",
//     projectId: "drpizzeria-fb251",
//     storageBucket: "drpizzeria-fb251.appspot.com",
//     messagingSenderId: "869445374385",
//     appId: "1:869445374385:web:529c4fc4e66b8faa522d90",
//     measurementId: "G-ZMRM4G4VTN"
// };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
firebase.analytics();


export const createGroceryList = (userName, userId) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};
export const getDesignData = companyId => {
    const data= db.collection('designData').where("resturantId", "in", ["zAwmKFdIgqxwy4vfT6GL"]).get();
    return data
};

export const getMenuData = companyId => {
    const data= db.collection('menus').orderBy("id").get();
    return data
};




//add temp data//
// export const addTempData = (obj) => {
//     db.collection('menus').add({
//         id:obj.id
//         ,title:obj.title
//         ,description:obj.description
//         ,price:obj.price
//         ,discount:obj.discount
//         ,size:obj.size
//         ,images:obj.images
//     })
// }
// products.items.forEach(obj => {
//     FirestoreService.addTempData(obj)
//     console.log('obj==>',obj)
// }).then(function(dofRef){
//     console.log('done finally!!!',dofRef)

// }).catch(function(err){
//     console.log('Some Error!!!',err)

// })