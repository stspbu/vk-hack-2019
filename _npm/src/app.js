import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import $ from 'jquery'

require('./styles/styles.css');

class App extends React.Component {
  render() {
      return (
          <div>hello world</div>
      );
  }
}

connect.subscribe(
    function(e) {
        if (e['detail'] && e['detail']['type'] === 'VKWebAppGetUserInfoResult') {
            console.log(e['detail']['data']['first_name']);
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
        } else {
            console.log(e);
        }
    }
);

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));