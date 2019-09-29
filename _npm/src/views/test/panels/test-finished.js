import * as React from "react";
import {Group, List, PanelHeader, Cell, Panel, Footer, Div, FormLayout, Button} from "@vkontakte/vkui";

import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';

import {BaseComponent, getRussianPluralText, DataLoader} from "../../../base";

class TaskFinishedPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            tasks: props.tasks,
            taskIndexToAnswer: props.taskIndexToAnswer
        };

        this.sendResult();
    }

    sendResult() {
        let test = [];
        this.state.tasks.map((task, index) => {
            test.push({
                word: task.word,
                is_correct: this.state.taskIndexToAnswer[index] == task.answer
            })
        });

        DataLoader.doMakeRequest({
            endpoint: '/tests/',
            method: 'POST',
            requestData: {
                test: test
            }
        });
    }

    render() {
        let words = [];
        let score = 0;
        for (let i = 0; i < this.state.tasks.length; i++) {
            let task = this.state.tasks[i];
            if (this.state.taskIndexToAnswer[i] == task.answer) {
                score += 1;
            }
            words.push(task.word);
        }


        return (
            <Panel id="test_finished_panel">
                <PanelHeader>
                    Результаты
                </PanelHeader>
                <Group title='Статистика по словам'>
                    <List>
                        {words.map(function(word, index) {
                            let isRight = (this.state.taskIndexToAnswer[index] == this.state.tasks[index].answer);
                            return (
                                <Cell before={
                                    isRight ? <Icon16Done fill='#2d2'/> : <Icon16Cancel fill='#d22'/>
                                }>{word}</Cell>
                            )
                        }.bind(this))}
                    </List>
                </Group>
                <Footer>
                    Вы ответили правильно на {score} {
                        getRussianPluralText('вопрос', score, 'ов', '', 'а')
                    } из {this.state.tasks.length}
                </Footer>
                <Div>
                    <Button size='xl' onClick={this.props.goBack}>Вернуться к тестам</Button>
                </Div>
            </Panel>
        )
    }
}

export default TaskFinishedPanel;
