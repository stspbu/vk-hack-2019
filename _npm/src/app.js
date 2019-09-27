import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import $ from 'jquery'
import {Cell, Panel, Root, View} from '@vkontakte/vkui'

import SearchPage from './views/search'
import Dict from "./views/dict";



require('./styles/styles.css');

class App extends React.Component {

    state = {
        activeView: 'search_view',
        history: ['search_view']
    };

    goBack = () => {
        const history = [...this.state.history];
        history.pop();
        const activeView = history[history.length - 1];
        if (activeView === 'search_view') {
          connect.send('VKWebAppDisableSwipeBack');
        }
        this.setState({ history, activeView });
    };

    goForward = (activeView) => {
        const history = [...this.state.history];
        history.push(activePanel);
        if (this.state.activeView === 'search_view') {
          connect.send('VKWebAppEnableSwipeBack');
        }
        this.setState({ history, activeView });
    };


    render() {
        return (
            <Root
                onSwipeBack={this.goBack}
                history={this.state.history}
                activeView={this.state.activeView}>
                <View id="search_view" activePanel="search_panel">
                    <Panel id="search_panel">
                        <SearchPage/>
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
            //     data: {'name': e['detail']['data']['first_name']},
            //     success: function (response) {
            //         alert('Slava molodec!');
            //     },
            //     error: function (response) {
            //         console.log(response.responseText);
            //     }
            // });
        } else {
            console.log(e);
        }
    }
);

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));