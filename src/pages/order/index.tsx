import { View, Image } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtCard } from 'taro-ui';
import Help from '../../utils/help';
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
    navigationBarTitleText: '订单',
    backgroundTextStyle: "dark",
    enablePullDownRefresh: true,
  }
  state = {
    list: [

    ]
  }
  // 下拉刷新
  onPullDownRefresh() {
    this.getData(0, false, false);
  }
  // 滚动加载
  onReachBottom() {
    this.getData(0, true);
  }
  componentWillMount() {
    this.getData(0);
  }

  componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  async getData(current, push = false, loading = true) {
    let list: any[] = this.state.list;
    const res = await Help.request({ url: "/5a9130e5a2f38c18c96bce97/example/mock#!method=get" }, loading);
    if (push) {
      list = [...list, ...res];
    } else {
      list = res;
    }
    Taro.stopPullDownRefresh();
    this.setState({ list }, () => {
    })
  }
  render() {
    return (
      <View >
        {this.state.list.map((data: any, index) => {
          return <View key={index}>
            <AtCard
              title='订单:12312312312312'
            >
              <View className='data-item at-row'>
                <View className='at-col at-col-4 data-img'>
                  <Image
                    src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                  />
                </View>
                <View className='at-col at-col-8 data-info'>
                  <View className='at-row data-name'>
                    {data.add}
                  </View>
                  <View className='at-row data-price'>
                    ￥ {1000.00}
                  </View>
                </View>
              </View>
            </AtCard>
            <View style={{ height: "5px" }}></View>
          </View>
        })}
      </View>
    )
  }
}

