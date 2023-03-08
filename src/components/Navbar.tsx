import { Button, Layout, message, Row } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../hooks/redux";
import { LogoutAPI } from "../store/reducers/Login/AuthSlice";

type Props = {};

const Navbar = (props: Props) => {
  const {isAuth: auth, user} = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  function LogOut() {
    dispatch(LogoutAPI());
  }
  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please, submit form",
    });
  };
  return (
    <>
      {contextHolder}
      <Layout.Header>
        <Row justify={!auth ? "end" : "space-between"} align={"middle"}>
          {!auth ? (
            <Link to={"/calendar"}>
              <Button onClick={warning} type="primary">
                Log in
              </Button>
            </Link>
          ) : (
            <>
              <div style={{color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '20px'}} className="">
                {user.username === 'admin' ? 'Admin' : user.username.toUpperCase()}
              </div>
              <Link to={"test-task-wantResult"}>
                <Button onClick={LogOut} type="primary">
                  Log out
                </Button>
              </Link>
            </>
          )}
        </Row>
      </Layout.Header>
    </>
  );
};

export default Navbar;
