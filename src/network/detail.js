import {request2} from "./request";

export function getDetail(data) { // 传递对象
  return request2({
    url: '/api/v1/goods/detail', 
    method: "post",
    data 
  })
}

export class Goods {
  constructor(data, logistics_info) {
    this.title = data.title
    this.newPrice = data.price
    this.oldPrice = data.original_price
    this.discount = data.discount_activity
    this.sales_volume = data.sales_volume
    this.sales_collect = data.sales_collect
    this.services1 = logistics_info
    this.services2 = data.sales_deliver
  }
} 

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopImage;
    this.name = shopInfo.shopName;
    this.fans = shopInfo.follow;
    this.sells = shopInfo.cumulativeSales;
    this.goodsCount = shopInfo.goodsNum
  }
}
