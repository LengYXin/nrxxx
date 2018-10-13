import Taro, { request, Events, requestPayment, getUserInfo, chooseAddress, login, authorize } from "@tarojs/taro";
interface IData {
    /** 未授权 */
    unAuthorized: boolean
    /** 用户信息 */
    user: any
    /** 地址 */
    address: any
    /** 临时code */
    code: string
}
class Help {
    constructor() {
        // this.chooseAddress();
        // this.login();
        // console.log(this);
        this.init();
    }
    events = new Events();
    data: IData = {
        unAuthorized: true,
        user: {},
        address: {},
        code: ''
    }
    url = "https://www.easy-mock.com/mock"
    /** 请求参数 */
    requestOBJECT = {
        header: {
            'content-type': 'application/json'
        }
    }
    async init() {
        this.getUserInfo({ withCredentials: true });
        Taro.showShareMenu({
            withShareTicket: true
        })
    }
    /**
     * 请求数据
     * @param params 
     */
    async request(params: request.Param) {
        Taro.showLoading({
            title: 'loading',
            mask: true
        })
        params = { ...this.requestOBJECT, ...params };
        params.url = this.url + params.url;
        const res = await Taro.request(params);
        Taro.hideLoading();
        console.log("request", res);
        if (res && res.statusCode && res.data && res.data.success) {
            return res.data.data;
        } else {
            Taro.showToast({
                title: "Error",
            })
        }
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
    async login(params?: login.Param) {
        if (this.data.code == '') {
            const res = await Taro.login(params);
            this.data.code = res.code;
            console.log("login", this.data.code);
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