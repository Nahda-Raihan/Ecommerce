

import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles'
import { AiOutlineMessage } from 'react-icons/ai'

const ProductDetailsCard = ({ setOpen, data }) => {
    console.log(data)
    const handleMessageSubmit = () => {

    }
    return (
        <div className='bg-[#fff]'>
            {data ? (
                <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
                    <div className="w-[100vh] 800px:w-[60%] h-[90vh]
                overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                        <RxCross1
                            size={20}
                            className='absolute right-3 top-3 z-50'
                            onClick={() => setOpen(false)}
                        />
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img
                                    height="300px"
                                    width="300px"
                                    src={`${data.image_Url[0].url}`}
                                    alt=''
                                />
                                <div className="flex">
                                    <Link to={`/shop/preview/${data.shop._id}`}>
                                        <img
                                            src={`${data.shop.shop_avatar.url}`}
                                            alt=""
                                            className='w-[50px] h-[50px] rounded-full mr-2' />
                                        <div>
                                            <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                            <h5 className='pb-3 text-[15px]'>{data.shop.ratings} Ratings</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`} onClick={handleMessageSubmit}>
                                    <span className='text-[#fff] flex items-center'>Send Message <AiOutlineMessage className='ml-1'/></span>
                                </div>
                                <h5 className='text-[16px] text-[red] mt-5'>{data.total_sell} Sold Out</h5>
                            </div>
                            <div className='w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]'>
                                <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>$ {data.discount_price}</h4>
                                    <h3 className={`${styles.price}`}>{data.original_price ? data.original_price + "$" : null}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ProductDetailsCard