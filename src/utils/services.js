import axios from "axios";

const options = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

export const getTradingPairs = async () => {
  try {
    const response = await axios.get(
      "https://www.bitstamp.net/api/v2/trading-pairs-info/",
      options
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const subscribeToLiveOrderBook = (client, value) => {
  client.send(
    JSON.stringify({
      event: "bts:subscribe",
      data: {
        channel: `order_book_${value}`
      }
    })
  );
};

export const unsubscribeFromLiveOrderBook = (client, value) => {
  client.send(
    JSON.stringify({
      event: "bts:unsubscribe",
      data: {
        channel: `order_book_${value}`
      }
    })
  );
};
