import * as React from "react";
import {Cell, View} from "@vkontakte/vkui";
import connect from "@vkontakte/vk-connect"

import {BaseComponent} from "../../base"
import PacksPanel from "./panels/packs";


class PackView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'packs_panel',
        }
    }

    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        if (activePanel === 'packs_panel') {
            connect.send('VKWebAppDisableSwipeBack');
        }
        this.setState({ history, activePanel });
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        if (this.state.activePanel === 'packs_panel') {
            connect.send('VKWebAppEnableSwipeBack');
        }
        this.setState({ history, activePanel });
    }

    render() {
        return (
            <View id='pack_view' activePanel={this.state.activePanel}>
                <PacksPanel
                    id='packs_panel'
                />
            </View>
        )
    }
}

export default PackView;