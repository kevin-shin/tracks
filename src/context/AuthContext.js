import createDataContext from './createDataContext';
import trackerAPI from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup_error':
            return { ...state, errorMessage: action.payload }
        case 'signin_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { token: action.payload, errorMessage: '' };
        case 'clear_err':
            return { ...state, errorMessage: "" };
        case 'signout':
            return { token: null, errorMessage: "" };
        default:
            return state;
    }
};

const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
}

// ACTION FUNCTIONS
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_err' })
}

const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerAPI.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: "signin", payload: response.data.token });
            navigate('TrackList', {});
        } catch (err) {
            dispatch({ type: "signup_error", payload: "Something went wrong with signup." });
        }
    }
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerAPI.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: "signin", payload: response.data.token });
            navigate('TrackList', {});
        } catch (err) {
            dispatch({ type: "signin_error", payload: "Something went wong with signing in." });
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: "signout" });
        navigate('loginFlow');
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
    { token: null, errorMessage: '' }
)