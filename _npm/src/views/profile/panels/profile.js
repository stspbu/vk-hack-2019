import * as React from "react";
import connect from "@vkontakte/vk-connect"

import {ScreenSpinner, PanelHeader, Cell, Avatar, Div, Panel, Footer, Group, List} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";

import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24Info from '@vkontakte/icons/dist/24/info';

class ProfilePanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,

            userData: null,
            stats: null,

            error: null
        };

        this.setPopout(true);

        this.loadVKData();
        setTimeout(function(){
            if (!this.state.isLoaded) {
                this.log('Timeout error');

                this.setState({
                    isLoaded: true,
                    error: 'timeout'
                });
                this.setPopout(false);
            }
        }.bind(this), 5000);
    }

    setPopout(flag) {
        this.props.setPopout(flag);
    }

    loadVKData() {
        connect.subscribe(function(e) {
            this.log('VkConnect answered: ' + JSON.stringify(e));

            if (e['detail']) {
                this.log('VkConnect: has details');

                if (e['detail']['type'] === 'VKWebAppGetUserInfoResult') {
                    let data = e['detail']['data'];
                    this.setState({
                        userData: {
                            name: data.first_name + ' ' + data.last_name,
                            avatar: data.photo_200
                        }
                    });
                    this.loadUserData();
                } else if (['detail']['type'] === 'VKWebAppGetUserInfoFailed') {
                    this.setState({
                        isLoaded: true,
                        error: 'unknown'
                    });
                    this.setPopout(false);
                }
            }
        }.bind(this));
        connect.send('VKWebAppGetUserInfo', {});
    }

    loadUserData() {
        this.log('Requesting user data');

        DataLoader.doMakeRequest({
            endpoint: '/user/',
            method: 'GET'
        }, function(data) {
            this.log('Requested: ' + JSON.stringify(data));

            this.setState({
                stats: data,
                isLoaded: true
            });
            this.setPopout(false);
        }.bind(this), function(error) {
            this.setState({
                isLoaded: false,
                error: error
            });
            this.setPopout(false);
        }.bind(this));
    }

    onAdding() {
        this.props.onWordChoosingClick();
    }

    render() {
        let content;
        if (this.state.isLoaded) {
            if (!this.state.error) {
                content = [
                    <Cell>
                        <Div align="center">
                            <Avatar align="center" src={this.state.userData.avatar} size={80}/>
                        </Div>
                    </Cell>,
                    <Cell >
                        <div align="center">
                            {this.state.userData.name}
                        </div>
                    </Cell>,
                    <Group>
                        <List>
                            <Cell
                                before={<Icon24Favorite/>}
                                asideContent={this.state.stats.rating}>
                                Рейтинг
                            </Cell>
                            <Cell
                                before={<Icon24Info/>}
                                asideContent={<div> {this.state.stats.known_words} / {this.state.stats.all_words}</div>}>
                                Слова
                            </Cell>
                            </List>
                    </Group>,
                    <Footer>Тренируйтесь больше, чтобы повысить свой рейтинг</Footer>
                ]
            } else {
                content = <Div>Что-то пошло не так...</Div>
            }
        } else {
            content = <ScreenSpinner/>
        }

        return (
            <Panel id='profile_panel'>
                <PanelHeader>Профиль</PanelHeader>
                {content}
            </Panel>
        )
    }
}

export default ProfilePanel;