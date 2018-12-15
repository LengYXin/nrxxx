import { Image, Swiper, SwiperItem, View, Text, Navigator } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton, AtTag, AtInputNumber, AtList, AtListItem } from 'taro-ui';
import cart from '../../utils/cart';
import Server from '../../utils/server';
import './index.less';
import 'taro-ui/dist/weapp/css/index.css';
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
    state: any = {
        data: {

        },
        number: 1,
    }
    async componentWillMount() {
        const res = await Server.GetSkuDetail(this.$router.params.id)
        this.setState({
            data: res
        })
        console.log(res);
    }
    onAddCart() {
        const { id, text, price, origPrice, categoryText, thumbUrl } = this.state.data;
        cart.addCart({
            id,
            text,
            price,
            origPrice,
            number: this.state.number,
            thumbUrl,
            select: true,
        })
    }
    handleChange(number) {
        this.setState({ number: number })
    }
    render() {
        const { text, price, origPrice, description, categoryText, thumbUrl } = this.state.data;
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
                            style='width: 100%;height: 100%;background:#eee'
                            src={thumbUrl}
                        />
                    </SwiperItem>
                </Swiper>
                <View className='at-article__h1'>
                    {text} <AtTag size='small'>{categoryText}</AtTag>
                </View>
                <View className='at-article__h3'>
                    <Text>价格：</Text><Text className="data-price">￥{price}  </Text> <Text className='origPrice'>￥{origPrice}</Text>
                </View>
                <View className='at-article__p'>
                    描述： {description}
                </View>
                <View className="commodity-btns at-tab-bar">
                    <View className="commodity-btn-bo">
                        <AtInputNumber
                            min={1}
                            max={99999}
                            step={1}
                            value={this.state.number}
                            onChange={this.handleChange.bind(this)}
                        />
                        <View style="padding-left:50px">
                            <Navigator url="/pages/cart/index" open-type="switchTab">
                                购物车>
                            </Navigator>
                        </View>
                    </View>
                    <AtButton type='secondary' onClick={this.onAddCart.bind(this)}>加入购物车</AtButton>
                </View>
            </View>
        )
    }
}

