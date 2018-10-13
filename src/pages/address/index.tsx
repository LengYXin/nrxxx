import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtForm, AtInput, AtButton, AtTextarea } from 'taro-ui';
import help from '../../utils/help';

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '收货地址'
  }
  state = {
    userName: help.data.address.userName || "",
    telNumber: help.data.address.telNumber || "",
    address: help.data.address.address || ""
  }
  componentWillMount() { }

  componentDidMount() {
    // help.chooseAddress();
  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }
  onSubmit() {

  }
  handleChange() { }
  async chooseAddress() {
    const res = await help.chooseAddress();
    this.setState({
      userName: res.userName,
      telNumber: res.telNumber,
      address: res.address
    })
  }
  render() {

    return (
      <View >
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
          <AtInput
            name='value1'
            title='姓名'
            type='text'
            placeholder='输入姓名'
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value1'
            title='电话'
            type='phone'
            placeholder='输入电话'
            value={this.state.telNumber}
            onChange={this.handleChange.bind(this)}
          />
          <AtTextarea
            value={this.state.address}
            onChange={this.handleChange}
            maxlength='200'
            placeholder='详细地址'
          />
        </AtForm>
        <View className="btn">
          <AtButton type='secondary' onClick={this.chooseAddress.bind(this)}>使用微信地址</AtButton>
          <View className="br"></View>
          <AtButton type='secondary' onClick={this.chooseAddress.bind(this)}>保存</AtButton>
        </View>
      </View>
    )
  }
}

