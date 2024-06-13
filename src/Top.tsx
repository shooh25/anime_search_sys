import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { searchWithImage } from './apis/api'
import { searchWithTags } from './apis/api'
import ImageInput from './components/ImageInput'
import TagInput from './components/TagInput'
import Result from './components/Result'

const Top: React.FC = () => {
  const [inputImage, setInputImage] = useState<File | null>(null) // added image
  const [inputTags, setInputTags] = useState<string[]>([]) // added tags
  const [similarityScores, setSimilarityScores] = useState<string[]>([]) // result

  const postImageMutation = useMutation((data: FormData) => searchWithImage(data))
  const postTagsMutation = useMutation((tags: string[]) => searchWithTags(tags))

  // search with image
  const handleSearchWithImage = () => {
    if (!inputImage) {
      alert('ファイルが選択されていません')
      return
    }

    // initialize result
    setSimilarityScores([])

    const formData = new FormData();
    formData.append('file', inputImage)
    postImageMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        setSimilarityScores(data)
      }
    })
  }

  // search with tags
  const handleSearchWithTags = () => {
    if (!inputTags.length) {
      alert("タグが選択されていません")
      return
    }

    // initialize result
    setSimilarityScores([])

    postTagsMutation.mutate(inputTags, {
      onSuccess: (data) => {
        setSimilarityScores(data)
      }
    })
  }

  return (
    <div className='px-4'>
      <div className='max-w-[900px] m-auto'>
        <div className='text-center py-5'>
          <h1 className='font-bold text-3xl'>Anime Scene Search System</h1>
        </div>

        <div className='md:grid md:grid-cols-2 gap-6'>
          <ImageInput
            inputImage={inputImage}
            setInputImage={setInputImage}
            handleSearchWithImage={handleSearchWithImage}
          />
          <TagInput
            inputTags={inputTags}
            setInputTags={setInputTags}
            handleSearchWithTags={handleSearchWithTags}
          />
        </div>
        <div className='pt-6'>
          <Result
            similarityScores={similarityScores}
            isLoading={postImageMutation.isLoading}
            isError={postImageMutation.isError}
          />
        </div>
      </div>
    </div>
  )
}

export default Top