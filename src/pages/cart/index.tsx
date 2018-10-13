import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.less'
import { AtButton, AtIcon } from 'taro-ui';
import yesImg from '../../icon/303正确、完成-圆框.png';
import noImg from '../../icon/303正确、完成-线性圆框.png';
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
    allSelection: false,
    price: 0,
    data: []
  }
  componentWillMount() { }

  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onAllSelection() {
    const allSelection = this.state.allSelection;
    this.setState({ allSelection: !allSelection })
  }
  render() {

    return (
      <View className='index' >
        <View>
          
        </View>
        <View className="fixed-btns at-tab-bar">
          <View className="btn-qx" onClick={this.onAllSelection.bind(this)}>
            {/* <Image src={this.state.allSelection ? yesImg : noImg} className="btn-qx-img" /> */}
            <Text>&emsp;</Text>
            <AtIcon prefixClass="at-icon" value='check-circle' size='25' color={this.state.allSelection ? '#d81e06' : '#cdcdcd'}></AtIcon>
            <Text>&emsp;全选</Text>
          </View>
          <View className="at-tab-bar__item btn-price" onClick={this.onAllSelection.bind(this)}>
            <View>总计：{this.state.price}</View>
          </View>
          <View className="at-tab-bar__item btn-js">
            <AtButton type='secondary' >结算</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

