import React from 'react'
import {Panel, PanelHeader, Group, List, Cell, HeaderButton} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, speechPartToTitle, possibleSpeechParts} from "../../../base";

class WordPanel extends BaseComponent {
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
            <Group title={speechPartToTitle[speechPart]}>
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
            </Panel>);
    }
}

export default WordPanel;