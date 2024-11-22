import axios from "axios"
import { formatToRFC2822, getSignature, postSignature } from "./wps4.js"
import config from "../config.js"
import qs from "qs"

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzMxNDE5NTQ0LCJjb21wX2lkIjoiMSIsImNsaWVudF9pZCI6IkNIQklSWllST1lWRFhITUIiLCJ0a190eXBlIjoidXNlciIsInNjb3BlIjoia3NvLmRyaXZlLmFzX3VzZXIubWFuYWdlLGtzby5maWxlLndyaXRlIiwidXNlcl9pZCI6MSwiY29tcGFueV9pZCI6MSwiY2xpZW50X3ByaW5jaXBhbF9pZCI6IjQwNTkzIn0.d82SJ_am8fGx1CppHjHVmK8G4pbGYfGQly48Jcqau8M'

//构造授权跳转链接，用户授权，获取临时授权码code
export async function code(client_id: string, response_type: string, redirect_uri: string, scope: string, state: string) {
  const url = 'http://202.121.141.87'
  const api = `/o/oauth/v1/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`
  //const usercode = await axios.get(`${url}${api}`)
  //return usercode
  const codeurl = `${url}${api}`
  return codeurl
}

//获取用户授权token
export async function usertoken(code: string) {
  const url = 'http://202.121.141.87/o/oauth'
  const ContentType = 'application/x-www-form-urlencoded'
  const api = `/v1/token`
  const WpsDocsDate = formatToRFC2822(new Date());
  const body = {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://8.153.38.238:3000/user',
    'scope': 'kso.drive.as_user.manage,kso.file.write,kso.appdrive.file.read'
  }
  const token = await axios.post(`${url}${api}`, qs.stringify(body), {
    headers: {
      'Content-Type': ContentType,
      'Wps-Docs-Date': WpsDocsDate,
      'Wps-Docs-Authorization': postSignature({ url: api, WpsDocsDate, body: qs.stringify(body), ContentType }),
    },
  })
  return token
}

//获取应用授权token
export async function token() {
  const url = 'http://202.121.141.87/o/oauth'
  const ContentType = 'application/x-www-form-urlencoded'
  const api = '/v1/token'
  const body = {
    'grant_type': 'client_credentials',
    'scope': 'kso.appfile.readwrite,kso.drive.readwrite'
  }
  // const bo = qs.stringify(body)
  //xwconsole.log(bo)
  const WpsDocsDate = formatToRFC2822(new Date());
  const access_token = await axios.post(`${url}${api}`, qs.stringify(body), {
    headers: {
      'Content-Type': ContentType,
      'Wps-Docs-Date': WpsDocsDate,
      'Wps-Docs-Authorization': postSignature({ url: api, WpsDocsDate, body: qs.stringify(body), ContentType }),
    }
  })
  // console.log('access_token', access_token)
  return access_token.data.data;
}


//获取盘列表
export async function drive(allotee_type: string, page_size: number) {
  const api = '/v7/drives'
  // const bo = qs.stringify(body)
  //xwconsole.log(bo)
  const WpsDocsDate = formatToRFC2822(new Date());
  const drive = await axios.get(`${config.url}${api}`, {
    headers: {
      'Content-Type': config.ContentType,
      'Wps-Docs-Date': WpsDocsDate,
      'Wps-Docs-Authorization': getSignature(api, WpsDocsDate),
      'Authorization': `Bearer ${access_token}`
    }
  })
  // console.log('access_token', access_token)
  return drive;
}