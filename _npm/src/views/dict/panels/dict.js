import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel} from "@vkontakte/vkui";

import Icon24Add from '@vkontakte/icons/dist/24/add';

import {BaseComponent, DataLoader} from "../../../base";


class Words extends BaseComponent {
    exploreWord(e) {
        let id = e.target.dataset.id;

    }

    render() {
        let words = this.props.data;

        return (
            <Group title='Добавленные слова'>
                <List>
                    {words.map((word) =>
                        <CellButton level='primary' key={word.id} data-id={word.id} onClick={this.exploreWord.bind(this)}>
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
                <DataLoader endpoint='/words/' loaded={(data) => <Words data={data}/>} method="GET"/>
            </Panel>
        )
    }
}

export default DictPanel;