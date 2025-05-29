import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppProvider'

function BestSeller() {
    const { products } = useAppContext();
    console.log(products)
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4
            lg:grid-cols-4 xl:grid-cols-5 mt-6 items-center'>
                {
                    products.filter((product) => product.inStock).slice(0, 5)
                        .map((item, index) => (
                            <ProductCard product={item} key={index} />
                        ))
                }
            </div>
        </div>
    )
}

export default BestSeller