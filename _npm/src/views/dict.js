import * as React from "react";
import {View, Panel, Cell, PanelHeader, List, Group} from "@vkontakte/vkui";


class Dict extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        fetch('https://yandex.ru')
            .then(res => res.json())
            .then()
    }

    render() {
        return (
            <div>
                <PanelHeader>Словарь</PanelHeader>
                <Group title="Items">
                    <List>
                        <Cell>Hello</Cell>
                        <Cell>World</Cell>
                    </List>
                </Group>
            </div>
        )
    }
}

export default Dict;