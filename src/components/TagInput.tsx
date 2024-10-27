import React, { ChangeEventHandler, useState } from 'react'
import { taggingList } from '../utils/constants'


type Props = {
  inputTags: string[];
  setInputTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearchWithTags: () => void
}

const TagInput: React.FC<Props> = ({ inputTags, setInputTags, handleSearchWithTags }) => {
  const [inputText, setInputText] = useState<string>("") // text in the input box
  const [suggestedTags, setsuggestedTags] = useState<string[]>(['']) // suggested tags while typing texts

  const handleChangeText: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const text = target.value
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

  const addTag = (tag: string) => {
    if (!tag || inputTags.includes(tag)) {
      return
    }
    setInputTags([...inputTags, tag]) // add clicked tag
  }

  const removeTag = (index: number) => {
    setInputTags(
      inputTags.filter(tag =>
        inputTags.indexOf(tag) !== index
      )
    )
  }

  return (
    <div className='w-full'>
      <h2 className='font-bold text-xl'>タグ検索</h2>
      <ul className="w-full flex flex-wrap gap-2">
        {inputTags.map((tag, i) => (
          <li key={i} className='flex gap-4 px-2 py-1 border border-gray-700 rounded-md'>
            <p>{tag}</p>
            <button onClick={() => removeTag(i)}>×</button>
          </li>
        ))}
      </ul>
      <div className='w-full mt-4'>
        <input
          type="text"
          value={inputText}
          onChange={handleChangeText}
          className='border-black border w-full'
          placeholder='検索したいタグを入力してください (blue_hair, battle, など)'
        />
        <ul className='border border-black w-full h-[200px] overflow-y-scroll'>
          {suggestedTags.map((tag, i) => (
            <li
              key={i}
              className='cursor-pointer hover:bg-blue-400'
              onClick={() => { addTag(tag) }}
            >
              <p>{tag}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <button
          className='text-white bg-blue-600 px-4 py-2 rounded-md'
          disabled={!inputTags.length}
          onClick={handleSearchWithTags}
        >
          Run with Tags
        </button>
      </div>
    </div>
  )
}

export default TagInput