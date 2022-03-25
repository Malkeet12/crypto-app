// actions.js

import { FETCH_ASSETS_BY_CATEGORY_BASE_URL } from '../../utils/constant';

export const FETCH_ASSETS_BEGIN = 'FETCH_ASSETS_BEGIN';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const UPDATE_PRICE = 'UPDATE_PRICE';

const requestOptions = {
  method: 'GET',
  headers: {
    'x-app-version-code': 468,
    'x-device-family': 'iOS',
  },
};
export function updatePrice(eventName, data) {
  return {
    type: UPDATE_PRICE,
    payload: { eventName, data },
  };
}
export function fetchAssets({
  page = 1,
  category = 'cryptocurrency',
  pageSize = 10,
  sortKey = 'name',
}) {
  const url = `${FETCH_ASSETS_BY_CATEGORY_BASE_URL}?category=${category}&page=${page}&pageSize=${pageSize}&sortKey=${sortKey}`;
  return (dispatch) => {
    dispatch(fetchAssetsBegin());
    fetch(url, requestOptions).then((response) =>
      response
        .json()
        .then((json) => {
          dispatch(fetchAssetsSuccess(json.data));
          return json.data;
        })
        .catch((error) => dispatch(fetchAssetsFailure(error)))
    );
  };
}
export const fetchAssetsBegin = () => ({
  type: FETCH_ASSETS_BEGIN,
});

export const fetchAssetsSuccess = (data) => ({
  type: FETCH_ASSETS_SUCCESS,
  payload: { assets: data },
});

export const fetchAssetsFailure = (error) => ({
  type: FETCH_ASSETS_FAILURE,
  payload: { error },
});
