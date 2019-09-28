import * as React from "react";
import {Group, List, PanelHeader, HeaderButton, Panel, Radio, Div, FormLayout, Button} from "@vkontakte/vkui";

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
        let score = 0;
        for (let i = 0; i < this.state.tasks.length; i++) {
            let task = this.state.tasks[i];
            if (this.state.taskIndexToAnswer[i] == task.answer) {
                score += 1;
            }
        }

        return (
            <Panel id="test_finished_panel">
                <PanelHeader>
                    Результаты
                </PanelHeader>
                <Div>Вы ответили правильно на {score} {getRussianPluralText('вопрос', score)}!</Div>
                <Button>Ок</Button>
            </Panel>
        )
    }
}

export default TaskFinishedPanel;
