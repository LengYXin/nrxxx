import Taro, { request, Events, requestPayment, getUserInfo, chooseAddress, login, authorize } from "@tarojs/taro";
import Server from './server';
interface IData {
    /** 未授权 */
    unAuthorized: boolean
    /** 用户信息 */
    user: any
    /** 地址 */
    address: any
    /** 临时code */
    code: string
    /** 用户认证数据 */
    token: string
}
class Help {
    constructor() {
        this.init();
    }
    events = new Events();
    data: IData = {
        unAuthorized: true,
        user: {},
        address: {},
        code: '',
        token: '',
    }
    private url = "https://shop.jizhigame.com"
    /** 请求参数 */
    private requestOBJECT = {
        header: {
            'shop-token': '',
            'content-type': 'application/json'
        }
    }
    private async init() {
        // this.getUserInfo({ withCredentials: true });
        Taro.showShareMenu({
            withShareTicket: true
        })
        await this.getUserInfo();
        Server.login();
    }
    /**
     * 请求数据
     * @param params 
     */
    async request(params: request.Param, loading = true) {
        if (loading) {
            Taro.showLoading({
                title: 'loading',
                mask: true
            })
        }
        params = { ...this.requestOBJECT, ...params };
        // console.log("请求：", params.url);
        params.url = this.url + params.url;
        const res = await Taro.request(params);
        // console.log("request", res);
        if (loading) {
            setTimeout(() => {
                Taro.hideLoading();
            }, 300);
        }
        if (res && res.statusCode && res.data && res.data.isSuccess) {
            // console.log(object);
            return res.data.data;
        } else {
            // if (loading) {
            Taro.showToast({
                title: "Error",
            })
            // }
        }
    }
    /**
     * 设置token
     * @param token 
     */
    setToken(token) {
        this.data.token = token;
        this.requestOBJECT.header["shop-token"] = token;
    }
    /**
     * 支付
     * @param params 
     */
    async requestPayment(params: requestPayment.Param) {
        const res = await Taro.requestPayment(params)
        return res;
    }
    /**
     * 登陆
     * @param params 
     */
    private async login(params?: login.Param) {
        console.log(this.data.code);
        if (this.data.code == '') {
            const res = await Taro.login(params);
            this.data.code = res.code;
            console.log("微信登陆", this.data);
        }
        return this.data.code;
    }
    /**
     * 用户信息
     * @param params 
     */
    async  getUserInfo(params?: getUserInfo.Param) {
        if (this.data.user.nickName == null) {
            await this.login();
            try {
                const res = await Taro.getUserInfo(params)
                this.data.user = JSON.parse(res.rawData)
                this.data.unAuthorized = false;
                // this.events.trigger("getUserInfo", this.data.user)
                console.log("getUserInfo", this.data.user);
            } catch (error) {
                console.log(error);
                this.data.unAuthorized = true;
            }

        }
        // console.log(this.data.user);
        return this.data.user;
    }
    /**
     * 获取收货地址
     * @param params 
     */
     async chooseAddress(params?: chooseAddress.Param) {
        if (this.data.address.userName == null) {
            const res = await Taro.chooseAddress(params)
            this.data.address = res;
            this.data.address.address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
            console.log("chooseAddress", this.data.address);
        }
        return this.data.address
    }
}
export default new Help();