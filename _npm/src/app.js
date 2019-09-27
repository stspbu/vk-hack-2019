import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Root} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'

require('./styles/styles.css');

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'dict_view'
        }
    }

    render() {
        return (
            <Root activeView={this.state.activeView}>
                <DictView id="dict_view"/>
            </Root>
        );
    }
}

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));