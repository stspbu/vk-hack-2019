import * as React from "react";
import {View, Panel, Cell, CellButton, PanelHeader, List, Group, Div} from "@vkontakte/vkui";
import {BaseComponent, DataLoader} from "../base"


class Words extends BaseComponent {
    render() {
        let words = this.props.data;

        return (
            <Group title='Добавленные слова'>
                <List>
                    {words.map((word) =>
                        <CellButton level='primary' key={word.id}>
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

    render() {
        return (
            <div>
                <PanelHeader>Словарь</PanelHeader>
                <DataLoader endpoint='/words/' loaded={(data) => <Words data={data} />}/>
            </div>
        )
    }
}

export default Dict;