import * as React from "react";
import {View} from "@vkontakte/vkui";
import connect from "@vkontakte/vk-connect"

import {BaseComponent} from "../../base"
import DictPanel from "./panels/dict"
import WordChoosingPanel from "./panels/word-choosing"
import WordPanel from "./panels/word"
import WordAddingPanel from "./panels/word-adding"


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
    /* nav ends */

    onWordChoosingClick() {
        this.goForward('word_choosing_panel')
    }

    onWordClick(word) {
        this.log('Selected a word ' + JSON.stringify(word));

        this.setState({
            selectedWord: word
        });
        this.goForward('word_panel')
    }

    onWordEnteredClick(word) {
        this.log('Entered word = ' + JSON.stringify(word));
        this.setState({
            selectedWord: word
        });
        this.goForward('word_adding_panel');
    }

    render() {
        return (
            <View id='dict_view' activePanel={this.state.activePanel}>
                <DictPanel
                    id='dict_panel'
                    onWordChoosingClick={this.onWordChoosingClick.bind(this)}
                    onWordClick={(word) => this.onWordClick(word)}
                    goBack={this.goBack.bind(this)}
                />
                <WordPanel
                    id='word_panel'
                    data={this.state.selectedWord}
                    goBack={this.goBack.bind(this)}
                />
                <WordChoosingPanel
                    id='word_choosing_panel'
                    goBack={this.goBack.bind(this)}
                    onWordEnteredClick={this.onWordEnteredClick.bind(this)}
                />
                <WordAddingPanel
                    id='word_adding_panel'
                    data={this.state.selectedWord}
                    goBack={this.goBack.bind(this)}
                />
            </View>
        )
    }
}

export default DictView;