import React from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  similarityScores: string[];
  responseTime: number;
  isLoading: boolean;
  isError: boolean;
}

const Result: React.FC<Props> = ({ similarityScores, responseTime, isLoading, isError }) => {
  const [clickedVideoIndex, setClickedVideoIndex] = useState<number>(0)

  return (
    <div className='w-full'>
      <div className='text-center flex justify-center'>
        {isLoading && <div className='pt-4 animate-ping h-4 w-4 bg-blue-600 rounded-full'></div>}
        {isError && <p className='pt-4'>エラーが発生しました</p>}

        {/* output ranking */}
        {similarityScores.length > 0 && (
          <div className='w-full bg-white p-5 rounded-lg'>
            <div className='flex justify-center pb-4'>
              <p className='font-bold text-lg'>検索時間: {responseTime} s</p>
            </div>
            <div className='w-full grid gap-6 grid-cols-2'>
              <ul>
                {similarityScores.map((score, i) => (
                  <li
                    key={i}
                    className='border-b-2 py-2 cursor-pointer'
                    onClick={() => (setClickedVideoIndex(i))}
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
                {similarityScores[clickedVideoIndex] && (
                  <div className='w-full h-full'>
                    <p>{similarityScores[clickedVideoIndex][0]}</p>
                    <ReactPlayer
                      url={`http://localhost:8080/${similarityScores[clickedVideoIndex][0]}`}
                      controls={true}
                      muted={true}
                      width={"100%"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result