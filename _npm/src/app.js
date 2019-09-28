import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Root, FixedLayout, Tabs, TabsItem, Panel, View} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'
import TestView from './views/test/test'

require('./styles/styles.css');

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'dict_view'
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
                <DictView id="dict_view" onTabChanged={this.onTabChanged.bind(this)}/>
                <TestView id="test_view" onTabChanged={this.onTabChanged.bind(this)}/>
            </Root>
        );
    }
}

connect.send('VKWebAppInit', {});
// connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));