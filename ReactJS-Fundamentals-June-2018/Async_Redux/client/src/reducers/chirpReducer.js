import { CHIRP_SUCCESS, CREATE_CHIRP_SUCCESS, REMOVE_CHIRP_SUCCESS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS } from '../actions/actionTypes';

export function chirpReducer(state = { chirps: [], chirpsCount: 0, followersCount: 0, followingCount: 0 }, action) {
    switch (action.type) {
        case CHIRP_SUCCESS:
            return action.data;
        case CREATE_CHIRP_SUCCESS:
            let newState = Object.assign({}, state, {
                chirpsCount: state.chirpsCount + 1
            });

            if (action.myFeed) {
                newState['chirps'].unshift(action.data);
            }

            return newState;
        case REMOVE_CHIRP_SUCCESS:
            let newChirps = state.chirps.filter(c => c._id !== action.id);
            return Object.assign({}, state, { 
                chirps: newChirps,
                chirpsCount: state.chirpsCount - 1
            });
        case FOLLOW_SUCCESS:
            return Object.assign({}, state, { 
                followersCount: state.followersCount + 1
            });
        case UNFOLLOW_SUCCESS:
            return Object.assign({}, state, { 
                followersCount: state.followersCount - 1
            });
        default:
            return state;
    }
}