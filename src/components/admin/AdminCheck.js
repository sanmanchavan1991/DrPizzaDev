import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AdminPage from './Admin';
import LoginModal from '../auth/LoginModal';

const AdminCheck = () => {
    const [checkIfAdminHasLoggedIn, setCheckIfAdminHasLoggedIn] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:3000/user-admin').then(res => {
            // console.log(res.data)
            // res.data.map(user => {
            //     if(user.isAdmin) {
            //         setCheckIfAdminHasLoggedIn(true);
            //     }
            //     else {
            //         setCheckIfAdminHasLoggedIn(false);
            //     }
            // })
        }).catch(err => console.log(err, "this is related to the admin check user!"))
    })
    return (
        <>
            {
                checkIfAdminHasLoggedIn ? <AdminPage /> : <AdminPage />
            }
        </>
    )
}

export default AdminCheck;