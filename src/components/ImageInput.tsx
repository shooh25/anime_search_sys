import React from 'react'
import { useState } from 'react';
import { tagCategories } from '../utils/constants';

type Props = {
  inputImage: File | null;
  tagCategory: number;
  handleSearchWithImage: () => void;
  setInputImage: React.Dispatch<React.SetStateAction<File | null>>
  setTagCategory: React.Dispatch<React.SetStateAction<number>>
}

const ImageInput: React.FC<Props> = ({ inputImage, tagCategory, setTagCategory, setInputImage, handleSearchWithImage }) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null); // preview image

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInputImage(file)

    // setting preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null)
    }
  };

  const handleChangeCat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagCategory(Number(event.target.value))
  }

  return (
    <div>
      <h2 className='font-bold text-xl'>画像検索</h2>
      <input
        type="file"
        accept='image/png, image/jpeg'
        onChange={handleInputFile}
      />
      <div className='w-full aspect-video'>
        {previewSrc && <img src={previewSrc} alt="Preview" className="w-full h-full object-contain" />}
      </div>
      <div className='w-full flex gap-4'>
        <h3 className='font-bold text-lg'>Category</h3>
        <select value={tagCategory} onChange={handleChangeCat} className='border border-black'>
          {tagCategories.map((category, i) => (
            <option value={i} key={i}>{category}</option>
          ))}
        </select>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <button
          className='text-white bg-blue-600 px-4 py-2 rounded-md'
          disabled={!inputImage}
          onClick={handleSearchWithImage}
        >
          Run with Image
        </button>
      </div>
    </div>
  )
}

export default ImageInput