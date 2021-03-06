import * as React from "react";
import {ScreenSpinner, View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import TestListPanel from "./panels/test-list"
import TestPanel from "./panels/test"
import TestFinishedPanel from "./panels/test-finished"


class TestView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'test_list_panel',
            history: ['test_list_panel'],

            tasks: null,
            taskIndexToAnswer: null,

            popout: null
        }
    }

    /* nav */
    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        this.setState({ history, activePanel });
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        this.setState({ history, activePanel });
    }
    /* nav ends */

    onTestSelected(kind) {
        this.goForward('test_panel');
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

    setPopout(flag) {
        this.setState({
            popout: flag ? <ScreenSpinner/> : null
        });
    }

    render() {
        return (
            <View id='test_view' activePanel={this.state.activePanel} popout={this.state.popout}>
                <TestListPanel
                    id='test_list_panel'
                    onTestSelected={this.onTestSelected.bind(this)}
                />
                <TestPanel
                    id='test_panel'
                    onTestFinished={this.onTestFinished.bind(this)}
                    goBack={this.goBack.bind(this)}
                    setPopout={this.setPopout.bind(this)}
                />
                <TestFinishedPanel
                    id='test_finished_panel'
                    tasks={this.state.tasks}
                    taskIndexToAnswer={this.state.taskIndexToAnswer}
                    goBack={this.goBack.bind(this)}
                />
            </View>
        )
    }
}

export default TestView;