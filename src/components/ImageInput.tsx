import React from 'react'
import { useState } from 'react';

type Props = {
  inputImage: File | null;
  handleSearchWithImage: () => void;
  setInputImage: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

const ImageInput: React.FC<Props> = ({ inputImage, setInputImage, handleSearchWithImage, isLoading }) => {
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

  return (
    <div className='relative pr-6 border-r border-gray-200'>
      <h2 className='font-bold text-2xl mb-6'>画像検索</h2>
      <input
        type="file"
        accept='image/png, image/jpeg'
        onChange={handleInputFile}
        className='w-full'
      />
      <div className='w-full'>
        {previewSrc && <img src={previewSrc} alt="Preview" className="w-full h-full object-contain" />}
      </div>
      <div className='w-full flex justify-center absolute bottom-0'>
        <button
          className='text-white bg-blue-600 px-10 py-3 font-bold rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed'
          disabled={!inputImage || isLoading}
          onClick={handleSearchWithImage}
        >
          画像検索を実行
        </button>
      </div>
    </div>
  )
}

export default ImageInput