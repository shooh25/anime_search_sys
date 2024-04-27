import React from 'react'
import { useQuery } from 'react-query'
import { getSample } from './apis/api'

const Top: React.FC = () => {
  const { data, isLoading } = useQuery("sample", getSample)
  console.log(data)

  return (
    <>
    </>
  )
}

export default Top