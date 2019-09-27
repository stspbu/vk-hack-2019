import * as React from "react";
import {View, Panel, Cell, CellButton, PanelHeader, List, Group, Div, HeaderButton} from "@vkontakte/vkui";

import Icon24Add from '@vkontakte/icons/dist/24/add';

import {BaseComponent, DataLoader} from "../base"


class Words extends BaseComponent {
    exploreWord() {

    }

    render() {
        let words = this.props.data;

        return (
            <Group title='Добавленные слова'>
                <List>
                    {words.map((word) =>
                        <CellButton level='primary' key={word.id} onClick={this.exploreWord}>
                            {word.word}
                        </CellButton>
                    )}
                </List>
            </Group>
        )
    }
}


class Dict extends BaseComponent {
    constructor(props) {
        super(props);

    }

    onAddClick() {
        this.props.changeView('search_view')
    }

    render() {
        return [
            <PanelHeader
                left={<HeaderButton key="add" onClick={this.onAddClick.bind(this)}><Icon24Add/></HeaderButton>}>
                Словарь
            </PanelHeader>,
            <DataLoader endpoint='/words/' loaded={(data) => <Words data={data}/>} method="GET"/>
        ]
    }
}

export default Dict;