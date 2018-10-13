import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import help from '../../utils/help';
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
    navigationBarTitleText: '订单'
  }
  state = {

  }
  componentWillMount() { }

  componentDidMount() {
  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }
  onSubmit() {

  }
  render() {
    console.log(help);
    return (
      <View >
        订单
      </View>
    )
  }
}
