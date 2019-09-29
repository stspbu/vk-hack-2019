import * as React from "react";
import {Group, List, PanelHeader, HeaderButton, Panel, Radio, Div, FormLayout, Button} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, DataLoader} from "../../../base";

class Task extends BaseComponent{
    constructor(props) {
        super(props);

        this.state = {
            chosen_variant: 0
        };
    }

    onVariantChosen(e) {
        let val = e.target.value;
        this.log('We chosen: ' + val);

        this.setState({
            chosen_variant: val
        })
    }

    onAnswered() {
        this.log('Task: we answered');

        this.props.onTaskAnswered(this.state.chosen_variant);
        this.setState({
            chosen_variant: 0
        })
    }

    render(){
        let taskIndex = this.props.index;
        let variants = this.props.data.variants;
        let word = this.props.data.word;

        let chosenVariant = this.state.chosen_variant;

        this.log('Rendering task with index = ' + taskIndex);
        this.log('Rendering task with chosen_variant = ' + chosenVariant);

        return (
            <Group title={'Вопрос #' + (taskIndex+1)}>
                <Div>Выберите перевод слова {word}:</Div>
                <List>
                    {
                        variants.map(
                            (variant, index) =>
                                <Radio
                                    checked={index == chosenVariant}
                                    name='variants'
                                    value={index}
                                    onChange={this.onVariantChosen.bind(this)}>{variant}</Radio>
                        )
                    }
                    <Div style={{display: 'flex'}}>
                        <Button
                            onClick={this.onAnswered.bind(this)}
                            size="l"
                            stretched
                        >
                            Далее
                        </Button>
                    </Div>
                </List>
            </Group>
        )
    }
}

class Test extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            tasks: this.props.data,
            currentTaskIndex: 0,
            lastTaskIndex: this.props.data.length-1,

            taskIndexToAnswer: {}
        };
    }

    onTaskAnswered(variant) {
        this.log('Test: we answered with ' + variant);

        this.state.taskIndexToAnswer[this.state.currentTaskIndex] = variant;
        if (this.state.currentTaskIndex != this.state.lastTaskIndex) {
            this.log('Current task index++');

            this.setState((state) => ({
                currentTaskIndex: state.currentTaskIndex + 1
            }));
        } else {
            this.log('Test is finished');
            this.log('Finished for ' + JSON.stringify(this.state.tasks)
                + ' with ' + JSON.stringify(this.state.taskIndexToAnswer));

            this.props.onTestFinished(this.state.tasks, this.state.taskIndexToAnswer);
        }
    }

    render() {
        this.log('Rendering test with current task index = ' + this.state.currentTaskIndex);

        return (
            <Div>
                <Task
                    index={this.state.currentTaskIndex}
                    data={this.state.tasks[this.state.currentTaskIndex]}
                    onTaskAnswered={this.onTaskAnswered.bind(this)} />
            </Div>
        )
    }
}


class TestPanel extends BaseComponent {
    onTestFinished(tasks, taskIndexToAnswer) {
        this.props.onTestFinished(tasks, taskIndexToAnswer);
    }

    goBack() {
        this.props.goBack();
    }

    render() {
        return (
            <Panel id="test_panel">
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}
                >
                    Тест
                </PanelHeader>

                <DataLoader
                    endpoint='/tests/'
                    loaded={
                        (data) => <Test data={data} onTestFinished={this.onTestFinished.bind(this)} />
                    }
                    failed={
                        (error) => (
                            error === 'not-enough-words' ?
                                <Div>
                                    Необходимо добавить как минимум 10 слов
                                    для возможности проходить данный тест!
                                </Div>  :
                                <Div>
                                    Что-то пошло не так...
                                </Div>
                        )
                    }
                    method="GET"
                />
            </Panel>
        )
    }
}

export default TestPanel;