import React, { ChangeEventHandler, useState } from 'react'
import { taggingList } from '../utils/constants'

const TagInput: React.FC = () => {
  const [inputText, setInputText] = useState<string>("") // texts in the input box
  const [inputTags, setInputTags] = useState<string[]>([]) // added tags
  const [suggestedTags, setsuggestedTags] = useState<string[]>(taggingList) // suggested tags while typing texts

  const handleChangeText: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const text = target.value
    let matchedTags: string[] = []

    if (text.length > 0) {
      matchedTags = taggingList.filter((tag) => {
        return tag.match(new RegExp(`${text}`, "gi"));
      })
    }
    
    setsuggestedTags(matchedTags)
    setInputText(text)
  }

  const addTag = (tag: string) => {
    if (!tag || inputTags.includes(tag)) {
      return
    }
    setInputText("")
    setsuggestedTags(taggingList)
    setInputTags([...inputTags, tag])
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
          <li key={i} className='flex gap-1'>
            <p>{tag}</p>
            <button onClick={() => removeTag(i)}>×</button>
          </li>
        ))}
      </ul>
      <div className='relative w-full'>
        <input
          type="text"
          value={inputText}
          onChange={handleChangeText}
          className='border-black border w-full'
        />
        <ul className='absolute border border-black w-full h-[200px] overflow-y-scroll'>
          {suggestedTags.map((tag, i) => (
            <li
              key={i}
              className='hover:bg-blue-500'
              onClick={() => { addTag(tag) }}
            >
              <p>{tag}</p>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default TagInput