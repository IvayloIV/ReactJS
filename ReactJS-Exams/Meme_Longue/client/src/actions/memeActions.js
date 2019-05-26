import { toast } from 'react-toastify';
import { GET_ALL_MEMES, GET_DETAILS_MEME, REMOVE_MEME, USER_MEMES } from '../actions/actionTypes';
import { getAllMemes, createMeme, editMeme, getDetailsMeme, removeMeme, getMemeByUsername } from '../api/remote';

function getMemeSuccess(data) {
    return {
        type: GET_ALL_MEMES,
        data
    };
}

function getDetailsMemeSuccess(data) {
    return {
        type: GET_DETAILS_MEME,
        data
    };
}

function removeMemeSuccess(id) {
    return {
        type: REMOVE_MEME,
        id
    };
}

function getUserMemesSuccess(data) {
    return {
        type: USER_MEMES,
        data
    };
}

function getAllMemesAction() {
    return (dispatch) => {
        return getAllMemes()
            .then(json => {
                dispatch(getMemeSuccess(json));
                return json;
            });
    };
}

function createMemeAction(creator, title, description, imageUrl) {
    return (dispatch) => {
        return createMeme(creator, title, description, imageUrl)
            .then(json => {
                if (!json.error) {
                    toast.success('Meme created successfully.');
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}

function editMemeAction(_id, creator, title, description, imageUrl) {
    return (dispatch) => {
        return editMeme(_id, creator, title, description, imageUrl)
            .then(json => {
                if (!json.error) {
                    toast.success(`Meme ${title} updated.`);
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}

function detailsMemeAction(_id) {
    return (dispatch) => {
        return getDetailsMeme(_id)
            .then(json => {
                dispatch(new getDetailsMemeSuccess([json]));
                return json;
            });
    };
}

function removeMemeAction(_id) {
    return (dispatch) => {
        return removeMeme(_id)
            .then(json => {
                if (!json.error) {
                    dispatch(removeMemeSuccess(_id));
                    toast.success(`Meme deleted.`);
                } else {
                    toast.error(json.description);
                }

                return json;
            });
    };
}

function getUserMemesAction(username) {
    return (dispatch) => {
        return getMemeByUsername(username)
            .then(json => {
                dispatch(getUserMemesSuccess(json));
                return json;
            });
    };
}

export { getAllMemesAction, createMemeAction, editMemeAction, detailsMemeAction, removeMemeAction, getUserMemesAction };