import * as React from "react";
import {BaseComponent, DataLoader} from "../../../base";
import {Panel, PanelHeader} from "@vkontakte/vkui";

class WordAddingPanel extends BaseComponent {
    render() {
        return (
            <Panel id="word_adding_panel">
                <PanelHeader>
                    Добавление слова
                </PanelHeader>
            </Panel>
        )
    }
}

export default WordAddingPanel;