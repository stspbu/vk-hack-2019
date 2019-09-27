import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Panel, PanelHeader, Group, CellButton, Root, View, List, Cell} from '@vkontakte/vkui'

import Dict from './views/dict'

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
            <Root
                onSwipeBack={this.goBack}
                history={this.state.history}
                activeView={this.state.activeView}>
                <View id="search_view" activePanel="search_panel">
                    <Panel id="search_panel">
                        <Search/>
                    </Panel>
                </View>
                <View id="dict_view" activePanel="dict_panel">
                    <Panel id="dict_panel">
                        <Dict/>
                    </Panel>
                </View>
            </Root>
        );
    }
}

connect.subscribe(
    function(e) {
        console.log(e);  // TODO: remove

        if (e['detail'] && e['detail']['type'] === 'VKWebAppGetUserInfoResult') {
            console.log(e['detail']['data']['first_name']);
            // $.ajax({
            //     type: 'POST',
            //     url: 'https://vkhack19.com:11888/message',
            //     data: {'name': e['detail']['data']['first_name'], 'sign': vkSign},
            //     success: function (response) {
            //         alert('Slava molodec!');
            //     },
            //     error: function (response) {
            //         console.log(response.responseText);
            //     }
            // });
        }
    }
);

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));