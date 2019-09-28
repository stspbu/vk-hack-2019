import * as React from "react";
import {CellButton, Group, List, PanelHeader, HeaderButton, Panel, Radio, Div, FormLayout, Button} from "@vkontakte/vkui";

import {BaseComponent, DataLoader} from "../../../base";

const test_words = [
    {'answer': 0, 'word': 'hi', 'variants': ['привет', 'пока', 'здравствуй', 'да']},
    {'answer': 1, 'word': 'fuck', 'variants': ['привет', 'пока', 'здравствуй', 'да']}
];

class TaskItem extends BaseComponent{
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task
        };
    }
    //
    // getScore(){
    //
    // }

    render(){
        return (
            <Group>
                <List>
                    {
                        this.state.task.map((task) =>
                            <FormLayout>
                                <Div>
                                    <Div>
                                        {task.word}
                                    </Div>
                                    <Radio name="radio" value="1">
                                        {task.variants[0]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {task.variants[1]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {task.variants[2]}
                                    </Radio>
                                    <Radio name="radio" value="1">
                                        {task.variants[3]}
                                    </Radio>
                                </Div>
                            </FormLayout>
                        )}
                </List>
            </Group>
        )
    }

}

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
            <Div>
                <TaskItem
                    task = {this.state.words}
                />
                <Div align="center">
                    <Button>
                        Finish!
                    </Button>
                </Div>
            </Div>
        )
    }
}


class TestPanel extends BaseComponent {
    render() {
        return (
            <Panel id="test_panel">
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}
                >
                    Тест
                </PanelHeader>
                <Tasks/>

                {/*words from server*/}
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