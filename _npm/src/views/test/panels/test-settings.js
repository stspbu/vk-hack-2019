import * as React from "react";
import {CellButton, Group, List, PanelHeader, Button, Panel, Div} from "@vkontakte/vkui";

import {BaseComponent} from "../../../base";


class TestSettings extends BaseComponent {
    onStartTestClick() {
        this.props.onStartTestClick();
    }

    render() {
        return (
            <Panel id="test_settings">
                <PanelHeader>
                    Настройка теста
                </PanelHeader>
                <Div align="center">
                    <Button
                        onClick = {this.onStartTestClick.bind(this)}
                    >
                        Start
                    </Button>
                </Div>
            </Panel>
        )
    }
}

export default TestSettings;