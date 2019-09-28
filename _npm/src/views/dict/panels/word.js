import React from 'react'
import {Panel, PanelHeader, Group, List, Cell} from "@vkontakte/vkui";

import {BaseComponent} from "../../../base";

const SpeechPartToTitle = {
    nouns: 'Существительные',
    verbs: 'Глаголы',
    adjectives: 'Прилагательные',
    adverbs: 'Наречия'
};

class WordPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    makeTranslationGroup(speechPart, arr) {
        this.log('Generating translation group for ' + speechPart + ' : ' + JSON.stringify(arr));

        return (
            <Group title={SpeechPartToTitle[speechPart]}>
                <List>
                    {arr.map((el) => <Cell>{el}</Cell>)}
                </List>
            </Group>
        );
    }

    render() {
        let translations = this.state.data.translations;
        let possibleSpeechParts = ['nouns', 'verbs', 'adjectives', 'adverbs'];

        return (
            <Panel id='word_panel'>
                <PanelHeader>
                    Слово {this.state.data.word}
                </PanelHeader>
                {
                    possibleSpeechParts.map((p) =>
                        translations[p] ? this.makeTranslationGroup(p, translations[p]) : ''
                    )
                }
            </Panel>);
    }
}

export default WordPanel;