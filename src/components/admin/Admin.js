import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ConfirmMsg from './ConfirmMsg';
import { getMenuDetails} from '../../actions/MenuAction';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';

const AdminPage = ({getMenuDetails,menu}) => {
    const [foodName, setFoodName] = useState();
    const [foodDesc, setFoodDesc] = useState();
    const [foodPrice, setFoodPrice] = useState();
    const [foodSize, setFoodSize] = useState();
    const [foodType, setFoodType] = useState();
    const [foodImage, setFoodImage] = useState();
    const [stockQuantity, setStockQuantity] = useState();
    const [checkIfDataIsSaved, setCheckIfDataIsSaved] = useState(); 
    const location = useLocation();
    const getProductDetails = () => {
        if (location.state && location.state !== undefined) {
            getMenuDetails(location.state.pid);
            setFoodName(menu.foodName)
            setFoodDesc(menu.foodDesc)
            setFoodPrice(menu.foodPrice)
            setFoodSize(menu.foodSize)
            setFoodType(menu.foodType)
            setFoodImage(menu.foodImage)
            setStockQuantity(menu.countInStock)
        }
        else {
            console.log("No PID.");
        }
    };
    useEffect(() => {
        getProductDetails();
    }, [getMenuDetails, menu, location])
    const handleClick = () => {
        const foodFormData = new FormData();
        foodFormData.append('foodName', foodName);
        foodFormData.append('foodDesc', foodDesc);
        foodFormData.append('foodPrice', foodPrice);
        foodFormData.append('foodSize', foodSize);
        foodFormData.append('foodType', foodType);
        foodFormData.append('image', foodImage);
        foodFormData.append('stockQuantity', stockQuantity);
        axios.post('http://localhost:3000/menu', foodFormData, {
            headers: {
              'Content-Type': 'applicatiom/json',
            },
          }).then((res) => {
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
            <div className="row">
                <div className="col"></div>
                <div className="col" >
                    {
                        checkIfDataIsSaved ? <ConfirmMsg checkBool={true} /> : checkIfDataIsSaved === false ? <ConfirmMsg checkBool={false} /> : ""
                    }               
                    <form id="food-form">
                    <label htmlFor="exampleInputEmail1">Enter Food Name</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Description</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail2" placeholder="Food Description" value={foodDesc} onChange={(e) => setFoodDesc(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Price</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail3" placeholder="Food Price" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Size</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail4" placeholder="Food Size" value={foodSize} onChange={(e) => setFoodSize(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Food Type</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail5" placeholder="Food Type" value={foodType}  onChange={(e) => setFoodType(e.target.value)} />

                    <label htmlFor="exampleInputEmail1">Enter Stock Quantity</label>
                    <input type="text" style={{marginBottom: "20px"}} className="form-control form-control-lg" id="exampleInputEmail6" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />

                    <label htmlFor="image">Add Food Image</label>
                    <input type="file" style={{marginBottom: "20px"}} className="form-control-file form-control-lg" id="image" encType="multipart/form-data" name="image"  onChange={(e) => setFoodImage(e.target.files[0])} />

                    <button type="button" className="btn btn-light btn-lg btn-block" onClick={handleClick}>Submit</button>
                    </form>
                </div>             
                <div className="col"></div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    menu: state.menuDetail.menu,
    isLoading: state.menuDetail.isLoading,
    error: state.menuDetail.error
});

export default connect(mapStateToProps, { getMenuDetails })(AdminPage);