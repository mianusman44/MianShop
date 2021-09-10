import React, { Fragment } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const Carosal = () => {


    const { loading, products, error } = useSelector((state) => state.products);


    return (
        <Fragment>



         
            <Carousel pause='hover' className='bg-dark' className='mt-2' style={{ height: '600px', width: '100%' }}>
                {products && products.map((product) => (
                    <Carousel.Item key={product._id} style={{ height: '600px', width: '100%' }}>

                        <Link to={`/product/${product._id}`}>
                            <Carousel.Caption className='carousel-caption' style={{ marginBottom: '100px' }}>
                                <h2 >
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                            <Image className="d-block w-100 " src={product.images[0].url} alt={product.name} />

                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

        




        </Fragment>
    )
}

export default Carosal
