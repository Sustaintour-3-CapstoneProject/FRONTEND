import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import NearByDestinations from '../components/HomePage/NearBy'

export default function HomePage() {
  return (
      <div className='container'>
          
          <HeroSection />
          <NearByDestinations />
    </div>
  )
}
