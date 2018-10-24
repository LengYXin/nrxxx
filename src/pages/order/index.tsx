import { View, Text, Image,ScrollView } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtCard, AtTabs } from 'taro-ui';
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
    navigationBarTitleText: '订单',
    backgroundTextStyle: "dark",
    enablePullDownRefresh: true,
  }
  state = {
    list: [

    ],
    current: 0,
    tabList: [
      { title: '全部', id: "0" },
      { title: '待支付', id: "190100" },
      { title: '待发货', id: "190101" },
      { title: '待收货', id: "190102" },
      { title: '已完成', id: "190103" },
    ],
  }
  isLoading = true;
  page = {
    rows: 10,
    page: 1
  }
  // 下拉刷新
  onPullDownRefresh() {
    this.getData(true);
  }
  // 滚动加载
  onReachBottom() {
    this.getData();
  }
  componentWillMount() {
  }

  componentDidMount() {
    this.getData(true);
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  /**
    * 加载数据
    * @param refresh 是否刷新
    */
  async getData(refresh = false) {
    // 没有分页数据了
    if (!this.isLoading && !refresh) {
      return console.log("没有数据了");
    }
    if (refresh) {
      this.page.page = 1;
    }
    let list: any[] = this.state.list;
    let status = (this.state.tabList[this.state.current] as any).id;
    const res = await Server.QuerySaleBill({
      status: status,
      ...this.page
    });
    if (refresh) {
      list = res.items;
    } else {
      list = [...list, ...res.items];
    }
    // 添加分页
    if (res.items && res.items.length >= this.page.rows) {
      this.page.page++;
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
    this.setState({ list })
    Taro.stopPullDownRefresh();
  }
  handleClick(current) {
    this.setState({ current }, () => {
      this.getData(true);
    });
  }
  onScrolltoupper() {
    console.log("onScrolltoupper");
  }
  onScrollToLower() {
    this.getData();
  }
  render() {
    return (
      <View >
        <AtTabs
          current={this.state.current}
          scroll
          swipeable={false}
          tabList={this.state.tabList}
          onClick={this.handleClick.bind(this)}>
        </AtTabs>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          enableBackToTop
          style="height:calc(100vh - 49px);"
          scrollTop={0}
          lowerThreshold={20}
          upperThreshold={20}
          onScrollToUpper={this.onScrolltoupper.bind(this)}
          onScrollToLower={this.onScrollToLower.bind(this)}
          >
          {this.state.list.length<=0?<View style="text-align:center;padding-top:30px;font-size:16px;color:#ccc;">您暂时还没有订单</View>: this.state.list.map((data: any, index) => {
          return <View key={index}>
            <View style={{ height: "8px" }}></View>
            <AtCard
              extra={`￥${parseInt(data.amount).toFixed(2)}`}
              title={`订单:${data.no}`}
              note={data.createdTime}
            >
              {data.skus.map((x, i) => {
                return <View className='data-item at-row' key={i}>
                  <View className='at-col at-col-4 data-img'>
                    <Image
                      src={x.thumbUrl}
                    />
                  </View>
                  <View className='at-col at-col-8 data-info'>
                    <View className='at-row data-name'>
                      {x.text}
                    </View>
                    <View className='at-row data-price'>
                      ￥{parseInt(x.amount).toFixed(2)}
                    </View>
                  </View>
                </View>
              })}
            </AtCard>
          </View>
        })}
        <View style={{ height: "20px" }}></View>
        </ScrollView>
      </View>
    )
  }
}

