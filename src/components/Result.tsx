import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { ResponceTagsData } from '../types/type';
import { FaSearch } from "react-icons/fa";
import { IconContext } from 'react-icons';

type Props = {
  similarityScores: string[];
  responseTime: number;
  responceTags: ResponceTagsData[];
  inputTags: string[];
  setInputTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearchWithTags: (givenTags?: string[]) => void;
  isLoading: boolean;
  isError: boolean;
}

const Result: React.FC<Props> = ({ similarityScores, responseTime, responceTags, setInputTags, handleSearchWithTags, isLoading, isError }) => {

  // 検索結果に表示されたタグを用いてタグ検索
  const handleSearch = (tags: string[]) => {
    setInputTags(tags)
    handleSearchWithTags(tags)
  }


  return (
    <div className='w-full'>
      <div className='text-center flex justify-center'>

        {/* ロード画面 */}
        {isLoading && <div className='pt-4 animate-ping h-4 w-4 bg-blue-600 rounded-full'></div>}

        {/* エラー画面 */}
        {isError && <p className='pt-4'>エラーが発生しました</p>}

        {/* 類似度を取得出来ている場合はランキングを表示 */}
        {similarityScores.length > 0 && (
          <div className='w-full bg-white p-5 rounded-lg'>
            <div className='flex justify-center pb-4'>
              <p className='font-bold text-lg'>検索時間: {responseTime} s</p>
            </div>
            <div className='border text-left p-3 rounded-md'>
              <ul className='flex flex-col gap-5'>
                {responceTags.map((data, i) => (
                  <div key={i} className='flex'>
                    <div className='w-[160px] flex align-top'>
                      <p className='font-bold'>{data.name}</p>
                      {data.tags.length > 0 && (
                        <IconContext.Provider value={{ color: '#3b82f6' }}>
                          <button className='flex justify-center items-center h-7 w-7' onClick={() => handleSearch(data.tags)}><FaSearch /></button>
                        </IconContext.Provider>
                      )}
                    </div>
                    <div className='flex flex-wrap gap-[6px] flex-1'>
                      {data.tags.map((tag, i) => (
                        <li key={i} className='flex gap-4 px-2 py-[1px] bg-blue-100 rounded-md text-blue-600'>
                          <p>{tag}</p>
                        </li>
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