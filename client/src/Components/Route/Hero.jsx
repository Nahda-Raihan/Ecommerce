import React from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`} style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }}>
            <div className={`${styles.section} w-[90%] lg:w-[60%]`}>
                <h1 className={`text-[25px] leading=[1.2] lg:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                    We have the best for <br /> Everthing
                </h1>
                <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                    ornare metus sit amet dictum cursus. Sed dignissim sodales neque,
                    vitae iaculis mi tincidunt ut
                </p>
                <Link to="/products" className='inline-block'>
                    <div className={`${styles.button} mt-5 bg-[#7f8219] hover:bg-[#b8c439]`}>
                        <span className='text-[#fff] font-[Poppins] text-[18px]'>Shop Now</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Hero