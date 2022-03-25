import { socket } from '../../utils/webSocket';
import {
  FETCH_ASSETS_BEGIN,
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE,
  UPDATE_PRICE,
} from './homeAction';

const initialState = {
  assets: {},
  error: null,
  loading: false,
  totalCount: 0,
  totalPageCount: 0,
  page: 0,
};

export default function homeReducer(
  state = initialState,
  { type, payload } = {}
) {
  switch (type) {
    case FETCH_ASSETS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ASSETS_SUCCESS:
      const { totalCount, totalPageCount, page, assetCategories } =
        payload.assets;
      const { assetCategoryData } = assetCategories[0];
      let { assets } = assetCategoryData[0];

      let assetsObject = Object.assign({}, state.assets);
      assets.forEach((item) => {
        const { subscriptionId } = item.info;
        assetsObject[subscriptionId] = {
          ...item.info,
          ...item.display.lastPriceAndPercentageChange,
        };
        //formatting the price value
        assetsObject[subscriptionId].value = assetsObject[
          subscriptionId
        ].value.replaceAll('.', ',');
      });
      //subscribe for first batch
      if (page === 1) {
        let parameters = { topics: Object.keys(assetsObject) };
        socket.emit('subscribe', parameters);
      }
      return {
        ...state,
        loading: false,
        assets: assetsObject,
        totalCount,
        totalPageCount,
        page,
      };

    case FETCH_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
        assets: [],
      };
    case UPDATE_PRICE:
      let items = Object.assign({}, state.assets);
      const { eventName, data } = payload;
      const { currentPrice = {} } = data[0];
      const { priceChangePercent, sellPrice } = currentPrice;
      //updating the price and percentage of asset
      if (items[eventName]) {
        items[eventName].value = `Rp${sellPrice.toLocaleString()}`;
        items[eventName].percentage = priceChangePercent;
      }
      return {
        ...state,
        assets: items,
      };

    default:
      return state;
  }
}
