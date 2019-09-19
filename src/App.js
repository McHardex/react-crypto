import React from 'react';
import { Dropdown, Button, Loader } from 'semantic-ui-react';
import { getTradingPairs, subscribe, unsubscribe } from './utils/services';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './App.css';

const client = new W3CWebSocket('wss://ws.bitstamp.net');

class App extends React.Component {
  state = {
    tradingPairs: [],
    value: '',
    orderBook: {},
    loadindOrderBook: false,
    unsubscribed: false
  }

  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.onerror = (error) => {
        console.log("Connection Error: " + error.toString());
      };
    };
  }

  async componentDidMount() {
    const response = await getTradingPairs();
    const name = response.data.map(pairs => {
      return {
        value: pairs.url_symbol,
        text: pairs.name
      }
    });

    this.setState({ tradingPairs: name });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      unsubscribe(client, prevState.value);

      subscribe(client, value);

      client.onmessage = (event) => {
        const { data } = event;
        const res = JSON.parse(data);
        if (Object.keys(res.data).length > 1) {
          this.setState({
            orderBook: res.data,
            loadindOrderBook: false
          });
        }
      };
    }
  }

  subscribe = () => {
    const { value } = this.state;
    subscribe(client, value);
    this.setState({
      unsubscribed: false,
      loadindOrderBook: true
    });
  }

  unsubscribe = () => {
    const { value } = this.state;
    unsubscribe(client, value);
    this.setState({ unsubscribed: true });
  }

  getDropdownValue = (e, { value }) => {
    this.setState({
      value,
      loadindOrderBook: true,
      unsubscribed: false
    });
  }

  renderBidsAndAsks = (orderBook) => (
    <div className="asks-bid">
      <div className="bids-wrapper">
        <h2 className="bids-header">Bid</h2>
        <div className="bids-container">
          {Object.keys(orderBook).length > 1 ? orderBook.bids.map(bid => (
            <p key={bid} className="bids">{bid}</p>
          )) : null}
        </div>
      </div>

      <div className="asks-wrapper">
        <h2 className="asks-header">Ask</h2>
        <div className="asks-container">
          {Object.keys(orderBook).length > 1 ? orderBook.asks.map(ask => (
            <p key={ask} className="asks">{ask}</p>
          )) : null}
        </div>
      </div>
    </div>
  )

  render() {
    const { tradingPairs, orderBook, loadindOrderBook, unsubscribed } = this.state;
    return (
      <div className="App">
        <h1 className="title">React Crypto Order Book App</h1>
        <Dropdown placeholder='Select currency pair' search selection options={tradingPairs} onChange={this.getDropdownValue} />
        {Object.keys(orderBook).length > 1 &&
          <Button
            primary
            onClick={unsubscribed ? this.subscribe : this.unsubscribe}
            disabled={Object.keys(orderBook).length < 1}
          >
            {unsubscribed ? 'Subscribe' : 'Unsubscribe'}
          </Button>
        }
        <div className="bids-ask-wrapper">
          <div style={{ visibility: loadindOrderBook ? 'visible' : 'hidden' }}>
            <Loader active inline />
          </div>
          {Object.keys(orderBook).length > 1 ? this.renderBidsAndAsks(orderBook) : null}
        </div>
      </div>
    );
  }
}

export default App;
