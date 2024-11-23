import React, { ChangeEventHandler, useState } from 'react'
import { taggingList } from '../utils/constants'


type Props = {
  inputTags: string[];
  setInputTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearchWithTags: () => void;
  isLoading: boolean;
}

const TagInput: React.FC<Props> = ({ inputTags, setInputTags, handleSearchWithTags, isLoading }) => {
  const [inputText, setInputText] = useState<string>("") // ユーザーが入力した文字列を格納
  const [suggestedTags, setsuggestedTags] = useState<string[]>(['']) // 入力した文字によってサジェストされたタグの配列を格納

  // 入力した文字に合わせてサジェストするタグを変更する処理
  const handleChangeText: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const text = target.value

    // 2文字以上入力された場合にタグをサジェスト
    if (text.length > 1) {
      setsuggestedTags(
        taggingList.filter((tag) => {
          return tag.match(new RegExp(`${text}`, "gi"));
        })
      )
    } else {
      setsuggestedTags([''])
    }
    setInputText(text)
  }

  // タグを追加
  const addTag = (tag: string) => {
    if (!tag || inputTags.includes(tag)) {
      alert("選択されたタグは既に追加済みです")
      return
    }
    setInputTags([...inputTags, tag])
  }

  // 追加済のタグを削除
  const removeTag = (index: number) => {
    setInputTags(
      inputTags.filter(tag =>
        inputTags.indexOf(tag) !== index
      )
    )
  }

  return (
    <div className='w-full pl-6'>
      <h2 className='font-bold text-2xl'>タグ検索</h2>
      <ul className="w-full flex flex-wrap gap-[6px] my-3">
        {inputTags.map((tag, i) => (
          <li key={i} className='flex gap-4 px-2 py-[1px] bg-blue-100 rounded-md text-blue-600'>
            <p>{tag}</p>
            <button onClick={() => removeTag(i)}>×</button>
          </li>
        ))}
      </ul>
      <div className='w-full'>
        <input
          type="text"
          value={inputText}
          onChange={handleChangeText}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full'
          placeholder='検索したいタグを入力してください (blue_hair, battle, など)'
        />
        <ul className='w-full h-[250px] overflow-y-scroll p-2.5 bg-white shadow-md rounded-md'>
          {suggestedTags.map((tag, i) => (
            <li
              key={i}
              className='cursor-pointer hover:bg-blue-400 py-1'
              onClick={() => { addTag(tag) }}
            >
              <p className='ml-1'>{tag}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <button
          className='text-white bg-blue-600 px-10 py-3 font-bold rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed'
          disabled={!inputTags.length || isLoading}
          onClick={handleSearchWithTags}
        >
          タグ検索を実行
        </button>
      </div>
    </div>
  )
}

export default TagInput