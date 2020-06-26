import {request1, request2} from './request';

export function getHomeMultidata() {
  return request1({
    url: '/home/multidata'
  })
}

export function getHomeGoods(tabId, page) {
  return request2({
    url: '/api/v1/home/goods',
    params: {
      tabId,
      page
    }
  })
}

