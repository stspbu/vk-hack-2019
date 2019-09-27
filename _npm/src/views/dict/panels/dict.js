import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel} from "@vkontakte/vkui";

import Icon24Add from '@vkontakte/icons/dist/24/add';

import {BaseComponent, DataLoader} from "../../../base";


class Words extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            words: this.props.data
        };
    }

    onWordClick(e) {
        let word = this.state.words[e.target.dataset.id];
        console.log(word);

        // this.log('Words component: clicked word=' + word.id);
        //
        // this.props.onWordClick(word);
    }

    render() {
        return (
            <Group title='Добавленные слова'>
                <List>
                    {
                        this.state.words.map((word, index) =>
                            <CellButton
                                level='primary'
                                key={word.id}
                                data-id={index}
                                onClick={this.onWordClick.bind(this)}>

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
            </Panel>
        )
    }
}

export default DictPanel;