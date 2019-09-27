import * as React from "react";
import { View, Panel, PanelHeader, HeaderButton, Group, List, Cell, Search, Button } from '@vkontakte/vkui';

import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class SearchPage extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        search: ''
      }
      this.onChangeHandle = this.onChangeHandle.bind(this);
      this.onClickHandle = this.onclickHandle.bind(this);
    }

    onChangeHandle (search) {
        this.setState({ search });
    }

    onClickHandle(){
        $.ajax({
            type: 'POST',
            url: 'https://vkhack19.com:11888/message',
            data: {'name': e['detail']['data']['first_name']},
            success: function (response) {
                alert('Slava molodec!');
            },
            error: function (response) {
                    console.log(response.responseText);
            }
            });
    }


    render() {
        return (
            <div>
                <PanelHeader
                    left={<HeaderButton><Icon24Back/></HeaderButton>}
                    right={<HeaderButton><Icon24Search/></HeaderButton>}
                >
                    Type your word
                </PanelHeader>
                <Search
                    value={this.state.search}
                    onChange={this.onChangeHandle}
                />
                <div align="center">
                    <Button
                        onClick={this.onClickHandle()}
                    >
                        GO!
                    </Button>
                </div>
            </div>
        );
    }
}

export default SearchPage;