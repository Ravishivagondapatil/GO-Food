import React from 'react';

export default function Carousal() {
    return (
        <div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
                    <div className="carousel-inner" id='carousel'>

                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZ9aSVvk5Z14DcMvRJ-giWbARzsJh8t1Qwg&s" className="d-block w-100" style={{ filter: "brightness(30%)" ,objectFit: "contain" }} alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg" className="d-block w-100" style={{ filter: "brightness(30%)",objectFit: "contain"  }} alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://static.vecteezy.com/system/resources/previews/015/933/115/non_2x/chole-bhature-is-a-north-indian-food-dish-a-combination-of-chana-masala-and-bhatura-or-puri-free-photo.jpg" className="d-block w-100" style={{ filter: "brightness(30%)",objectFit: "contain"  }} alt="Slide 3" />
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
        </div>
    );
}
