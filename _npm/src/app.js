import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Panel, PanelHeader, Group, CellButton, Root, View, List, Cell} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'

require('./styles/styles.css');

class SearchView extends React.Component {
    render() {
        return (

                <View id="search_view" activePanel="search_panel">
                </View>
        )
    }
}

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