import * as React from "react";
import {View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import TestListPanel from "./panels/test-list"
import TestPanel from "./panels/test"
import TestFinishedPanel from "./panels/test-finished"


class TestView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'test_list_panel',
            tasks: null,
            taskIndexToAnswer: null
        }
    }

    onTestSelected(kind) {
        this.setState({
            activePanel: 'test_panel'
        });
    }

    onTestFinished(tasks, taskIndexToAnswer) {
        this.log('TestView: we finished test for ' + JSON.stringify(tasks)
            + ' with ' + JSON.stringify(taskIndexToAnswer));

        this.setState({
            activePanel: 'test_finished_panel',
            tasks: tasks,
            taskIndexToAnswer: taskIndexToAnswer
        });
    }

    onTabChanged(newTab) {
        this.props.onTabChanged(newTab);
    }

    render() {
        return (
            <View id='test_view' activePanel={this.state.activePanel}>
                <TestListPanel
                    id='test_list_panel'
                    onTestSelected={this.onTestSelected.bind(this)}
                    onTabChanged={this.onTabChanged.bind(this)}
                />
                <TestPanel
                    id='test_panel'
                    onTestFinished={this.onTestFinished.bind(this)}
                />
                <TestFinishedPanel
                    id='test_finished_panel'
                    tasks={this.state.tasks}
                    taskIndexToAnswer={this.state.taskIndexToAnswer}
                />
            </View>
        )
    }
}

export default TestView;