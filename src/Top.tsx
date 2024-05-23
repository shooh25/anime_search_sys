import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { getSample } from './apis/api'
import { searchWithImage } from './apis/api'
import ImageInput from './components/ImageInput'
import TagInput from './components/TagInput'
import Result from './components/Result'

const Top: React.FC = () => {
  const [inputImage, setInputImage] = useState<File | null>(null) // added image
  const [inputTags, setInputTags] = useState<string[]>([]) // added tags
  const [outputTags, setOutputTags] = useState<string[]>([]) // result

  const postImageMutation = useMutation((data: FormData) => searchWithImage(data))

  // search with image
  const handleSearchWithImage = () => {
    if (!inputImage) {
      alert('ファイルが選択されていません')
      return
    }

    const formData = new FormData();
    formData.append('file', inputImage)
    postImageMutation.mutate(formData, {
      onSuccess: (data) => {
        setOutputTags(data)
      }
    })
  }

  return (
    <div className='px-4'>
      <div className='max-w-[900px] m-auto'>
        <div className='text-center py-5'>
          <h1 className='font-bold text-3xl'>Anime Scene Search System</h1>
        </div>

        <div className='md:grid md:grid-cols-2'>
          <ImageInput
            inputImage={inputImage}
            setInputImage={setInputImage}
            handleSearchWithImage={handleSearchWithImage}
          />
          <TagInput
            inputTags={inputTags}
            setInputTags={setInputTags}
          />
        </div>
        <div>
          <Result
            outputTags={outputTags}
            isLoading={postImageMutation.isLoading}
            isError={postImageMutation.isError}
          />
        </div>
      </div>
    </div>
  )
}

export default Top