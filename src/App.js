import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import Default from './components/Default/Default';
import { isJsonString } from './untils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './service/UserService'
import { useDispatch } from 'react-redux'
import { updateUser } from "./redux/slides/userSile";
import axios from 'axios';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storeData, decode } = handleDecoded()
    if (decode?.id) {
      handleGetDetailsUser(decode?.id, storeData)
    }
  }, [])

  const handleDecoded = () => {
    let storeData = localStorage.getItem('access_token')
    let decode = {}
    if (storeData && isJsonString(storeData)) {
      storeData = JSON.parse(storeData)
      decode = jwtDecode(storeData)
      // console.log('aaaaa', decode)
    }
    // console.log('xxxx', storeData)
    return { decode, storeData }

  }

  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const currenTime = new Date()
    const { decode } = handleDecoded()
    if (decode?.exp < currenTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }



  return (
    <div>
      < Router >
        <Routes>
          {routes.map((routes) => {
            const Page = routes.page
            const Layout = routes.isShowHeader ? Default : Fragment
            return (
              <Route key={routes.path} path={routes.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router >
    </div >
  )
}