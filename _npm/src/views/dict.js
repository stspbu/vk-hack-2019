import * as React from "react";
import {View, Panel, Cell} from "@vkontakte/vkui";


class Dict extends React.Component {
    render() {
        return (
            <View id="dict_view" activePanel="dict_panel">
                <Panel id="dict_panel">
                    <Cell>in a cell</Cell>
                    this is a dict yow
                </Panel>
            </View>
        )
    }
}

export default Dict;