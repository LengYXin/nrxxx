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
        console.log(res);
        return res;
    }
}
export default new Server();