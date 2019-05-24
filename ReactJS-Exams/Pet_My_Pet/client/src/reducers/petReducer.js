import { GET_ALL_PETS, GET_MY_PETS, PET_DETAILS, LIKE_PET } from '../actions/actionTypes';

function likePet(state, petId) {
    const index = state.findIndex(a => a._id === petId);
    const newState = state.slice();
    const currentPet = newState[index];
    newState[index] = Object.assign({}, currentPet, {
        likes: currentPet.likes + 1
    });

    return newState;
}

export function petReducer(state = [], action) {
    switch (action.type) {
    case GET_ALL_PETS:
    case GET_MY_PETS:
    case PET_DETAILS:
        return action.payload;
    case LIKE_PET:
        return likePet(state, action.petId);
    default:
        return state;
    }
}