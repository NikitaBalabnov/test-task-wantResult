import { Button, Form, Input, message, } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux";
import { LoginAPI } from "../../../store/reducers/Login/AuthSlice";
import { fromRules } from "../../../utils/LoginFormRules";
import '../components/LoginForm.css'
type Props = {};

const LoginForm = (props: Props) => {
  const [username, setUserName] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {isAuth, error, isLoading} = useTypedSelector(state => state.auth)
  useEffect(()=>{
    if(isAuth === true){ 
      navigate('/calendar')
    }
  },[isAuth])
  const hendleError = () => {
    messageApi.open({
      type: 'error',
      content: `${error}, please, try Username: Nick, Password: 123`,
    });
  };
  const hendleSubmit = (username: string, userpassword: string) =>{
    dispatch(LoginAPI({ username: username.toLowerCase(), password: userpassword}));
    if(error){
      hendleError()
    }
  }
  return (
    <>
    {contextHolder}
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={() => hendleSubmit(username, userpassword)}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[fromRules.required()]}
      >
        <Input value={username} onChange={(e) => setUserName(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[fromRules.required()]}
      >
        <Input type="password" value={userpassword} onChange={(e) => setUserPassword(e.target.value)}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default LoginForm;
