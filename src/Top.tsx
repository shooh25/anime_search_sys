import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { searchWithImage } from './apis/api'
import { searchWithTags } from './apis/api'
import ImageInput from './components/ImageInput'
import TagInput from './components/TagInput'
import Result from './components/Result'
import { tagCategories } from './utils/constants'

const Top: React.FC = () => {
  const [inputImage, setInputImage] = useState<File | null>(null) // added image
  const [inputTags, setInputTags] = useState<string[]>([]) // added tags
  const [similarityScores, setSimilarityScores] = useState<string[]>([]) // result
  const [tagCategory ,setTagCategory] = useState<number>(0) 
  const [videos, setVideos] = useState<string[]>(["../../assets/sample01.mp4", "../../assets/sample02.mp4", "../../assets/sample03.mp4"]) // result scene videos

  // API
  const postImageMutation = useMutation((data: FormData) => searchWithImage(data))
  const postTagsMutation = useMutation((tags: string[]) => searchWithTags(tags))

  // search with image
  const handleSearchWithImage = () => {
    if (!inputImage) {
      alert('ファイルが選択されていません')
      return
    }

    if (tagCategory > tagCategories.length) {
      alert('カテゴリー入力時にエラーが発生しました')
      return
    }

    // initialize result
    setSimilarityScores([])
    setTagCategory(0)

    const formData = new FormData();
    formData.append('file', inputImage)
    formData.append('category_idx', String(tagCategory))
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
    <div className='px-4 pb-[60px]'>
      <div className='max-w-[1000px] m-auto'>
        <div className='text-center py-5'>
          <h1 className='font-bold text-3xl'>Anime Scene Search System</h1>
        </div>

        <div className='md:grid md:grid-cols-2 gap-6'>
          <ImageInput
            inputImage={inputImage}
            tagCategory={tagCategory}
            setTagCategory={setTagCategory}
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
            videos={videos}
          />
        </div>
      </div>
    </div>
  )
}

export default Top