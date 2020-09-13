import { request } from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgc = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells = shopInfo.cSells
    this.fans = shopInfo.cFans
    this.goods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class Params {
  constructor(info,rule) {
    //images可能没有值(有些商品有,有些商品没有)
    this.image = info.images ? info.images[0] : ""
    this.sets = info.set
    this.table = rule.tables
  }
}

export function getRecommend() {
  return request({
    url:'/recommend'
  })
}
