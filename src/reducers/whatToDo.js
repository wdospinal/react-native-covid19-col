import { SET_ACTIVE_SLIDE } from '../actions';

const initialState = {
  activeSlide: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SLIDE:
      return {
        ...state,
        activeSlide: action.index,
      };
    default:
      return state;
  }
}
