import { Image, Navigator, Text, View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import Help from '../../utils/help';
import Server from '../../utils/server';
import './index.less';
export default class Index extends Component {
  constructor() {
    super()
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }
  state = {
    unAuthorized: true,
    user: {
      avatarUrl: '',
      nickName: '',
    },
    code: '',
  }
  componentWillMount() {

  }

  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() {
    this.onLogin();
  }
  componentDidHide() { }
  /**
   * 登陆
   */
  async  onLogin() {
    if (this.state.unAuthorized) {
      await Help.getUserInfo();
      console.log("授权登陆", Help.data);
      Server.login();
      this.setState({ ...Help.data });
    }
  }
  render() {
    const { user, code, unAuthorized } = this.state;
    return (
      <View className='index' >
        {unAuthorized ?
          <View className="avatar">
            <AtButton type='secondary' openType="getUserInfo" onClick={this.onLogin.bind(this)}>微信登陆</AtButton>
          </View> :
          <View className="avatar">
            <Image className="img" src={user.avatarUrl} />
            <Text>{user.nickName}</Text>
            {/* <Text>{code}</Text> */}
          </View>
        }
        <AtList>
          <Navigator url="/pages/order/index">
            <AtListItem title='我的订单' arrow='right' />
          </Navigator>
          <Navigator url="/pages/address/index">
            <AtListItem title='收货地址' arrow='right' />
          </Navigator>
        </AtList>
      </View>
    )
  }
}

