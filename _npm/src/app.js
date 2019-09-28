import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import {Tabbar, Epic, TabbarItem, PanelHeader, Panel, View} from '@vkontakte/vkui'

import {BaseComponent} from "./base";
import DictView from './views/dict/dict'
import TestView from './views/test/test'
import PackView from './views/packs/pack'
import ProfileView from  './views/profile/profile'

import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28Write from '@vkontakte/icons/dist/28/write';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';

require('./styles/styles.css');

const availableTabs = [
    {
        id: 'profile',
        name: 'Профиль',
        view: 'profile_view',
        content: <Icon28Profile/>
    },
    {
        id: 'dict',
        name: 'Словарь',
        view: 'dict_view',
        content: <Icon28ArticleOutline/>
    },
    {
        id: 'test',
        name: 'Тесты',
        view: 'test_view',
        content: <Icon28Write/>
    },
    {
        id: 'packs',
        name: 'Наборы',
        view: 'pack_view',
        content: <Icon28ServicesOutline/>
    }
];

class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'dict_view'
        }
    }

    onTabClicked(view) {
        this.log('Changing view to ' + view);

        this.setState({
            'activeStory': view
        })
    }

    render() {
        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    {availableTabs.map((tab) =>
                        <TabbarItem
                            onClick={(e) => this.onTabClicked(tab.view)}
                            selected={this.state.activeStory === tab.view}
                            text={tab.name}
                        >
                            {tab.content}
                        </TabbarItem>
                    )}
                </Tabbar>
            }>
                <ProfileView id="profile_view"/>
                <DictView id="dict_view"/>
                <TestView id="test_view"/>
                <PackView id="pack_view"/>
            </Epic>
        );
    }
}

connect.send('VKWebAppInit', {});
ReactDOM.render(<App/>, document.getElementById('root'));