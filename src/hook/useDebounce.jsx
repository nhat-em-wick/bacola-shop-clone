import React, {useState, useEffect} from 'react'

const useDebounce = (value, delay = 500) => {
  const [valueDebounce, setValueDebounce] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValueDebounce(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])


  return valueDebounce
}

export default useDebounce