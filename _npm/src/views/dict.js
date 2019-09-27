import * as React from "react";
import {View, Panel, Cell, PanelHeader, List, Group} from "@vkontakte/vkui";
import {BaseComponent, DataLoader} from "../base"


class Dict extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PanelHeader>Словарь</PanelHeader>
                <DataLoader endpoint='/words' />
                <Word test={123}/>
            </div>
        )
    }
}

class Word extends BaseComponent {
    render() {
        return (
            this.props.test
        )
    }
}

export default Dict;