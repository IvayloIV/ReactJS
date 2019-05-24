import { toast } from 'react-toastify';
import { GET_ALL_PETS, GET_MY_PETS, PET_DETAILS, LIKE_PET } from '../actions/actionTypes';
import { getPets, createPet, getMyPets, getPetDetails, editPet, removePet, likePet } from '../api/remote';

function getPetsSuccess(payload) {
    return {
        type: GET_ALL_PETS,
        payload
    };
}

function getMyPetsSuccess(payload) {
    return {
        type: GET_MY_PETS,
        payload
    };
}

function getDetailsSuccess(payload) {
    return {
        type: PET_DETAILS,
        payload
    };
}

function likePetSuccess(petId) {
    return {
        type: LIKE_PET,
        petId
    };
}

function getAllPetsAction() {
    return (dispatch) => {
        return getPets().then(json => {
            dispatch(getPetsSuccess(json));
            return json;
        });
    };
}

function createPetAction(name, description, imageURL, category) {
    return (dispatch) => {
        return createPet(name, description, imageURL, category)
            .then(json => {
                if (!json.error) {
                    toast.success('Created successfully.');
                } else {
                    toast.error(json.error);
                }
                return json;
            });
    };
}

function getMyPetsAction() {
    return (dispatch) => {
        return getMyPets().then(json => {
            dispatch(getMyPetsSuccess(json));
            return json;
        });
    };
}

function getPetDetailsAction(petId) {
    return (dispatch) => {
        return getPetDetails(petId).then(json => {
            dispatch(getDetailsSuccess([json]));
            return json;
        });
    };
}

function editPetAction(petId, name, description, imageURL, category, likes) {
    return (dispatch) => {
        return editPet(petId, name, description, imageURL, category, likes)
            .then(json => {
                if (!json.error) {
                    toast.success('Updated successfully!');
                } else {
                    toast.error(json.error);
                }
                return json;
            });
    };
}

function removePetAction(petId) {
    return (dispatch) => {
        return removePet(petId)
            .then(json => {
                if (!json.error) {
                    toast.success('Pet removed successfully!');
                } else {
                    toast.error(json.error);
                }
                return json;
            });
    };
}

function likePetAction(petId, payload) {
    return (dispatch) => {
        return likePet(petId, payload).then(json => {
            if (!json.error) {
                dispatch(likePetSuccess(petId));
                toast.success('Liked successfully.');
            } else {
                toast.error(json.error);
            }
            return json;
        });
    };
}

export { getAllPetsAction, createPetAction, getMyPetsAction,
    getPetDetailsAction, editPetAction, removePetAction, likePetAction };