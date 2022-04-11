import React from 'react'

const Helmet = (props) => {
  document.title = `Bacola - ${props.title}`
  return (
    <>
      {props.children}
    </>
  )
}

export default Helmet