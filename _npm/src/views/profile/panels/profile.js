import * as React from "react";
import connect from "@vkontakte/vk-connect"

import {ScreenSpinner, PanelHeader, Cell, Avatar, Div, Panel} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";

class ProfilePanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,

            userData: null,
            stats: null,

            error: null
        };

        this.loadVKData();
        setTimeout(function(){
            if (!this.state.isLoaded) {
                this.log('Timeout error');

                this.setState({
                    isLoaded: true,
                    error: 'timeout'
                })
            }
        }.bind(this), 5000);
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
                    })
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
        }.bind(this), function(error) {
            this.setState({
                isLoaded: false,
                error: error
            });
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
                    <Cell><Avatar src={this.state.userData.avatar} size={80}/></Cell>,
                    <Cell>{this.state.userData.name}</Cell>,
                    <Cell>{this.state.stats.known_words}</Cell>,
                    <Cell>{this.state.stats.all_words}</Cell>,
                    <Cell>{this.state.stats.rating}</Cell>
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