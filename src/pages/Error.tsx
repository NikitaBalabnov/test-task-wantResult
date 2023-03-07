import React from 'react'
import {useRouteError} from 'react-router-dom'
const Error = () => {
    const error:any = useRouteError()
  return (
    <div>
        <p style={{textAlign: 'center'}}>{error.statusText || error.message}</p>
    </div>
  )
}

export default Error