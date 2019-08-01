import fly from "./http"

class Apis {
    // test() {
    //     // 贝思客蛋糕
    //     return fly.get("/getjson.ashx", {
    //         v: "1562722622906",
    //         c: "Index",
    //         m: "GetBannerList",
    //         Type: "1",
    //         City: "上海",
    //         BrandType: "1"
    //     })
    // }
    // 获取商品信息
    getfood () {
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            food_type: 1,
            shop_id: 374933,
            from_type: 1
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
         })
    }
    // 获取评论信息
    getComments (tag) {
        return fly.request("/customer/crm/communion/comment/list", {
            shop_id: 374933,
            lwm_sess_token: 'g9irfpfphoavbk4a9bmleme4l0',
            lwm_appid: 'dh129ahsd9898123gjhjfamnxoo1',
            admin_id: 88997,
            page: 0,
            num: 20,
            tag,
            timestamp: 1562901588,
            nonce: 13110,
            sign: 'D2D1EAB6D8D357815EF071065A174D1E'
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        })
    }
    // 获取选择信息
    getChooseInfo () {
        return fly.request("/customer/common/shop/shop/info?ver=v2", {
            shop_id: 374933,
            lwm_sess_token: 'g9irfpfphoavbk4a9bmleme4l0',
            lwm_appid: 'dh129ahsd9898123gjhjfamnxoo1',
            admin_id: 88997,
            timestamp: 1562901585,
            nonce: 24262,
            sign: '5091755A24548D4C1D3666F87FC49132',
            from_type: 1
        },{
            method:"post",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        })
    }
}
export default new Apis();