import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import './index.less';
import { AtForm, AtInput, AtButton, AtTextarea } from 'taro-ui';
import help from '../../utils/help';
import Server from '../../utils/server';

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
  address = help.data.address || {};
  componentWillMount() { }

  componentDidMount() {
    // help.chooseAddress();
  }
  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }
  async onSubmit(e) {
    // console.log(this.address);
    if (this.address.userName == "" || this.address.userName == null) {
      return Taro.showToast({ title: "请输入收货人姓名", icon: "none" })
    }
    if (this.address.telNumber == "" || this.address.telNumber == null) {
      return Taro.showToast({ title: "请输入联系电话", icon: "none" })
    }
    if (this.address.address == "" || this.address.address == null) {
      return Taro.showToast({ title: "请输入详细地址", icon: "none" })
    }
    await Server.CreateDeliveryAddress({
      isDefault: true,
      fullValue: this.address.address,
      contactMan: this.address.userName,
      contactPhone: this.address.telNumber
    })
    Taro.showToast({ title: "" })
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  }
  handleChange(type, e) {
    let value = e;
    if (type == 'address') {
      value = e.detail.value;
    }
    this.address[type] = value
    // console.log(e,type);
  }
  async chooseAddress() {
    const res = await help.chooseAddress();
    this.address = {
      userName: res.userName,
      telNumber: res.telNumber,
      address: res.address
    }
    this.setState(this.address)
  }
  render() {

    return (
      <View >
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
          <AtInput
            name='userName'
            title='姓名'
            type='text'
            placeholder='输入姓名'
            value={this.state.userName}
            onChange={this.handleChange.bind(this, 'userName')}
          />
          <AtInput
            name='telNumber'
            title='电话'
            type='phone'
            placeholder='输入电话'
            value={this.state.telNumber}
            onChange={this.handleChange.bind(this, 'telNumber')}
          />
          <View style={{ paddingRight: "32rpx" }}>
            <AtTextarea
              value={this.state.address}
              onChange={this.handleChange.bind(this, 'address')}
              maxlength='200'
              placeholder='详细地址'
            />
          </View>
        </AtForm>
        <View className="btn">
          {this.state.userName == '' || this.state.userName == null ? <AtButton type='secondary' onClick={this.chooseAddress.bind(this)}>使用微信地址</AtButton> : null}
          <View className="br"></View>
          <AtButton type='secondary' onClick={this.onSubmit.bind(this)}>保存</AtButton>
        </View>
      </View>
    )
  }
}

