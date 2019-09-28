import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel} from "@vkontakte/vkui";

import Icon24Add from '@vkontakte/icons/dist/24/add';

import {BaseComponent, DataLoader} from "../../../base";
import Bar from '../../../bar'

class Words extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            words: this.props.data
        };
    }

    onWordClick(word) {
        this.log('Words: on word click');
        this.log(word);

        this.props.onWordClick(word);
    }

    render() {
        return (
            <Group title='Добавленные слова'>
                <List>
                    {
                        this.state.words.map((word, index) =>
                            <CellButton level='primary' onClick={() => this.onWordClick(this.state.words[index])}>
                                {word.word}
                            </CellButton>
                    )}
                </List>
            </Group>
        )
    }
}


class DictPanel extends BaseComponent {
    onAdding() {
        this.props.onWordAddingClick();
    }

    render() {
        return (
            <Panel id="dict_panel">
                <PanelHeader
                    left={<HeaderButton key='add' onClick={this.onAdding.bind(this)}><Icon24Add/></HeaderButton>}>
                    Словарь
                </PanelHeader>
                <DataLoader
                    endpoint='/words/'
                    loaded={
                        (data) => <Words data={data} onWordClick={(word) => this.props.onWordClick(word)}/>
                    }
                    method="GET"/>
                <Bar/>
            </Panel>
        )
    }
}

export default DictPanel;