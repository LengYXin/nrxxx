import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtSearchBar, AtTabs } from 'taro-ui';
import Help from '../../utils/help';
import Server from '../../utils/server';
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
    backgroundTextStyle: "dark",
    enablePullDownRefresh: true,
  }
  SearchValue = "";
  state = {
    value: "",
    current: 0,
    tabList: [
      { title: '全部', id: "" },
    ],
    list: [

    ]
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
    this.init()
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onGetUserInfo(info) {
    console.log(info);
  }
  onChange(value) {
    this.setState({ value }, () => {
      // this.getData(true);
      if (this.state.value == "" && this.SearchValue != this.state.value) {
        this.SearchValue = this.state.value;
        this.getData(true);
      }
    })
  }
  onBlur() {
    // if (this.state.value == "" && this.SearchValue != this.state.value) {
    //   this.SearchValue = this.state.value;
    //   this.getData(true);
    // }
    // if (this.SearchValue == ) {
    //   return
    // }
    // this.SearchValue = this.state.value;
    // this.getData(true);
  }
  ononActionClick() {
    if (this.SearchValue == this.state.value) {
      return
    }
    this.SearchValue = this.state.value;
    this.getData(true);
  }
  async init() {
    // await Help.getUserInfo()
    // const user = await Server.login()
    // console.log(user);
    this.getSkuCategoryRoot(() => {
      this.getData(true);
    });
  }
  async getSkuCategoryRoot(callback) {
    let tabList = await Server.SkuCategoryRoot()
    tabList = [...this.state.tabList, ...tabList];
    this.setState({ tabList }, callback);
  }
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
    let categoryId = (this.state.tabList[this.state.current] as any).id;
    const res = await Server.QuerySku({
      filter: this.state.value,
      categoryId: categoryId,
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
  render() {
    return (
      <View className='index' >
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onConfirm={this.ononActionClick.bind(this)}
          onBlur={this.onBlur.bind(this)}
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
          {this.state.list.map((data: any, index) => {
            let tag = "类型";
            const tags = this.state.tabList.filter(x => x.id == data.categoryId);
            tag = tags[0] && tags[0].title;
            return <DataItem data={data} tag={tag} key={index} />
          })}
        </View>
      </View>
    )
  }
}

