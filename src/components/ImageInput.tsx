import React from 'react'
import { useState } from 'react';

type Props = {
  inputImage: File | null;
  handleSearchWithImage: () => void;
  setInputImage: React.Dispatch<React.SetStateAction<File | null>>
}

const ImageInput: React.FC<Props> = ({ inputImage, setInputImage, handleSearchWithImage }) => {
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
      <div className='w-full flex justify-center'>
        <button disabled={!inputImage} onClick={handleSearchWithImage}>Run with Image</button>
      </div>
    </div>
  )
}

export default ImageInput