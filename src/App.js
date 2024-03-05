import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import Default from './components/Default/Default';
import { isJsonString } from './untils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './service/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from "./redux/slides/userSile";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)



  // console.log("user", user?.isAdmin)
  const handleDecoded = () => {
    let storeData = user?.access_token || localStorage.getItem('access_token')
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

  useEffect(() => {
    const { storeData, decode } = handleDecoded()
    if (decode?.id) {
      try {
        handleGetDetailsUser(decode?.id, storeData)
        // console.log("bug", storeData)
      } catch (error) {
        console.log("err details")
      }
    }
  }, [])

  //   return (
  //     <div>
  //       < Router >
  //         <Routes>
  //           {routes.map((routes) => {
  //             const Page = routes.page
  //             const isCheckAuthencation = routes.isPrivate
  //             console.log("ischeck", routes.isShowHeader)
  //             const Layout = routes.isShowHeader ? Default : Fragment
  //             return (
  //               <Route key={routes.path} path={routes.path} element={
  //                 <Layout>
  //                   <Page />
  //                 </Layout>
  //               } />
  //             )
  //           })}
  //         </Routes>
  //       </Router >
  //     </div >
  //   )
  // }


  return (
    <div>
      < Router >
        <Routes>
          {routes.map((routes) => {
            const Page = routes.page
            const isCheckAuthencation = routes.isPrivate
            const Layout = routes.isShowHeader ? Default : Fragment
            return (
              <Route
                key={routes.path}
                path={routes.path}
                element={
                  isCheckAuthencation && !user?.isAdmin ? (
                    <Layout >
                      <NotFoundPage />
                    </Layout>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            )
          })}
        </Routes>
      </Router >
    </div >
  )
}
