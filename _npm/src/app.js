import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Panel, PanelHeader, Group, CellButton, Root, View, List, Cell} from '@vkontakte/vkui'

import SearchPage from './views/search'
import Dict from "./views/dict";

require('./styles/styles.css');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          activeView: 'dict_view'
        }
    }

    render() {
        return (
            <Root activeView={this.state.activeView}>

                <View id="dict_view" activePanel="dict_panel">
                    <Panel id="dict_panel">
                        <Dict/>
                    </Panel>
                </View>

                <View id="search_view" activePanel="search_panel">
                    <Panel id="search_panel">
                        <SearchPage/>
                    </Panel>
                </View>
            </Root>
        );
    }
}

connect.subscribe(
    function(e) {
        // console.log(e);  // TODO: remove

        // if (e['detail'] && e['detail']['type'] === 'VKWebAppGetUserInfoResult') {
            // console.log(e['detail']['data']['first_name']);
        // }
    }
);

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));