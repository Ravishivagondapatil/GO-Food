import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/auth/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])
    const formatDate = (dateString) => {
        const options = { weekday: 'long',  month: 'short', day: 'numeric' ,year: 'numeric',};
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };
    return (
        <div>
            <div>
                <Navbar />
            </div>

           

            <div className="container">
                <div className="row">
                    {orderData != {} ? (
                        Array(orderData).map((data) => {
                            return data.orderData
                                ? data.orderData.order_data
                                    .slice(0)
                                    .reverse()
                                    .map((item) => {
                                        return item.map((arrayData) => {
                                            return (
                                                <>
                                                    {arrayData.Order_date ? (
                                                        <div className="col-12">
                                                            <div
                                                                className="m-auto mt-5 text-center"
                                                               
                                                            >
                                                               {formatDate(arrayData.Order_date)}
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                                                            <div
                                                                className="card"
                                                                style={{
                                                                    width: "100%",
                                                                    maxHeight: "360px"
                                                        
                                                                }}
                                                            >
                                                                <img
                                                                    src={arrayData.img}
                                                                    className="card-img-top"
                                                                    alt="..."
                                                                    style={{
                                                                        height: "120px",
                                                                        objectFit: "fill",
                                                                    }}
                                                                />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="container w-100 p-0">
                                                                        <div className="d-flex flex-column">
                                                                            <span className="m-1">
                                                                                Quantity: {arrayData.qty}
                                                                            </span>
                                                                            <span className="m-1">
                                                                                Type: {arrayData.size}
                                                                            </span>
                                                                            <span className="m-1">
                                                                                Total Price: ₹{arrayData.price}/-
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        });
                                    })
                                : "";
                        })
                    ) : (
                        ""
                    )}
                </div>
            </div>


            <Footer />
        </div>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}