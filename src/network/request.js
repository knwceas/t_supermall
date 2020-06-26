import axios from 'axios'

export function request1(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  }, err => {
    console.log(err);
  })
  
  instance.interceptors.response.use(res => {
    //console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}

export function request2(config) {
  const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8010', 
    timeout: 5000,
    headers: {'Content-Type': "application/json;charset=utf-8"}
  }, err => {
    console.log(err);
  })
  
  instance.interceptors.response.use(res => {
    //console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}
