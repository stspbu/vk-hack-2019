import React from "react";
import {FixedLayout, Root, Tabs, TabsItem} from '@vkontakte/vkui'

require('./styles/styles.css');

const availableTabs = [
    {
        'id': 'dict',
        'content': 'Словарь',
        'view': 'dict_view'
    },
    {
        'id': 'test',
        'content': 'Тесты',
        'view': 'test_view'
    }
];

class AppTabs extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.activeTab || 'dict'
        }
    }

    onTabChanged(tabId){
        this.setState({
            activeTab: tabId
        });

        let tab = null;
        for (let i = 0; i < availableTabs.length; i++) {
            if (availableTabs[i].id === tabId) {
                tab = availableTabs[i];
                break;
            }
        }

        this.props.onTabChanged(tab);
    }

    render() {
        return (
            <FixedLayout vertical="bottom">
                <Tabs>
                    {
                        availableTabs.map(function (tab, index) {
                            return (
                                <TabsItem
                                    selected={this.state.activeTab === tab.id}
                                    onClick={() => this.onTabChanged(tab.id) }>

                                    {tab.content}
                                </TabsItem>
                            )
                        }.bind(this))
                    }
                </Tabs>
            </FixedLayout>
        );
    }
}

export default AppTabs;