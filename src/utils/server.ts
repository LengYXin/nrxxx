import Help from './help';
/**
 * 数据服务
 */
class Server {
    constructor() {

    }
    user = {
        isRegistered: false,
        token: ""
    };
    cart = [];
    private loginState = false;
    /**
     * 登陆
     * @param code 
     */
    async login(code = Help.data.code) {
        if (Help.data.unAuthorized) {
            return console.error("未授权");
        }
        if (!this.loginState) {
            this.user = await Help.request({
                url: "/Api/cgi/Login/ByWeixin",
                method: "POST",
                data: {
                    code
                }
            }, false);
            this.loginState = true;
            Help.setToken(this.user.token);
            this.DeliveryAddress();
            // 未注册
            if (!this.user.isRegistered) {
                this.Registered()
            }
        }
        return this.user;
    }
    /**
     * 注册
     * @param parmas 
     */
    private async Registered() {
        const res = await Help.request({
            url: "/Api/cgi/Update/ProfileByWeixin",
            data: {
                name: Help.data.user.nickName,
                avatar: Help.data.user.avatarUrl,
                phone: '18611752863',
            }, method: "POST"
        }, false);
        return res;
    }
    /**
     * 获取分类
     */
    async SkuCategoryRoot() {
        const res = await Help.request({ url: "/Api/cgi/List/SkuCategoryRoot" }, false);
        const tabList = res.items.map(x => {
            return { title: x.text, ...x }
        });
        return tabList;
    }
    /**
    * 分页获取商品的接口
    * filter	String	
    * categoryId	Guid?	
    * page	Int32	
    * rows
    */
    async QuerySku(data) {
        const res = await Help.request({ url: "/Api/cgi/Query/Sku", data });
        return res;
    }
    /**
     * 创建 收货地址
     * @param data 
     * isDefault	Boolean	
        fullValue	String	
        contactMan	String	
        contactPhone
     */
    async CreateDeliveryAddress(data) {
        const res = await Help.request({ url: "/Api/cgi/Create/DeliveryAddress", method: "POST", data });
        return res;
    }
    /**
     * 获取地址
     */
    async DeliveryAddress() {
        const res = await Help.request({ url: "/Api/cgi/List/DeliveryAddress" }, false);
        let address = {
            userName: "",
            telNumber: "",
            address: "",
        };
        if (res.items.length) {
            const add = res.items[0];
            address = {
                userName: add.contactMan,
                telNumber: add.contactPhone,
                address: add.fullValue
            }
        }
        Help.data.address = {
            userName: address.userName,
            telNumber: address.telNumber,
            address: address.address
        }
        return address;
    }
    /**
     * 优惠劵
     */
    async Coupon(){
        const res = await Help.request({ url: "/Api/cgi/List/Coupon"});
        return res;
    }
    /**
     * 查询订单
     * 待支付 190100
        待发货 190101
        待收货 190102
        已完成 190103
     */
    async QuerySaleBill(data) {
        const res = await Help.request({ url: "/Api/cgi/Query/SaleBill", data });
        return res;
    }
    /**
     * 创建订单
     * @param data 
     */
    async CreateSaleBill(data) {
        const res = await Help.request({ url: "/Api/cgi/Create/SaleBill", data, method: "POST" });
        return res;
    }

}
export default new Server();