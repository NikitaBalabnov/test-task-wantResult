import  { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../hooks/redux'

type Props = {
    children: JSX.Element
    path: string
}

const RequireAuth:FC<Props> = ({children, path}) => {
    const location = useLocation()
    const auth = useTypedSelector((state) => state.auth.isAuth)
    if(!auth){
        return <Navigate to={path} state={{from: location}}/>
    }

  return children
}

export default RequireAuth
