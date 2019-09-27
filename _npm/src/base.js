import React from "react";

const MODE = 'dev';
const baseUrl = 'https://vkhack19.com:11888';


class BaseComponent extends React.Component {
    log(message, level='debug') {
        if (level === 'debug' && MODE !== 'dev') {
            return;
        }

        console.log(message);
    }
}


class DataLoader extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: props.endpoint,
            isLoaded: false,
            data: null,
            error: null
        }
    }

    componentDidMount() {
        this.log('requesting url: ' + baseUrl + this.state.endpoint);

        fetch(baseUrl + this.state.endpoint)
            .then(res => res.json())
            .then(
                (responseData) => {
                    if (responseData && responseData.result === 'ok') {
                        this.onRequestSuccess(responseData.data);
                    } else {
                        this.onRequestError(responseData.error);
                    }
                },
                (error) => {
                    this.log('not success = ' + error);
                    this.onRequestError('unknown');
                }
            )
    }

    onRequestSuccess(data) {
        this.log('successful request with data = ' + data);

        this.setState({
            isLoaded: true,
            data: data
        })
    }

    onRequestError(error) {
        this.log('error + ' + error);

        this.setState({
            isLoaded: true,
            error: error
        })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <ul>{
                    this.state.data.map((word) => <li key={word.id}>{word.translates.nouns[0]}</li>)
                }
                </ul>
            );
        } else {
            return (<div>Загрузка...</div>)
        }
    }

}

export {BaseComponent, DataLoader};
