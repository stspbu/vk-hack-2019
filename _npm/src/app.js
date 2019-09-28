import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Root, FixedLayout, Tabs, TabsItem, Panel, View} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'
import TestView from './views/test/test'
import PackView from './views/packs/packs'
import ProfileView from  './views/profile/profile'

require('./styles/styles.css');

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'profile_view'
        }
    }

    onTabChanged(newTab) {
        this.setState({
            'activeView': newTab.view
        })
    }

    render() {
        return (
            <Root activeView={this.state.activeView}>
                <ProfileView id="profile_view" onTabChanged={this.onTabChanged.bind(this)}/>
                <DictView id="dict_view" onTabChanged={this.onTabChanged.bind(this)}/>
                <TestView id="test_view" onTabChanged={this.onTabChanged.bind(this)}/>
                <PackView id="packs_view" onTabChanged={this.onTabChanged.bind(this)}/>
            </Root>
        );
    }
}

connect.send('VKWebAppInit', {});
ReactDOM.render(<App/>, document.getElementById('root'));