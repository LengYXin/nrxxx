import { Image, Navigator, View, Text } from '@tarojs/components';
import { AtTag } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro';
// require("taro-ui/dist/weapp/css/index.css")
import './dataItem.less';
export default class Index extends Component<{ data: any,tag:string }, any> {
    render() {
        const { data } = this.props;
        return (
            <Navigator url="/pages/commodity/index">
                <View className='data-item at-row'>
                    <View className='at-col at-col-4 data-img'>
                        <Image
                            // src='https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
                            src={data.thumbUrl}
                        />
                    </View>
                    <View className='at-col at-col-8 data-info'>
                        <View className='at-row data-name'>
                            {data.text}
                        </View>

                        <View className='at-row data-price'>
                            <Text>￥{data.price} </Text> <Text className='origPrice'>￥{data.origPrice}</Text>
                        </View>
                        <View className="data-tag">
                            <AtTag size='small'>{this.props.tag}</AtTag>
                        </View>
                    </View>
                </View>
            </Navigator>
        )
    }
}

