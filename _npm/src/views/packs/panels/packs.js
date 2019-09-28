import React from 'react'
import {BaseComponent, DataLoader} from "../../../base";
import {Cell, PanelHeader, Group, List, Panel, View} from "@vkontakte/vkui";


// class Pack extends BaseComponent {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data: this.props.data
//         };
//     }
//
//     render() {
//         return (
//             <Group title=''>
//                 <List>
//                     <Cell>{data.id}</Cell>
//                     <Cell>{data.name}</Cell>
//                     <Cell>{data.avatar}</Cell>
//                 </List>
//             </Group>
//         )
//     }
// }

class PacksPanel extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel id='packs_panel'>
                <PanelHeader>
                    Наборы слов
                </PanelHeader>
                <DataLoader
                    endpoint='/packs/'
                    loaded={
                        (data) => <Pack data={data} />
                    }
                    method='GET'/>
            </Panel>
        )
    }
}

export default PacksPanel;