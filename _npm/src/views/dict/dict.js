import * as React from "react";
import {View} from "@vkontakte/vkui";
import connect from "@vkontakte/vk-connect"

import {BaseComponent} from "../../base"
import DictPanel from "./panels/dict"
import WordAddingPanel from "./panels/word-adding"
import WordPanel from "./panels/word"


class DictView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'dict_panel',
            history: ['dict_panel'],

            selectedWord: null
        }
    }

    /* nav */
    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        if (activePanel === 'dict_panel') {
            connect.send('VKWebAppDisableSwipeBack');
        }
        this.setState({ history, activePanel });
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        if (this.state.activePanel === 'dict_panel') {
            connect.send('VKWebAppEnableSwipeBack');
        }
        this.setState({ history, activePanel });
    }

    changePanel(panel) {
        this.setState({
            activePanel: panel
        })
    }
    /* nav ends */

    onWordAddingClick() {
        this.goForward('word_adding_panel')
    }

    onWordClick(word) {
        this.log('Selected a word ' + JSON.stringify(word));

        this.setState({
            selectedWord: word
        });
        this.goForward('word_panel')
    }

    render() {
        return (
            <View id='dict_view' activePanel={this.state.activePanel}>
                <DictPanel
                    id='dict_panel'
                    onWordAddingClick={this.onWordAddingClick.bind(this)}
                    onWordClick={(word) => this.onWordClick(word)}
                    goBack={this.goBack.bind(this)}
                />
                <WordAddingPanel
                    id='word_adding_panel'
                    goBack={this.goBack.bind(this)}
                />
                <WordPanel
                    id='word_panel'
                    data={this.state.selectedWord}
                    goBack={this.goBack.bind(this)}
                />

                {/*<Panel id='dict_panel'>*/}
                    {/*<Dict*/}
                        {/*onWordAddingClick={this.onWordAddingClick.bind(this)}*/}
                        {/*onWordViewClick={this.onWordViewClick.bind(this)}/>*/}
                {/*</Panel>*/}
                {/*<Panel id='word_panel'>*/}
                {/*</Panel>*/}
            </View>
        )
    }
}

export default DictView;