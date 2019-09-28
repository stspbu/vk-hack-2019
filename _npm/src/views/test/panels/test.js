import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";

class Tasks extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            words: this.props.data
        };
    }
    render() {
        return (
            <Group>
                <List>
                    {
                        this.state.words.map((word) =>
                            <CellButton level='primary'>
                                {word.word}
                            </CellButton>
                    )}
                </List>
            </Group>
        )
    }
}


class TestPanel extends BaseComponent {
    render() {
        return (
            <Panel id="test_panel">
                <PanelHeader>
                    Тест
                </PanelHeader>
                <DataLoader
                    endpoint='/tests/'
                    loaded={
                        (data) => <Tasks data={data}/>
                    }
                    method="GET"/>
            </Panel>
        )
    }
}

export default TestPanel;