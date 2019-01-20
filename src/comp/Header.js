/* @flow */

import React, { Component } from 'react';
import {

    Image, Platform, StatusBar, Dimensions
} from 'react-native';
import { Header as NBHeader, Left, Icon, Button, Body, Right, Title, Subtitle, Text, View, StyleProvider } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
    //
    // onPressBack(){
    //  doActionsBack
    // }


    renderLeftSection(props) {

        const hasTitle = props.hasTitle;
        const hasSubtitle = props.hasSubtitle;
        const hasBackButton = props.hasBackButton;


        // check if hasTitle or hasSubtitle is defined
        if (hasTitle || hasSubtitle) {
            return this.renderBackButton();
        } else if (hasBackButton) {
            return this.renderBackButton();
        } else {
            return this.renderTitle(props);
        }

        // else if(Platform.OS === 'android'){
        //   // show the logo
        //
        //     return this.renderLogo();
        //
        //
        //
        //
        // }
        // else{
        //   // show the logo
        //   if(Platform.OS === 'ios'){
        //     return(
        //       <View>
        //         {this.renderLogo()}
        //         </View>
        //     );
        //
        //   }
        //
        // }

    }


    renderBackButton() {
       
        return (
            <Button transparent onPress={() => { Actions.pop() }}>
                <Image source={require('../assets/ios_back.png')} style={[styles.defaultColor, styles.imgSize]} />
            </Button>

        );
    }
    renderCenterSection(props) {
        const hasTitle = props.hasTitle;
        const hasSubtitle = props.hasSubtitle;

        if (hasTitle) {
            //show the title
            return (
                <Body style={styles.hasTitleAndSubtitle}>
                    <Title style={[styles.defaultColor, styles.title]}>{props.headerTitle}</Title>
                </Body>
            );
        }
        else if (hasSubtitle) {
            // show the title and subtitle
            return (
                <Body style={styles.hasTitleAndSubtitle}>
                    <Title style={[styles.defaultColor, styles.hasSubtitle]}>{props.headerTitle}</Title>
                    <Subtitle style={[styles.defaultColor, styles.subtitle]}>{props.headerSubtitle} </Subtitle>
                </Body>
            );
        }

    }



    // renderLogo(){
    //   return(
    //     <View style={{paddingTop : 10}}>
    //
    // </View>
    //   );
    // }


    renderTitle(props) {
        return (
            <Body style={{ justifyContent: 'center' }}>
                <Title style={[styles.defaultColor, styles.singleTitle]}>{props.headerTitle}</Title>
            </Body>
        );
    }

    render() {
        return (


            <NBHeader
                style={styles.header}
                hasSubtitle={this.props.hasSubtitle}
                androidStatusBarColor="#333333"
                //androidStatusBarColor={Theme.headerAndroidStatusBarColor}
                noShadow
                hasTabs
                hasSegment
            >

                <Left>
                    {this.renderLeftSection(this.props)}

                </Left>


                {this.renderCenterSection(this.props)}


                {/* <Right>
          {this.renderRightSection(this.props)}
        </Right> */}

            </NBHeader>


        );
    }
}

const styles = {
    header: {
        backgroundColor: '#333333',



    },


    statusBarColor: {
        backgroundColor: '#333333'
    },
    defaultColor: {
        fontWeight: 'normal',

    },
    singleTitle: {
        fontWeight: '900',

    },
    subtitle: {
        fontSize: 10,
        paddingRight: 2
    },
    hasSubtitle: {
        fontSize: 10,
    },

    title: {
        fontSize: 12,
    },
    hasTitleAndSubtitle: {
        flex: 3
    },
    imgSize: {
        width: 20,
        height: 20
    }
};
