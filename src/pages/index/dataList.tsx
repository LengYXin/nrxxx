import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import DataItem from './dataItem';
export default class Index extends Component<{ data: any[] }, any> {
    render() {
        return (
            <View>
                {this.props.data.map((x, i) => <DataItem data={x} key={i} />)}
            </View>
        )
    }
}

