import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className=' text-center'>
      <p className='text-2xl font-medium text-gray-800'>Find our Location!</p>
      <p className='text-gray-400 mt-3'>
      ITC Cempaka Mas Lantai 1 Blok F, Jl. Letjen Suprapto No.305 Kav.1,Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10640
      </p>
      <p>.</p>
      <a href="https://maps.app.goo.gl/ebGMEGSf91YYzYLLA" target="_blank" rel="noopener noreferrer" className="bg-black text-white text-xs px-10 py-4">
        Google Maps
      </a>
    </div>
  )
}

export default NewsletterBox
