import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import './app.less';
import Index from './pages/index';
import help from './utils/help';
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/address/index',
      'pages/order/index',
      'pages/commodity/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "icon/204首页-线性.png",
          selectedIconPath: "icon/204首页.png"
        },
        {
          pagePath: "pages/cart/index",
          text: "购物车",
          iconPath: "icon/05采购-线性.png",
          selectedIconPath: "icon/05采购.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "icon/224用户-线性.png",
          selectedIconPath: "icon/224用户.png"
        }
      ]
    }
  }
  componentDidMount() {
  
  }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
