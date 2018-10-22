import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.less'
import { AtTabBar, AtButton } from 'taro-ui';
export default class Index extends Component<any, any> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '详情',
        // enablePullDownRefresh: true,
    }
    render() {
        return (
            <View className='commodity' >
                <Swiper
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    // vertical
                    circular
                    indicatorDots
                    autoplay
                >
                    <SwiperItem itemId="1">
                        <Image
                            style='width: 100%;height: 100%;'
                            src='https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180'
                        />
                    </SwiperItem>
                    <SwiperItem itemId="2">
                        <Image
                            style='width: 100%;height: 100%;'
                            src='https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
                        />
                    </SwiperItem>
                    <SwiperItem itemId="3">
                        <Image
                            style='width: 100%;height: 100%;'
                            src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                        />
                    </SwiperItem>
                </Swiper>
                <View className="commodity-btns at-tab-bar">
                    {/* <View className="at-tab-bar__item"> */}
                    {/* </View> */}
                    <AtButton type='secondary'>购买</AtButton>
                </View>
            </View>
        )
    }
}

