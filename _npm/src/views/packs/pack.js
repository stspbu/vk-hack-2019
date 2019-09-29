import * as React from "react";
import {Cell, View} from "@vkontakte/vkui";
import connect from "@vkontakte/vk-connect"

import {BaseComponent} from "../../base"
import PacksListPanel from "./panels/pack-list";
import PackPanel from "./panels/pack";
import WordPanel from "../dict/panels/word";


class PackView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'pack_list_panel',
            history: ['pack_list_panel'],

            chosenPack: null,
            chosenWord: null
        }
    }

    /* nav */
    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        if (activePanel === 'pack_list_panel') {
            connect.send('VKWebAppDisableSwipeBack');
        }
        this.setState({ history, activePanel });
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        if (this.state.activePanel === 'pack_list_panel') {
            connect.send('VKWebAppEnableSwipeBack');
        }
        this.setState({ history, activePanel });
    }
    /* end */

    onPackClick(pack) {
        this.log('PackView: changing panel for pack = ' + JSON.stringify(pack));

        this.setState({
            chosenPack: pack
        });
        this.goForward('pack_panel');
    }

    onWordClicked(w) {
        this.log('PackView: changing panel for pack = ' + JSON.stringify(w));

        this.setState({
            chosenWord: w
        });
        this.goForward('word_panel');
    }

    render() {
        return (
            <View id='pack_view' activePanel={this.state.activePanel}>
                <PacksListPanel id='pack_list_panel' onPackClick={this.onPackClick.bind(this)} />
                <PackPanel
                    id='pack_panel'
                    onWordClicked={this.onWordClicked.bind(this)}
                    goBack={this.goBack.bind(this)}
                    pack={this.state.chosenPack}
                />
                <WordPanel
                    id='word_panel'
                    data={this.state.chosenWord}
                    goBack={this.goBack.bind(this)}
                />
            </View>
        )
    }
}

export default PackView;