import * as React from "react";
import {CellButton, Group, List, PanelHeader, Button, Panel, Div} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";


const AvailableTests = [{
    'kind': 'en-ru',
    'name': 'Перевод с английского на русский'
}, {
    'kind': 'ru-en',
    'name': 'Перевод с русского на английский'
}];


class TestList extends BaseComponent {
    onTestSelected(e) {
        let kind = e.target.dataset.kind;
        this.props.onTestSelected(kind);
    }

    render() {
        return (
            <Panel id="test_list_panel">
                <PanelHeader>
                    Тесты
                </PanelHeader>
                <Group title="Выберите тест">
                    <List>
                        {AvailableTests.map((test) =>
                            <CellButton
                                data-kind={test.kind}
                                onClick = {this.onTestSelected.bind(this)}>

                                {test.name}
                            </CellButton>
                        )}
                    </List>
                </Group>
            </Panel>
        )
    }
}

export default TestList;