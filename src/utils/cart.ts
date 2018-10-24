import Help from './help';
import Taro from '@tarojs/taro';
/**
 * 购物车
 */
class Cart {
    constructor() {
        console.log(this);
    }
    cart: any[] = Taro.getStorageSync('cart') || [];
    /**
     * 添加购物车
     */
    addCart(commodity) {
        const cart = this.cart.find(x => x.id == commodity.id)
        if (cart) {
            cart.number += commodity.number;
        } else {
            this.cart.push(commodity);
        }
        Taro.setStorageSync("cart", this.cart);
        Taro.showToast({ title: "加入成功" })
    }

}
export default new Cart();