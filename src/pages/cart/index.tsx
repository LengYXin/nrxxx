import { Image, Navigator, Text, View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton, AtIcon, AtInputNumber, AtList, AtListItem, AtTag } from 'taro-ui';
import Cart from '../../utils/cart';
import Help from '../../utils/help';
import Server from '../../utils/server';
import './index.less';
export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '购物车'
  }
  state = {
    allSelect: false,
    userName: "",
    price: 0,
    data: Cart.cart.slice()
  }
  componentWillMount() { }

  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() {
    this.setCart(Cart.cart)
  }
  setCart(cart: any[]) {
    let allSelect = false;
    let price = 0;
    if (cart.every(x => x.select)) {
      allSelect = true;
    }
    // 计算价格
    cart.map(x => {
      if (x.select) {
        price += x.price * x.number
      }
    })
    this.setState({
      data: cart,
      price: price.toFixed(2),
      userName: Help.data.address.userName,
      allSelect: allSelect
    })
    Taro.setStorageSync("cart", cart);
  }
  componentDidHide() { }
  // 全选
  onAllSelection() {
    const allSelection = !this.state.allSelect;
    const cart = this.state.data;
    this.setCart(cart.map(x => {
      x.select = allSelection;
      return x;
    }))
    // this.setState({ allSelection: !allSelection })
  }
  // 更商品数量
  handleChange(index, number, e) {
    e.stopPropagation()
    e.preventDefault();
    const data = this.state.data;
    data[index].number = number;
    this.setCart(data)
  }
  // 商品选择
  selectCart(index, e) {
    e.stopPropagation()
    const data = this.state.data;
    data[index].select = !data[index].select;
    console.log(data);
    this.setCart(data)
  }
  // 结算
  async onSettlement() {
    // address = {
    //   userName: res.userName,
    //   telNumber: res.telNumber,
    //   address: res.address
    // }
    if (Help.data.address.userName == "" || Help.data.address.userName == null) {
      return Taro.showToast({ title: "请设置收货地址", icon: "none" })
    }
    const res = await Server.CreateSaleBill({
      contactMan: Help.data.address.userName,
      contactPhone: Help.data.address.telNumber,
      address: Help.data.address.address,
      skus: this.state.data.map(x => {
        return {
          id: x.id,
          count: x.number
        }
      })
    });
    if (res) {
      Cart.cart = [];
      this.setCart([])
    }
  }
  onGotoMore() {
    Taro.navigateTo({
      url: 'pages/address/index'
    })
  }
  stopPropagation = (e) => {
    e.stopPropagation()
  }
  render() {
    return (
      <View className='index' >
        <AtList>
          <Navigator url="/pages/address/index">
            <AtListItem title={'收件人：' + this.state.userName} arrow='right' />
          </Navigator>
        </AtList>
        <View>
          {this.state.data.slice().length <= 0 ? <View style="text-align:center;padding-top:30px;font-size:16px;color:#ccc;">购物车中没有商品</View> : this.state.data.slice().map((data: any, index) => {
            return <View className='data-item at-row' key={index} onClick={this.selectCart.bind(this, index)}>
              <View className='at-col at-col-1 data-select' >
                <AtIcon prefixClass="at-icon" value='check-circle' size='20' color={data.select ? '#d81e06' : '#cdcdcd'}></AtIcon>
              </View>
              <View className='at-col at-col-4 data-img' >
                <Image
                  src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                />
              </View>
              <View className='at-col at-col-7 data-info'>
                <View className='at-row data-name'>
                  {data.id}
                </View>
                <View className="data-tag">
                  <AtTag size='small'>{'标签'}</AtTag>
                </View>
                <View className='at-row data-price'  >
                  <Text className="price">￥ {parseInt(data.price).toFixed(2)}</Text>
                  <View className="AtInputNumber" onClick={this.stopPropagation}>
                    <AtInputNumber
                      min={1}
                      max={99999}
                      step={1}
                      value={data.number}
                      onChange={this.handleChange.bind(this, index)}
                    />
                  </View>
                </View>
              </View>
            </View>
          })}
        </View>
        <View className="fixed-btns at-tab-bar">
          <View className="btn-qx" onClick={this.onAllSelection.bind(this)}>
            {/* <Image src={this.state.allSelection ? yesImg : noImg} className="btn-qx-img" /> */}
            <Text>&emsp;</Text>
            <AtIcon prefixClass="at-icon" value='check-circle' size='25' color={this.state.allSelect ? '#d81e06' : '#cdcdcd'}></AtIcon>
            <Text>&emsp;全选</Text>
          </View>
          <View className="at-tab-bar__item btn-price" onClick={this.onAllSelection.bind(this)}>
            <View>总计：{this.state.price}</View>
          </View>
          <View className="at-tab-bar__item btn-js">
            <AtButton type='secondary' onClick={this.onSettlement.bind(this)} >结算</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

