import { toast } from 'react-toastify';

const useAuth = ({ func, username, password, message, history }) => {
    const setSession = (data) => {
        sessionStorage.setItem('authToken', data._kmd.authtoken);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
    };

    func(username, password).then((json) => {
        if (!json.error) {
            setSession(json);
            toast.success(message);
            history.push('/');
        } else {
            toast.error(json.description);
        }
    });
};

export default useAuth;