// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducers';
import utilsReducer from './utilsReducer';
import productReducer from './productReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';
import webinarReducer from './webinarReducer';
import leadsReducer from './leadsReducer';
import linkReducer from './linkReducer';
import appReducer from './appReducer';
import payoutsReducer from './payoutsReducer';
import tableReducer from './tableReducer';
import affiliateReducer from './affiliateReducer';

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  utils: utilsReducer,
  products: productReducer,
  courses: courseReducer,
  webinar: webinarReducer,
  leads: leadsReducer,
  linkLevel: linkReducer,
  app: appReducer,
  payout: payoutsReducer,
  table: tableReducer,
  affiliate: affiliateReducer,
});

export default reducers;
