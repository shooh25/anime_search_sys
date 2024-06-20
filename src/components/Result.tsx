import React from 'react'
import ReactPlayer from 'react-player';

type Props = {
  similarityScores: string[];
  isLoading: boolean;
  isError: boolean;
}

const Result: React.FC<Props> = ({ similarityScores, isLoading, isError }) => {
  return (
    <div className='w-full'>
      <h2 className="font-bold text-xl">結果</h2>
      <div className='mt-2'>

        {isLoading && <p>Loading</p>}
        {isError && <p>Error</p>}

        {/* output ranking */}
        {similarityScores.length > 0 && (
          <div>
            <ul>
              {similarityScores.map((score, i) => (
                <li key={i} className='flex gap-6'>
                  <p>{i + 1}位</p>
                  <p>{score[0]}</p>
                  <p className='font-bold'>{score[1]}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* video player */}
        <div>
          <ReactPlayer url={"../../assets/sample.mp4"} controls={true} muted={true} />
        </div>
      </div>
    </div>
  )
}

export default Result