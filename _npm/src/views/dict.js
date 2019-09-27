import * as React from "react";
import {View, Panel, Cell, PanelHeader, List, Group, Div} from "@vkontakte/vkui";
import {BaseComponent, DataLoader} from "../base"


class Word extends BaseComponent {
    render() {
        let word = this.props.word;

        return (
            this.props.word
        )
    }
}

class Words extends BaseComponent {
    render() {
        return (
            <Div>Words</Div>
        )
    }
}

class WordsLoader extends DataLoader {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <ul>{
                    this.state.data.map(
                        (word) => <li key={word.id}>
                            <Word word={word} />
                        </li>
                    )
                }
                </ul>
            )
        } else {
            return (<Div>Загрузка...</Div>)
        }
    }
}


class Dict extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PanelHeader>Словарь</PanelHeader>
                <WordsLoader/>
                <DataLoader endpoint='/words' />
                <Word test={123}/>
            </div>
        )
    }
}

export default Dict;