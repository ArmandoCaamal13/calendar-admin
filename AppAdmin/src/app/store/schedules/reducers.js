
const initialState = {
    // selectedOption: null,
    jsonData: null,
};

// const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SELECT_OPTION':
//             return {
//                 ...state,
//                 selectedOption: action.payload,
//             };
//         case 'SET_JSON_DATA':
//             return {
//                 ...state,
//                 jsonData: action.payload,
//             };
//         default:
//             return state;
//     }
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_JSON_DATA':
      return { ...state, jsonData: action.payload };
    default:
      return state;
  }
};


export default reducer;