import * as React from "react";
import {View, Panel, Cell, PanelHeader} from "@vkontakte/vkui";


class Dict extends React.Component {
    render() {
        return (
            <View id="dict_view" activePanel="dict_panel">
                <Panel id="dict_panel">
                    <PanelHeader>Словарь</PanelHeader>
                    <Group title="Items">
                        <List>
                            <Cell>Hello</Cell>
                            <Cell>World</Cell>
                        </List>
                    </Group>
                </Panel>
            </View>
        )
    }
}

export default Dict;