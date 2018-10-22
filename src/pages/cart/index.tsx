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
    data: [1, 2, 3, 4]
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
          {this.state.data.map((data, index) => {
            return <View className='data-item at-row' key={index}>
              <View className='at-col at-col-4 data-img'>
              <AtIcon prefixClass="at-icon" value='check-circle' size='25' color={this.state.allSelection ? '#d81e06' : '#cdcdcd'}></AtIcon>
                <Image
                  src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                />
              </View>
              <View className='at-col at-col-8 data-info'>
                <View className='at-row data-name'>
                  {'商品'}
                </View>
                <View className='at-row data-price'>
                  ￥ {1000.00}
                </View>
              </View>
            </View>
          })}
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

