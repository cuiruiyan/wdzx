import express from "express";
import ViteExpress from "vite-express";
import { code, drive, usertoken } from "./util/app.js";
import config from "./config.js";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});


//获取授权链接
app.get('/usercode', async (req, res) => {
  const usercode = await code(config.AccessKey, 'code', 'http://8.153.38.238:3000/user', 'kso.drive.as_user.manage,kso.file.write', 'userstate');
  // console.log(req.query.code)
  res.send(usercode)

})
//获取用户授权token
app.get('/user/token', async (req, res) => {
  console.log('code', req.query.code)
  try {
    const token = await usertoken(req.query.code as string)
    console.log(token.data.data)
    res.send(token.data.data)
  } catch (error) {
    console.log(error.response)
  }
})

//获取盘列表
app.get('/acquire/drive', async (req, res) => {
  const acquiredirve = await drive(req.query.allotee_type as string, req.query.page_size as unknown as number)
  console.log(acquiredirve.data)
  res.send(acquiredirve.data)
})


//告警测试
app.post('/ksops/api/v1/monitor/alersent', (req, res) => {
  console.log(req.body)
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
