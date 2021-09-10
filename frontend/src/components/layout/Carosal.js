import React, { Fragment } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const Carosal = () => {


    const { loading, products, error } = useSelector((state) => state.products);


    return (
        <Fragment>



            <Carousel pause='hover' className='bg-dark' className='mt-2'>
                {products && products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image className="d-block w-100" src={product.images[0].url} alt={product.name} />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* 
            <div className={`carousel-item ${active}`}>
                <img src={product.images[0].url} alt="Los Angeles" width="100%" height="500" />
                <div className="carousel-caption">
                    <h3>Los Angeles</h3>
                    <p>We had such a great time in LA!</p>
                </div>

            </div> */}
            {/* <div className="carousel-item">
                            <img src="images/b.jpg" alt="Chicago" width="100%" height="500" />
                            <div className="carousel-caption">
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="images/a.jpg" alt="New York" width="100%" height="500" />
                            <div className="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div> */}




        </Fragment>
    )
}

export default Carosal
