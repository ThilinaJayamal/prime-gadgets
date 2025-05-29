import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';

function AllProduct() {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery?.length > 0) {
            setFilteredProducts(products.filter(
                (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }
        else {
            setFilteredProducts(products)
        }
    }, [products, searchQuery])
    return (
        <div className='mt-16 flex flex-col min-h-screen'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl uppercase font-medium'>All products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3
            md:gap-6 lg:grid-cols-5 mt-6'>
                {
                    (filteredProducts.length) > 0 ?
                        filteredProducts.filter((product) => product.inStock)
                            .map((item, index) => <ProductCard key={index} product={item} />)
                        :
                        (
                            <p>Product Not Found.</p>
                        )
                }
            </div>
        </div>
    )
}

export default AllProduct