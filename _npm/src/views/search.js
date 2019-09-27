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
      this.onClickHandle = this.onClickHandle.bind(this);
    }

    onChangeHandle (search) {
        this.setState({ search : search });
    }

    onClickHandle(){
        console.log(this.state.search);
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
                    <Button onClick={this.onClickHandle}>
                        GO!
                    </Button>
                </div>
            </div>
        );
    }
}

export default SearchPage;