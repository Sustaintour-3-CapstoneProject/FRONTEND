import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import NearByDestinations from '../components/HomePage/NearBy'
import RuteSection from '../components/HomePage/RuteSection'

export default function HomePage() {
  return (
      <div className='container'>
          
          <HeroSection />
          <NearByDestinations />
          <RuteSection />
    </div>
  )
}
