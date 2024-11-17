import React from 'react'
import ReactPlayer from 'react-player';
import { ResponceTagsData } from '../types/type';

type Props = {
  similarityScores: string[];
  responseTime: number;
  responceTags: ResponceTagsData[];
  isLoading: boolean;
  isError: boolean;
}

const Result: React.FC<Props> = ({ similarityScores, responseTime, responceTags, isLoading, isError }) => {

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
            <div className='border text-left p-3 rounded-md'>
              <ul className='flex flex-col gap-3'>
                {responceTags.map((data, i) => (
                  <div key={i} className='flex'>
                    <div className='w-[150px]'>
                      <p className='font-bold'>{data.name}</p>
                    </div>
                    <div className='flex flex-wrap gap-x-1 flex-1'>
                      {data.tags.map((tag, i) => (
                        <p key={i} className='leading-5'>{tag},</p>
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div className='w-full mt-5'>
              <ul>
                {similarityScores.map((score, i) => (
                  <li
                    key={i}
                    className='border-b-2 py-2 cursor-pointer flex'
                  >
                    <div className='flex-1 flex gap-2'>
                      <p>{i + 1}位</p>
                      <div>
                        <p>{score[0]}</p>
                        <p className='font-bold'>{score[1]}</p>
                      </div>
                    </div>
                    <div className='h-[200px]'>
                    <ReactPlayer
                      url={`http://localhost:8080/${score[0]}`}
                      controls={false}
                      playing={true}
                      loop={true}
                      muted={true}
                      height={"100%"}
                    />
                    </div>
                  </li>
                ))}
              </ul>
              {/* result video scenes */}
              {/* <div className='w-full bg-slate-200'>
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
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result