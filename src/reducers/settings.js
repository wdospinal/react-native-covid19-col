import {
  CHANGE_LOCALE_LANGUAGE,
} from '../actions';

export default (state = { locale: 'en' }, action = {}) => {
  switch (action.type) {
    case CHANGE_LOCALE_LANGUAGE:
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
};
