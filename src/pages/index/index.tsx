import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtSearchBar, AtTabs } from 'taro-ui';
import Help from '../../utils/help';
import DataItem from './dataItem';
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
    navigationBarTitleText: '首页',
    // enablePullDownRefresh: true,
  }
  SearchValue = "";
  state = {
    value: "",
    current: 0,
    tabList: [
      { title: '全部' },
      { title: '牛肉' },
      { title: '猪肉' },
      { title: '羊肉' },
      { title: '狗肉' },
    ],
    list: [
      [],
    ]
  }
  componentWillMount() {
    this.getData(0);
  }

  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onGetUserInfo(info) {
    console.log(info);
  }
  onChange(value) {
    this.setState({ value })
  }
  ononActionClick() {
    if (this.SearchValue == this.state.value) {
      return
    }
    this.SearchValue = this.state.value;
    this.getData(this.state.current);
  }
  async getData(current) {
    let list = this.state.list;
    const res = await Help.request({ url: "/5a9130e5a2f38c18c96bce97/example/mock#!method=get" });
    list[current] = res;
    this.setState({ list })
  }
  handleClick(current) {
    this.getData(current);
    this.setState({ current });
  }
  render() {
    return (
      <View className='index' >
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onConfirm={this.ononActionClick.bind(this)}
          onBlur={this.ononActionClick.bind(this)}
          onActionClick={this.ononActionClick.bind(this)}
        />
        <AtTabs
          current={this.state.current}
          scroll
          swipeable={false}
          tabList={this.state.tabList}
          onClick={this.handleClick.bind(this)}>
        </AtTabs>
        <View className="index-list">
          {this.state.list[this.state.current].map((data, index) => {
            return <DataItem data={data} key={index} />
          })}
        </View>
      </View>
    )
  }
}

