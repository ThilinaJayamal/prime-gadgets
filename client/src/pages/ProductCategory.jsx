import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppProvider';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

function ProductCategory() {
    const {category} = useParams();
    const {products} = useAppContext();

    const searchCategory = categories.find((item=>item.path.toLowerCase() === category));

    const filteredProducts = products.filter(item=>item.category === searchCategory.path);

    return (
        <div className='mt-16 flex flex-col min-h-screen'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl uppercase font-medium'>{searchCategory.text}</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3
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

export default ProductCategory