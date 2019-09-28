import * as React from "react";
import {Panel, PanelHeader, HeaderButton, Input, Button, List, Group, Checkbox} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, DataLoader, possibleSpeechParts, speechPartToTitle} from "../../../base";


class WordLoadedResult extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: props.word,
            translations: props.translations,
            wordSpeechPartToIndexToChecked: {}
        };

        for (let i = 0; i < possibleSpeechParts.length; i++) {
            this.state.wordSpeechPartToIndexToChecked[possibleSpeechParts[i]] = {};
        }

        this.log('WordLoadedResult: constructor with word = ' + props.word
            + ' ts = ' + JSON.stringify(props.translations));
    }

    buildTranslations() {
        var result = {};
        for (let i = 0; i < possibleSpeechParts.length; i++) {
            let currentSpeechPart = possibleSpeechParts[i];
            result[currentSpeechPart] = [];

            Object.keys(this.state.wordIndexToCheckedState[currentSpeechPart]).map((key) => {
                if (this.state.wordIndexToCheckedState[currentSpeechPart][key]) {
                    let word = this.state.translations[currentSpeechPart][key];
                    result[currentSpeechPart].push(word);
                }
            });
        }
        return result;
    }

    static updateWordCheckedState(dict, speechPart, index, val) {
        dict[speechPart][index] = val;
        return dict;
    }

    onWordCheckedStateChanged(e) {
        let speechPart = e.target.dataset.speechPart;
        let i = e.target.dataset.index;
        let val = e.target.checked;

        this.setState((state) => ({
            wordIndexToCheckedState: WordLoadedResult.updateWordCheckedState(
                state.wordSpeechPartToIndexToChecked,
                speechPart, i, val
            )
        }))
    }

    onSaveClick() {
        let translations = this.buildTranslations();
        this.log('Saving + ' + JSON.stringify(translations));

        let params = {
            endpoint: '/words/',
            method: 'POST',
            requestData: {
                word: this.state.word,
                translations: translations
            }
        };

        let successCallback = function(data) {
            alert('ok!');  // TODO: get back to dict view
        };

        let errorCallback = function(error) {
            alert('error!');  // TODO: make it more user friendly
        };

        this.log('Pre requesting server: data = ' + JSON.stringify(params));

        DataLoader.doMakeRequest(params, successCallback, errorCallback, this);
    }

    showTranslationGroup(speechPart, arr) {
        this.log('Generating translation group for ' + speechPart + ' : ' + JSON.stringify(arr));

        return (
            <Group id="group_id" title={speechPartToTitle[speechPart]}>
                <List>
                    {arr.map((el, index) =>
                        <Checkbox
                            data-index={index}
                            data-speech-part={speechPart}
                            onChange={this.onWordCheckedStateChanged.bind(this)}>

                            {el}
                        </Checkbox>)
                    }
                </List>
            </Group>
        );
    }

    render() {
        let translations = this.state.translations;
        return [
            possibleSpeechParts.map((p) =>
                translations[p] ? this.showTranslationGroup(p, translations[p]) : ''),
            <div align='center'>
                <Button onClick={this.onSaveClick.bind(this)}>Сохранить</Button>
            </div>
        ]
    }
}

class WordAddingPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: props.data
        };

        this.log('WordAddingPanel: constructor with word = ' + this.state.word);
    }

    goBack() {
        this.props.goBack()
    }

    render() {
        let requestData = {
            word: this.state.word
        };

        this.log('WordAddingPanel: render for word = ' + this.state.word);
        this.log('WordAddingPanel: render with requestData = ' + JSON.stringify(requestData));

        return (
            <Panel id="word_adding_panel">
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}>
                    Слово {this.state.word}
                </PanelHeader>

                <DataLoader
                    endpoint='/translate/'
                    loaded={
                        (data) => <WordLoadedResult translations={data.translations} word={this.state.word} />
                    }
                    method="POST"
                    requestData={requestData} />
            </Panel>
        )
    }
}

export default WordAddingPanel;