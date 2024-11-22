
import "./App.css";

import { useEffect, useState } from "react";

import reactLogo from "./assets/react.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";

function User() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  const codetoken = async () => {
    console.log('location', location)
    //const queryParams = new URLSearchParams(location.search);
    //console.log('queryParams', queryParams)
    const result = location.search.startsWith('?') ? location.search.slice(1) : location.search;
    console.log('result', result)
    const queryParams = new URLSearchParams(result);
    const code = queryParams.get('code');
    try {
      const response = await axios.get(`/user/token?code=${code}`);
      console.log(response.data);
      window.open(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <button id="codetoken" onClick={codetoken} >获取token</button>
    </div>
  );



  // useEffect(() => {
  //   //console.log('location', location)
  //   //const queryParams = new URLSearchParams(location.search);
  //   //console.log('queryParams', queryParams)
  //   let token = null
  //   let hasFetchedToken = false
  //   const result = location.search.startsWith('?') ? location.search.slice(1) : location.search;
  //   console.log('result', result)
  //   const queryParams = new URLSearchParams(result);
  //   const code = queryParams.get('code');
  //   //localStorage.setItem('cachecode', code);


  //   const fetchToken = async () => {
  //     try {
  //       //console.log('url', `/user/token?code=${code}`)
  //       const response = await axios.get(`/user/token?code=${code}`);
  //       console.log('response', response.data)
  //       //window.open(response.data)
  //       // const token = response.data.token;
  //       // localStorage.setItem('token', token); // 存储 token 到本地存储
  //       // console.log('Token generated:', token);
  //       token = response.data.access_token
  //       console.log(token)
  //       hasFetchedToken = true

  //     } catch (error) {
  //       console.error('Failed to generate token:', error);
  //     }
  //   };

  //   // console.log('cachecode', localStorage.getItem('cachecode'))
  //   // console.log('code', code)
  //   // if (code != localStorage.getItem('cachecode')) {


  //   fetchToken();

  //   // }
  // }, [])

  // return (
  //   <div>
  //     <button id="code" >获取token</button>
  //   </div>
  // );

}

// const User = () => {
//   const location = useLocation();
//   useEffect(() => {
//     console.log('location', location)
//     //const queryParams = new URLSearchParams(location.search);
//     //console.log('queryParams', queryParams)
//     const result = location.search.startsWith('?') ? location.search.slice(1) : location.search;
//     console.log('result', result)
//     const queryParams = new URLSearchParams(result);
//     const code = queryParams.get('code');
//     const fetchToken = async () => {
//       try {
//         const response = await axios.get(`/user/token?code=${code}`);
//         const token = response.data.token;
//         localStorage.setItem('token', token); // 存储 token 到本地存储
//         console.log('Token generated:', token);
//       } catch (error) {
//         console.error('Failed to generate token:', error);
//       }
//     };

//     fetchToken();
//   }, []); // 空数组表示仅在组件挂载时调用

//   return (
//     <div>
//       <h1>欢迎来到仪表盘</h1>
//       <p>这里是您的仪表盘内容。</p>
//     </div>
//   );
// };


export default User;
