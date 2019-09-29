import React from 'react'
import {Panel, PanelHeader, Group, List, Cell, HeaderButton} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, getSpeechPartTitle, possibleSpeechParts, YandexSign} from "../../../base";

class WordPanel extends BaseComponent {
    /**
     * props.data = {
     *     word: _,
     *     translations: {
     *         nouns: [],
     *         verbs: []
     *     }
     * }
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    goBack() {
        this.props.goBack()
    }

    showTranslationGroup(speechPart, arr) {
        this.log('Generating translation group for ' + speechPart + ' : ' + JSON.stringify(arr));

        if (!arr.length) {
            return null;
        }

        return (
            <Group title={getSpeechPartTitle(speechPart)}>
                <List>
                    {arr.map((el) => <Cell>{el}</Cell>)}
                </List>
            </Group>
        );
    }

    render() {
        let translations = this.state.data.translations;

        return (
            <Panel id='word_panel'>
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}>
                    Слово {this.state.data.word}
                </PanelHeader>
                {
                    possibleSpeechParts.map((p) =>
                        translations[p] ? this.showTranslationGroup(p, translations[p]) : ''
                    )
                }
                <YandexSign/>
            </Panel>);
    }
}

export default WordPanel;