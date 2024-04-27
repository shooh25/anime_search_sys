import React from 'react'
import { useQuery } from 'react-query'
import { getSample } from './apis/api'
import ImageInput from './ImageInput'
import TagInput from './TagInput'

const Top: React.FC = () => {
  // const { data, isLoading } = useQuery("sample", getSample)
  // console.log(data)

  return (
    <div className='px-4'>
      <div className='max-w-[900px] m-auto'>
        <div className='text-center py-5'>
          <h1 className='font-bold text-3xl'>Anime Scene Search System</h1>
        </div>

        <div className='md:grid md:grid-cols-2'>
          <ImageInput />
          <TagInput />
        </div>
      </div>
    </div>
  )
}

export default Top