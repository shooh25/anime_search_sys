import React from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  similarityScores: string[];
  isLoading: boolean;
  isError: boolean;
  videos: string[];
}

const Result: React.FC<Props> = ({ similarityScores, isLoading, isError, videos }) => {
  const [videoIndex, setVideoIndex] = useState<number>(0)

  return (
    <div className='w-full'>
      <h2 className="font-bold text-xl">結果</h2>
      <div className='mt-2'>

        {isLoading && <div className='animate-ping h-4 w-4 bg-blue-600 rounded-full'></div>}
        {isError && <p>Error</p>}

        {/* output ranking */}
        {similarityScores.length > 0 && (
          <div className='grid gap-6 grid-cols-2 '>
            <ul>
              {similarityScores.map((score, i) => (
                <li
                  key={i}
                  className='border-b-2 py-2 cursor-pointer'
                  onClick={() => (setVideoIndex(i))}
                >
                  <div className='flex gap-2'>
                    <p>{i + 1}位</p>
                    <div>
                      <p>{score[0]}</p>
                      <p className='font-bold'>{score[1]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* result video scenes */}
            <div className='w-full bg-slate-200'>
              {videos[videoIndex] && similarityScores[videoIndex] && (
                <div className='w-full h-full'>
                  <p>{similarityScores[videoIndex][0]}</p>
                  <ReactPlayer
                    url={videos[videoIndex]}
                    controls={true}
                    muted={true}
                    width={"100%"}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result