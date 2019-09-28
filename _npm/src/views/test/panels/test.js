import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel, Radio, Div, FormLayout} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";

const test_words = [
    {'answer': 0, 'word': 'hi', 'variants': ['привет', 'пока', 'здравствуй', 'да']},
    {'answer': 1, 'word': 'fuck', 'variants': ['привет', 'пока', 'здравствуй', 'да']}
]


class Tasks extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            // words: this.props.data // words server
            words: test_words
        };
    }
    render() {
        return (
            <Group>
                <List>
                    {
                        this.state.words.map((word) =>
                            <FormLayout>
                                <Div>
                                    <Div>
                                        {word.word}
                                    </Div>
                                    <Radio name="radio" value="1">
                                        {word.variants[0]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {word.variants[1]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {word.variants[2]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {word.variants[3]}
                                    </Radio>
                                </Div>
                            </FormLayout>
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
                <Tasks/>
                //words from server
                {/*<DataLoader*/}
                    {/*endpoint='/tests/'*/}
                    {/*loaded={*/}
                        {/*(data) => <Tasks data={data}/>*/}
                    {/*}*/}
                    {/*method="GET"/>*/}
            </Panel>
        )
    }
}

export default TestPanel;