import React, { Component } from 'react';
import {
    Text, View, Image, Share,
    TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
    LayoutAnimation, NativeModules,
    PanResponder, Animated,
    Dimensions
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

class MySpace extends Component {
    state = { menuOpened: false };
    translatorY = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        //onStartShouldSetPanResponder: () => true,
        //onMoveShouldSetResponderCapture: () => true,
        //onMoveShouldSetPanResponderCapture: () => true,
        // onPanResponderMove: (event, gesture) => {
        //     this.translatorY.setValue({ x: 0, y: gesture.dy });
        // },
        onPanResponderGrant: (e, gestureState) => {
            this.translatorY.setOffset({ x: 0, y: this.translatorY.y._value });
            this.translatorY.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event([
            null,
            {
                dx: 0,
                dy: this.translatorY.y
            },
        ]),
        onPanResponderRelease: (e, { vy, dy }) => {
            this.translatorY.flattenOffset();
            if (dy < -0.2 * ScreenHeight || vy <= -0.5) {
                Animated.spring(this.translatorY, {
                    toValue: { x: 0, y: 0 },
                    tension: 20,
                    friction: 10
                    //useNativeDriver: true
                }).start(() => {
                    //this.translatorY.setOffset({ x: 0, y: 0 });
                    console.log(this.translatorY.y);
                    this.setState({ menuOpened: false });
                });
            }
            else if (dy > 0.1 * ScreenHeight || vy >= 0.5) {
                Animated.spring(this.translatorY, {
                    toValue: { x: 0, y: 0.6 * ScreenHeight },
                    tension: 20,
                    friction: 10
                    //duration: 600
                    //useNativeDriver: true
                }).start(() => {
                    //this.translatorY.setOffset({ x: 0, y: 0.5 * ScreenHeight });
                    console.log(this.translatorY.y);
                    this.setState({ menuOpened: true });
                });
            }
            else {
                Animated.spring(this.translatorY.y, {
                    toValue: 0,
                    bounciness: 2,
                    //useNativeDriver: true
                }).start(() => {
                    //this.translatorY.setOffset({ x: 0, y: 0 });
                    console.log(this.translatorY.y);
                });
            }
        }
    });
    getCardStyle() {
        const opacity = this.translatorY.y.interpolate({
            inputRange: [0, 0.25, 0.6 * ScreenHeight],
            outputRange: [0, 0.3, 1]
            // inputRange: [0, 0.7, 1],
            // outputRange: [1, 0, 1]
        });
        const depthScale = this.translatorY.y.interpolate({
            inputRange: [0, 0.6 * ScreenHeight],
            outputRange: [0.7 * ScreenHeight, 0],
            //extrapolate: 'clamp'
        });
        return {
            //...position.getLayout(),
            opacity,
            transform: [{ translateX: depthScale }]
            //marginLeft: depthScale
        };
    }
    getCardStyle2() {
        const opacity = this.translatorY.y.interpolate({
            inputRange: [0, 0.25, 0.6 * ScreenHeight],
            outputRange: [0, 0.3, 1]
            // inputRange: [0, 0.7, 1],
            // outputRange: [1, 0, 1]
        });
        const depthScale = this.translatorY.y.interpolate({
            inputRange: [0, 0.6 * ScreenHeight],
            outputRange: [-0.7 * ScreenHeight, 0]
        });
        return {
            //...position.getLayout(),
            opacity,
            transform: [{ translateX: depthScale }]
            //marginLeft: depthScale
        };
    }
    getCardStyle3() {
        const opacity = this.translatorY.y.interpolate({
            inputRange: [0, 0.25, 0.6 * ScreenHeight],
            outputRange: [0, 0.3, 1]
            // inputRange: [0, 0.7, 1],
            // outputRange: [1, 0, 1]
        });
        const depthScale = this.translatorY.y.interpolate({
            inputRange: [0, 0.6 * ScreenHeight],
            outputRange: [-0.8 * ScreenHeight, 0]
        });
        return {
            //...position.getLayout(),
            opacity,
            transform: [{ translateY: depthScale }]
            //marginLeft: depthScale
        };
    }
    getCardStyle4() {
        const opacity = this.translatorY.y.interpolate({
            inputRange: [0, 0.25, 0.6 * ScreenHeight],
            outputRange: [0, 0.3, 1]
            // inputRange: [0, 0.7, 1],
            // outputRange: [1, 0, 1]
        });
        const depthScale = this.translatorY.y.interpolate({
            inputRange: [0, 0.6 * ScreenHeight],
            outputRange: [0.8 * ScreenHeight, 0]
        });
        return {
            //...position.getLayout(),
            opacity,
            transform: [{ translateY: depthScale }]
            //marginLeft: depthScale
        };
    }
    buttonClickFunc() {
        console.log('translatorY_Value: ', this.translatorY.y);
        if (this.translatorY.y._value === 0 || this.translatorY.y._value < 2) {
            Animated.spring(this.translatorY, {
                toValue: { x: 0, y: 0.6 * ScreenHeight },
                tension: 20,
                friction: 10
                //bounciness: 2
                //useNativeDriver: true
            }).start(() => {
                //this.translatorY.setOffset({ x: 0, y: 0.5 * ScreenHeight });
                console.log(this.translatorY.y);
            });
        }
        else {
            Animated.spring(this.translatorY, {
                toValue: { x: 0, y: 0 },
                tension: 20,
                friction: 10
                //useNativeDriver: true
            }).start(() => {
                //this.translatorY.setOffset({ x: 0, y: 0 });
                console.log(this.translatorY.y);
            });
        }
    }
    ShareMessage = () => {
        Share.share(
            {

                message: 'https://www.geeksforgeeks.org/',
                title: "Let's have a have a party to night",
                url: 'http://codingmiles.com'

            },
            {
                dialogTitle: 'Share via',
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter',
                    'com.apple.uikit.activity.mail'
                ],
                tintColor: 'green'
            })
            .then(result => console.log('result is', result))
            .catch(errorMsg => console.log('errorMsg is', errorMsg));
        console.log('finshed sharing');
    }
    ReferAFriend = () => {
        Share.share(
            {

                message: 'https://www.youtube.com/watch?v=sSMqJzDt5w0',
                title: "Let's have a have a party to night",
                url: 'http://codingmiles.com'

            },
            {
                dialogTitle: 'Share via',
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter',
                    'com.apple.uikit.activity.mail'
                ],
                tintColor: 'green'
            })
            .then(result => console.log('result is', result))
            .catch(errorMsg => console.log('errorMsg is', errorMsg));
        //console.log('finshed sharing');
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <View style={{ flex: 1 }}> */}
                <View style={styles.wifiAndPrinterCont}>
                    <View style={styles.wifiRowStyle}>
                        <View style={styles.keyContainer}>
                            <Image style={{ height: 40, width: 40 }} source={require('../images/wifi2.png')} />
                            <Text style={styles.wifiTextStyle}>WiFi Password</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            <Text>qserf12TY</Text>
                        </View>
                    </View>
                    <View style={styles.wifiRowStyle}>
                        <View style={styles.keyContainer}>
                            <Image style={{ height: 40, width: 40 }} source={require('../images/printer3.png')} />
                            <Text style={styles.wifiTextStyle} >Printer ID</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            <Text>ADU97F</Text>
                        </View>
                    </View>

                </View>
                {/* </View> */}
                <Animated.View
                    style={[styles.menuViewStyle, { transform: [{ translateY: this.translatorY.y }] }]}
                    //style={...this.translatorY.getLayout()}
                    {...this.panResponder.panHandlers}
                >
                    <TouchableWithoutFeedback onPress={() => this.buttonClickFunc()}>
                        <View style={styles.buttonViewStyle}>
                            <Icon
                                name='unfold-more'
                                size={36}
                                style={styles.buttonTextStyle}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                {/* <View style={styles.thumbnailContRow}> */}
                < View
                    style={[styles.thumbnailContRow]}
                >

                    <Animated.View style={[styles.thumbImageStyle, this.getCardStyle4()]}>
                        <TouchableOpacity onPress={() => this.ShareMessage()}>
                            <Image style={styles.imageStyle} source={require('../images/addGuest.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.thumbImageStyle, this.getCardStyle2()]}>
                        <TouchableOpacity onPress={() => this.ReferAFriend()}>
                            <Image style={styles.imageStyle} source={require('../images/referFriend.png')} />
                        </TouchableOpacity>
                    </Animated.View>

                </View>
                <View style={styles.thumbnailContRow}>
                    <Animated.View style={[styles.thumbImageStyle, this.getCardStyle()]}>
                        <TouchableOpacity onPress={() => { Actions.Help(); }}>
                            <Image style={styles.imageStyle} source={require('../images/amenities.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.thumbImageStyle, this.getCardStyle3()]}>
                        <TouchableOpacity onPress={() => { Actions.Support(); }}>
                            <Image style={styles.imageStyle} source={require('../images/help.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View >
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    wifiAndPrinterCont: {
        flex: 1 / 3,
        justifyContent: 'center',
        //padding: 6,
        paddingTop: 20
    },
    wifiRowStyle: {
        flexDirection: 'row',
        //marginTop: 10,
        marginTop: 2,
        backgroundColor: 'white'
    },
    wifiTextStyle: {
        color: 'black',
        marginLeft: 10
    },
    keyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        flex: 1 / 2
    },
    valueContainer: {
        flex: 1 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: '#00695C',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 50
    },
    thumbContainer: {
        flex: 2 / 3
    },
    thumbnailContRow: {
        flexDirection: 'row'
    },
    thumbImageStyle: {
        flex: 1 / 2
    },
    imageStyle: {
        width: ScreenWidth / 2,
        height: 140
    },
    footerContainer: {
        backgroundColor: '#FAFAFA',
        justifyContent: 'flex-end'
    },
    buttonViewStyle: {
        //position: 'absolute',
        //height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 4,
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: '#00695C',
        //borderRadius: 50,
        // backgroundColor: '#455A64',
        backgroundColor: '#795548',
        height: ScreenHeight / 11,
        width: ScreenWidth
    },
    buttonStyle: {
        // height: ScreenHeight / 10,
        // width: ScreenWidth / 4,
        // backgroundColor: '#455A64',
    },
    buttonTextStyle: {
        fontSize: 36,
        color: 'white'
    }
};

export default MySpace;
