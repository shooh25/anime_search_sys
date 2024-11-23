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
  const [inputImage, setInputImage] = useState<File | null>(null) // ユーザーが指定した画像
  const [inputTags, setInputTags] = useState<string[]>([]) // ユーザーが入力したタグが格納された配列
  const [tagCategory, setTagCategory] = useState<number>(0) // 検索する際に使用するカテゴリー

  const [similarityScores, setSimilarityScores] = useState<string[]>([]) // APIから返ってきた類似シーンが格納された配列(5件)
  const [responceTags, setResponceTags] = useState<ResponceTagsData[]>([]) // APIから返ってきたカテゴリーごとに分析されたタグ
  const [responseTime, setResponseTime] = useState<number>(0) // 検索に掛かった時間

  // API
  const postImageMutation = useMutation((data: FormData) => searchWithImage(data))
  const postTagsMutation = useMutation((data: PostData) => searchWithTags(data))

  // 検索する際に使用するカテゴリーを指定
  const handleChangeCat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagCategory(Number(event.target.value))
  }

  // 画像検索を行う処理
  const handleSearchWithImage = () => {
    if (!inputImage) {
      alert('ファイルが選択されていません')
      return
    }

    if (tagCategory > tagCategories.length) {
      alert('カテゴリー入力時にエラーが発生しました')
      return
    }

    // 類似度・検索時間・分析されたタグの値をそれぞれ初期化
    setSimilarityScores([])
    setResponseTime(0)
    setResponceTags([])

    // 検索の開始時間を記録
    const startTime = Date.now()

    // APIに入力データ(カテゴリーと画像)を送信
    const formData = new FormData();
    formData.append('file', inputImage)
    formData.append('category_idx', String(tagCategory))
    postImageMutation.mutate(formData, {

      // データが返ってきた場合の処理
      onSuccess: (data) => {
        console.log(data)
        const endTime = Date.now()
        setResponseTime((endTime - startTime) / 1000) // 検索にかかった時間を記録
        setSimilarityScores(data.scores)
        setResponceTags(data.tags)
      }
    })
  }

  // タグ検索を行う処理
  const handleSearchWithTags = (givenTags?: string[]) => {

    // 引数でタグが与えられている場合はそれを用いて検索を行う
    const tags = givenTags && givenTags.length ? givenTags : inputTags;

    // タグが未入力の場合はアラート
    if (!tags.length) {
      alert('タグが空です')
      return
    }

    // 類似度・検索時間・分析されたタグの値をそれぞれ初期化
    setSimilarityScores([])
    setResponseTime(0)
    setResponceTags([])

    // 検索の開始時間を記録
    const startTime = Date.now()

    // APIに入力データ(カテゴリーとタグ)を送信
    postTagsMutation.mutate({
      tags: tags,
      idx: tagCategory,
    }, {

      // データが返ってきた場合の処理
      onSuccess: (data) => {
        const endTime = Date.now()
        setResponseTime((endTime - startTime) / 1000) // 検索にかかった時間を記録
        setSimilarityScores(data.scores)
        setResponceTags(data.tags)
      }
    })
  }
  return (
    <div className='px-4 py-4'>
      <div className='max-w-[1100px] m-auto flex flex-col gap-4'>
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
            inputTags={inputTags}
            handleSearchWithTags={handleSearchWithTags}
            setInputTags={setInputTags}
            isLoading={postImageMutation.isLoading || postTagsMutation.isLoading}
            isError={postImageMutation.isError || postTagsMutation.isError}
          />
        </div>
      </div>
    </div>
  )
}

export default Top