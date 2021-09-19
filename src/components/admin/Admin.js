import React, {useState} from 'react';
import axios from 'axios';
import ConfirmMsg from './ConfirmMsg';
import {BrowserRouter as Router,Switch,Route,useLocation} from 'react-router-dom';
import Inventory from './Inventory';

const AdminPage = () => {
    const [foodName, setFoodName] = useState();
    const [foodDesc, setFoodDesc] = useState();
    const [foodPrice, setFoodPrice] = useState();
    const [foodSize, setFoodSize] = useState();
    const [foodType, setFoodType] = useState();
    const [foodImage, setFoodImage] = useState();
    const [checkIfDataIsSaved, setCheckIfDataIsSaved] = useState();

    const handleClick = () => {
        const foodFormData = new FormData();
        foodFormData.append('foodName', foodName);
        foodFormData.append('foodDesc', foodDesc);
        foodFormData.append('foodPrice', foodPrice);
        foodFormData.append('foodSize', foodSize);
        foodFormData.append('foodType', foodType);
        foodFormData.append('image', foodImage)

        axios.post('http://localhost:3000/menu', foodFormData, {
            headers: {
              'Content-Type': 'applicatiom/json',
            },
          }).then((res) => {
              console.log(res)
            if (res.status === 200) {
                setCheckIfDataIsSaved(true);
            }
          }).catch((err) => {
              setCheckIfDataIsSaved(false);
              console.log("Not able to save data - [foodFormDate]: ", err)
            });
    }
    return (
        <div className="container" style={{padding: "50px"}}>
            <Router>
                <Route path="Inventory" component={Inventory}/>
            </Router>
            <div className="row">
                <div className="col"></div>
                <div className="col" >
                    {
                        checkIfDataIsSaved ? <ConfirmMsg checkBool={true} /> : checkIfDataIsSaved === false ? <ConfirmMsg checkBool={false} /> : ""
                    }               
                    <form id="food-form">
                    <label htmlFor="exampleInputEmail1">Enter Food Name</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Food Name" onChange={(e) => setFoodName(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Description</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail2" placeholder="Food Description" onChange={(e) => setFoodDesc(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Price</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail3" placeholder="Food Price" onChange={(e) => setFoodPrice(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Size</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail4" placeholder="Food Description" onChange={(e) => setFoodSize(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Type</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail5" placeholder="Food Type" onChange={(e) => setFoodType(e.target.value)} />

                    <label htmlFor="image">Add Food Image</label>
                    <input type="file" style={{marginBottom: "20px"}} className="form-control-file form-control-lg" id="image" encType="multipart/form-data" name="image" onChange={(e) => setFoodImage(e.target.files[0])} />

                    <button type="button" className="btn btn-light btn-lg btn-block" onClick={handleClick}>Submit</button>
                    </form>
                </div>             
                <div className="col"></div>
            </div>
        </div>
    )
};

export default AdminPage;