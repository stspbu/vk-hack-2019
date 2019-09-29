import * as React from "react";
import {ModalPage, ModalRoot, View, ModalPageHeader, Cell, HeaderButton, Input} from "@vkontakte/vkui";
import {Select, Div, Button} from "@vkontakte/vkui"

import connect from "@vkontakte/vk-connect"

import Icon24Cancel from "@vkontakte/icons/dist/24/cancel"
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss"
import {IS_PLATFORM_ANDROID, IS_PLATFORM_IOS} from '@vkontakte/vkui/dist/lib/platform';

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

            selectedWord: null,

            editMode: false,
            editData: null,

            snackbar: null,
            modal: null
        }
    }

    /* nav */
    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        if (activePanel === 'dict_panel') {
            this.navReset();
        } else {
            this.setState({history, activePanel});
        }
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        this.setState({ history, activePanel });
    }

    navReset(withSnackbar) {
        this.setState({
            history: ['dict_panel'],
            activePanel: 'dict_panel',
            snackbar: withSnackbar || null,
            editMode: false,
            editData: null
        });
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

    onWordEditingStart(wordData) {
        this.log('Entered editing mode for word = ' + JSON.stringify(wordData));

        this.setState({
            selectedWord: wordData.word,
            editMode: true,
            editData: wordData,
            activePanel: 'word_adding_panel'
        });
    }

    setupModal(modal) {
        this.log('DictView: changing active modal');

        this.setState({
            modal: modal
        })
    }

    render() {
        return (
            <View id='dict_view' activePanel={this.state.activePanel} modal={this.state.modal}>
                <DictPanel
                    id='dict_panel'
                    onWordChoosingClick={this.onWordChoosingClick.bind(this)}
                    onWordClick={(word) => this.onWordClick(word)}
                    goBack={this.goBack.bind(this)}
                    snackbar={this.state.snackbar}
                />
                <WordPanel
                    id='word_panel'
                    data={this.state.selectedWord}
                    onWordEditingStart={(word) => this.onWordEditingStart(word)}
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
                    editMode={this.state.editMode}
                    editData={this.state.editData}
                    goBack={this.goBack.bind(this)}
                    navReset={this.navReset.bind(this)}
                    setupModal={this.setupModal.bind(this)}
                />
            </View>
        )
    }
}

export default DictView;