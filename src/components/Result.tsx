import React from 'react'

type Props = {
  outputTags: string[];
  isLoading: boolean;
  isError: boolean;
}

const Result: React.FC<Props> = ({ outputTags, isLoading, isError }) => {

  if (isLoading) return <>Loading...</>

  if (isError) return <>Error</>

  return (
    <>
      <ul>
        {outputTags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
    </>
  )
}

export default Result