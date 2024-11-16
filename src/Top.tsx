import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { searchWithImage } from './apis/api'
import { searchWithTags } from './apis/api'
import ImageInput from './components/ImageInput'
import TagInput from './components/TagInput'
import Result from './components/Result'
import { tagCategories } from './utils/constants'
import { PostData, ResponceTagsData } from './types/type'

const Top: React.FC = () => {
  const [inputImage, setInputImage] = useState<File | null>(null) // added image
  const [inputTags, setInputTags] = useState<string[]>([]) // added tags
  const [similarityScores, setSimilarityScores] = useState<string[]>([]) // result score
  const [responceTags, setResponceTags] = useState<ResponceTagsData[]>([])
  const [tagCategory, setTagCategory] = useState<number>(0)
  const [responseTime, setResponseTime] = useState<number>(0)

  // API
  const postImageMutation = useMutation((data: FormData) => searchWithImage(data))
  const postTagsMutation = useMutation((data: PostData) => searchWithTags(data))

  // setting category
  const handleChangeCat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagCategory(Number(event.target.value))
  }

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
    setResponseTime(0)
    setResponceTags([])

    const startTime = Date.now()

    const formData = new FormData();
    formData.append('file', inputImage)
    formData.append('category_idx', String(tagCategory))
    postImageMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        const endTime = Date.now()
        setResponseTime((endTime - startTime) / 1000)
        setSimilarityScores(data.scores)
        setResponceTags(data.tags)
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
    setResponseTime(0)
    setResponceTags([])

    const startTime = Date.now()

    postTagsMutation.mutate({
      tags: inputTags,
      idx: tagCategory,
    }, {
      onSuccess: (data) => {
        const endTime = Date.now()
        setResponseTime((endTime - startTime) / 1000)
        setSimilarityScores(data.scores)
        setResponceTags(data.tags)
      }
    })
  }

  return (
    <div className='px-4 py-4'>
      <div className='max-w-[1100px] m-auto flex flex-col gap-4'>
        {/* <div className='text-center py-5'>
          <h1 className='font-bold text-4xl'>Anime Scene Search Engine</h1>
        </div> */}
        <div className='w-full gap-3 flex flex-col items-center text-center bg-white p-7 rounded-lg'>
          <h2 className='font-bold block text-2xl'>検索するカテゴリーを選択</h2>
          <select value={tagCategory} onChange={handleChangeCat} className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[200px]'>
            {tagCategories.map((category, i) => (
              <option value={i} key={i}>{category}</option>
            ))}
          </select>
        </div>

        <div className='md:grid md:grid-cols-2 pt-6 bg-white rounded-lg p-7'>
          <ImageInput
            inputImage={inputImage}
            setInputImage={setInputImage}
            handleSearchWithImage={handleSearchWithImage}
            isLoading={postImageMutation.isLoading || postTagsMutation.isLoading}
          />
          <TagInput
            inputTags={inputTags}
            setInputTags={setInputTags}
            handleSearchWithTags={handleSearchWithTags}
            isLoading={postImageMutation.isLoading || postTagsMutation.isLoading}
          />
        </div>
        <div>
          <Result
            similarityScores={similarityScores}
            responseTime={responseTime}
            responceTags={responceTags}
            isLoading={postImageMutation.isLoading || postTagsMutation.isLoading}
            isError={postImageMutation.isError || postTagsMutation.isError}
          />
        </div>
      </div>
    </div>
  )
}

export default Top