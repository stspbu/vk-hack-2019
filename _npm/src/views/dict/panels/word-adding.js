import * as React from "react";
import {Panel, PanelHeader, HeaderButton, Button, List, Group, Checkbox, Div, Snackbar} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, DataLoader, possibleSpeechParts, getSpeechPartTitle, YandexSign} from "../../../base";
import {TranslationAddingModal} from './base'

import {InfoSnackbar} from "../../../base"


class Word extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: props.word,
            translations: props.translations,
            wordSpeechPartToIndexToChecked: {},
            ownTranslations: {},
            editMode: props.editMode || false,
            hasTranslations: false
        };

        for (let i = 0; i < possibleSpeechParts.length; i++) {
            let sp = possibleSpeechParts[i];

            this.state.wordSpeechPartToIndexToChecked[sp] = {};
            this.state.ownTranslations[sp] = [];

            if (!this.state.translations[sp]) {
                this.state.translations[sp] = [];
            } else {
                this.state.hasTranslations = true;
            }

            if (this.state.editMode) {
                this.state.translations[sp].map((el, index) => {
                    this.state.wordSpeechPartToIndexToChecked[sp][index] = true;
                });
            }
        }

        this.log('Word: constructor with word = ' + props.word
            + ' ts = ' + JSON.stringify(props.translations));
    }

    buildTranslations() {
        let result = {};
        for (let i = 0; i < possibleSpeechParts.length; i++) {
            let currentSpeechPart = possibleSpeechParts[i];
            result[currentSpeechPart] = [];

            Object.keys(this.state.wordSpeechPartToIndexToChecked[currentSpeechPart]).map((key) => {
                if (this.state.wordSpeechPartToIndexToChecked[currentSpeechPart][key]) {
                    let trs = this.state.translations[currentSpeechPart].slice();
                    trs.push.apply(trs, this.state.ownTranslations[currentSpeechPart]);

                    let word = trs[key];
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

        this.setState(function(state) {
            let newWordSpeechPartToIndexToChecked = state.wordSpeechPartToIndexToChecked;
            newWordSpeechPartToIndexToChecked[speechPart][i] = val;

            return {
                wordSpeechPartToIndexToChecked: newWordSpeechPartToIndexToChecked
            }
        });
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
            this.props.navReset(<InfoSnackbar message='Изменения сохранены'/>);
        }.bind(this);

        this.log('Pre requesting server: data = ' + JSON.stringify(params));

        DataLoader.doMakeRequest(params, successCallback, this);
    }

    showTranslationGroup(speechPart, trs, ownTrs) {
        this.log('Generating translation group for ' + speechPart + ' : ' + JSON.stringify(trs));

        let arr = [];
        trs.map((i) => arr.push(i));
        ownTrs.map((i) => arr.push(i));

        if (!arr.length) {
            return null;
        }

        return (
            <Group id="group_id" title={getSpeechPartTitle(speechPart)}>
                <List>
                    {arr.map((el, index) =>
                        <Checkbox
                            checked={this.state.wordSpeechPartToIndexToChecked[speechPart][index]}
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

    /* own translations */
    onAddTranslation(translation, speechPart) {
        translation = translation.toLowerCase().trim();

        this.setState(function(state) {
            let valid = true;
            let trs = state.translations[speechPart].slice();
            trs.push.apply(trs, state.ownTranslations[speechPart]);
            trs.map((item) => {
                if (item === translation) {
                    valid = false;
                }
            });

            let newOwnTrs = state.ownTranslations;
            let newWordSpeechPartToIndexToChecked = state.wordSpeechPartToIndexToChecked;

            if (valid) {
                newOwnTrs[speechPart].push(translation);
                newWordSpeechPartToIndexToChecked[speechPart][trs.length] = true;
            }

            return {
                ownTranslations: newOwnTrs,
                wordSpeechPartToIndexToChecked: newWordSpeechPartToIndexToChecked,
                hasTranslations: state.hasTranslations || valid
            }
        });
        this.props.setupModal(null);
    }

    onCloseModal() {
        this.props.setupModal(null);
    }
    
    onCallAddTranslation() {
        this.props.setupModal(
            <TranslationAddingModal
                onAddTranslation={this.onAddTranslation.bind(this)}
                onCloseModal={this.onCloseModal.bind(this)}
            />);
    }
    /* ends */

    render() {
        let translations = this.state.translations;
        let ownTranslations = this.state.ownTranslations;

        this.log('Word: rendering with ts = ' + JSON.stringify(translations)
            + ' and ownTs = ' + JSON.stringify(ownTranslations));


        let content;
        if (this.state.hasTranslations) {
            content = possibleSpeechParts.map((p) =>
                translations[p] ? this.showTranslationGroup(p, translations[p], ownTranslations[p]) : '')
        } else {
            content = <Div>Нет доступных переводов, вы можете добавить свой перевод</Div>
        }

        return [
            content,
            <Div style={{display: 'flex'}}>
                <Button
                    size='l'
                    level="commerce"
                    onClick={this.onCallAddTranslation.bind(this)}
                    style={{marginRight: 8}}
                    stretched
                >
                    Добавить перевод
                </Button>
                <Button
                    size='l'
                    onClick={this.onSaveClick.bind(this)}
                    style={{marginLeft: 8}}
                    stretched
                >
                    Сохранить
                </Button>
            </Div>
        ]
    }
}

class WordAddingPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: props.data,

            editMode: props.editMode,
            editData: props.editData
        };

        this.log('WordAddingPanel: constructor with word = ' + this.state.word);
    }

    goBack() {
        this.props.goBack()
    }

    setupModal(modal) {
        this.props.setupModal(modal);
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

                {
                    this.state.editMode
                        ? <Word
                            editMode={true}
                            translations={this.state.editData.translations}
                            word={this.state.editData.word}
                            setupModal={this.setupModal.bind(this)}
                            navReset={this.props.navReset.bind(this)}
                        />
                        : <DataLoader
                            endpoint='/translate/'
                            loaded={
                                (data) =>
                                    <Word
                                        translations={data.translations}
                                        word={this.state.word}
                                        setupModal={this.setupModal.bind(this)}
                                        navReset={this.props.navReset.bind(this)}
                                    />
                            }
                            failed={
                                (error) => <Div>Что-то пошло не так...</Div>
                            }
                            method="POST"
                            requestData={requestData}
                        />
                }

                <YandexSign/>
            </Panel>
        )
    }
}

export default WordAddingPanel;