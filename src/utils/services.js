import axios from 'axios';

export const getTradingPairs = async () => {
  try {
    const response = await axios.get('https://www.bitstamp.net/api/v2/trading-pairs-info/');
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const subscribe = (client, value) => {
  client.send(JSON.stringify({
    "event": "bts:subscribe",
    "data": {
      "channel": `order_book_${value}`
    }
  }));
}

export const unsubscribe = (client, value) => {
  client.send(JSON.stringify({
    "event": "bts:unsubscribe",
    "data": {
      "channel": `order_book_${value}`
    }
  }));
}
