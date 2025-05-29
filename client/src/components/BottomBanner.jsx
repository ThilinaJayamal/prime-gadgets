import React from 'react'
import { assets, features } from '../assets/assets'

function BottomBanner() {
    return (
        <div className='relative mt-24'>
            <img src={assets.bottom_banner_image} alt="" className='hidden w-full md:block' />
            <img src={assets.bottom_banner_image_sm} alt="" className='w-full md:hidden' />

            <div className='absolute inset-0 flex flex-col items-center 
          md:items-end md:justify-center pt-16 md:pt-0 md:mr-24'>
                <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>Why We Are the Best?</h1>
                {
                    features.map((feature, index) => (
                       <div className='flex items-center gap-2 mt-2' key={index}>
                            <img src={feature.icon} alt='' className='w-9 md:w-11 border-2 bg-white border-primary rounded-lg p-1' />
                            <div className='w-64'>
                                <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
                                <p className='text-gray-500/90 text-xs md:text-sm'>{feature.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BottomBanner