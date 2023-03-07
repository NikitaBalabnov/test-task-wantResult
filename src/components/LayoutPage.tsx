import React from 'react'
import { Layout } from 'antd';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
type Props = {}

const LayoutPage = (props: Props) => {
  return (
    <>
        <Layout>
            <Navbar/>
            <Layout.Content>
                <Outlet/>
            </Layout.Content>
        </Layout>
    </>
  )
}

export default LayoutPage