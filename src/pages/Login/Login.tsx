import { Card, Row } from 'antd'
import { useLocation } from 'react-router-dom'

import LoginForm from './components/LoginForm'

import '../../App.css'
type Props = {}
const Login = (props: Props) => {
  const location = useLocation()
  const fromPath = location.state?.from?.pathname || '/';
  return (
    <div>
      <Row align={'middle'} justify={'center'} className='h100'>
        <Card>
          <LoginForm/>
        </Card>
      </Row>
    </div>
  )
}

export default Login