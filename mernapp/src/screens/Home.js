import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Image from '../components/Images/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg'
export default function () {

    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')
    const loadFoodItems = async () => {
        let response = await fetch("http://localhost:5000/api/auth/foodData", {
            //credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        // console.log(response[1][0].CategoryName)
        setFoodItems(response[0])
        setFoodCat(response[1])
    }

    useEffect(() => {
        loadFoodItems()
    }, [])

    return (
        <>
            <div><Navbar /></div>

            <div >
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>

                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg" className="d-block w-100" style={{
                                filter: "brightness(70%)",
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }} alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg" className="d-block w-100" style={{ filter: "brightness(70%)", objectFit: "contain" }} alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://static.vecteezy.com/system/resources/previews/015/933/115/non_2x/chole-bhature-is-a-north-indian-food-dish-a-combination-of-chana-masala-and-bhatura-or-puri-free-photo.jpg" className="d-block w-100" style={{ filter: "brightness(70%)", objectFit: "contain" }} alt="Slide 3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
                    </button>
                     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> 
                </div>

            </div>


     <div className='container ' >
                {
                    foodCat != []
                        ? foodCat.map((data) => {
                            return (
                                // justify-content-center
                                <div className='row mb-3'>
                                    <div key={data.id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                                    {foodItems != [] ? foodItems.filter(
                                        (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                                    {console.log(filterItems.url)}
                                                    <Card foodItem={filterItems}
                                                        //  item={filterItems}
                                                        options={filterItems.options[0]}
                                                        ImgSrc={filterItems.img}
                                                    ></Card>
                                                </div>
                                            )
                                        }) : <div> No Such Data </div>}
                                </div>
                            )
                        })
                        : ""}  
            </div>



            <div > <Footer /></div>
        </>
    )
}

