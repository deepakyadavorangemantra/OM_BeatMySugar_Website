
  

  import { createStore, combineReducers } from 'redux';
  import BlogReducer from './BlogReducer'
  import RegisterReducer from './RegisterReducer'
  import SellWithUs from './SellWithUsReducer'
  import Insurance from './InsuranceReducers'
  import Profile from './ProfileReducers'
  import CartReducer from './CartReducer'

//............Education Model reducer ..................//
import CourseContentReducer from './Education/CourseContent';

export default combineReducers({
    BlogReducer : BlogReducer,
    RegisterReducer : RegisterReducer,
    SellReducers: SellWithUs,
    InsuranceReducers:Insurance,
    ProfileReducers:Profile,
    CartReducer : CartReducer,
    CourseContentReducer : CourseContentReducer
    
});
