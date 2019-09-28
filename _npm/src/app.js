import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Root, FixedLayout, Tabs, TabsItem, Panel, View} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'
import TestView from './views/test/test'
import ProfileView from './views/profile/profile'

require('./styles/styles.css');

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'profile_view'
        }
    }

    render() {
        return (
            <Root activeView={this.state.activeView}>
                <DictView id="dict_view"/>
                <TestView id="test_view"/>
                <ProfileView id="profile_view"/>
            </Root>
        );
    }
}

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));