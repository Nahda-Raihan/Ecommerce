import React from 'react'
import Header from '../Components/Layout/Header.jsx'
import Hero from '../Components/Route/Hero.jsx'
import Categories from '../Components/Route/Categories.jsx'
import BestDeals from '../Components/Route/BestDeals/BestDeals.jsx'
const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
    </div>
  )
}

export default HomePage