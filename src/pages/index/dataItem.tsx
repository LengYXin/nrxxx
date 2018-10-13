import { Image, Navigator, View, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
// require("taro-ui/dist/weapp/css/index.css")
import './dataItem.less';
export default class Index extends Component<{ data: any }, any> {
    render() {
        const { data } = this.props;
        return (
            <Navigator url="/pages/commodity/index">
                <View className='data-item at-row'>
                    <View className='at-col at-col-4'>
                        <Image
                            style='width: 100%;height: 100px;background: #fff;'
                            src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                        />
                    </View>
                    <View className='at-col at-col-8 data-info'>
                        <View className='at-row'>
                            <View className='at-col at-col-2'>
                                名称：
                            </View>
                            <View className='at-col at-col-10 data-name'>
                                {data.add}
                            </View>
                        </View>
                        <View className='at-row'>
                            <View className='at-col at-col-2'>
                                价格：
                            </View>
                            <View className='at-col at-col-10 '>
                                {data.add}
                            </View>
                        </View>
                        <View className='at-row'>
                            <View className='at-col at-col-2'>
                                库存：
                            </View>
                            <View className='at-col at-col-10 '>
                                {data.add}
                            </View>
                        </View>
                    </View>
                </View>
            </Navigator>
        )
    }
}

