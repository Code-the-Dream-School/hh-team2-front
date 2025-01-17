const initialState = {
    list: [], 
    loading: false,
    error: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                list: action.payload, 
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload, 
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload, 
            };
        default:
            return state;
    }
};

export default usersReducer;