import { useState, useEffect, createContext, useCallback, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import { useLoginUserMutation, useRegisterUserMutation } from 'features/auth/api/user';
import { storage } from 'utils/storage';
import { Notification } from 'components/Elements';
import { RequestError } from 'utils';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
	const auth = useAuthProvider();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

export const useAuthProvider = () => {
	const [waitAuthCheck, setWaitAuthCheck] = useState(true);
	const [user, setUser] = useState(null);

	const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
	const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();

	const handleSession = useCallback((payload) => {

		setWaitAuthCheck(false);

		if (!payload?.token) {
			storage.clearToken();
			storage.clearUser();
			setUser(null);
			return null;
		}

		const { userId } = jwtDecode(payload.token);
		const user = payload.user;
		storage.setToken(payload.token);
		storage.setUser(payload.user);
		setUser({ id: userId, ...user });

		setWaitAuthCheck(false);
	}, []);

	const register = async model => {
		const { error, data } = await registerUser(model);

		if (error) {
			throw new RequestError(error);
		}

		handleSession({ token: data.token, user: data.user });
	};

	const login = async model => {
		const { error, data } = await loginUser(model);

		if (error) {
			throw new RequestError(error);
		}	

		handleSession({ token: data.token, user: data.user });
	};

	const logout = () => {
		handleSession(null);
	};

	const isAuthTokenValid = token => {
		if (!token) {
			return false;
		}
		const decoded = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			Notification.error('Your session has expired');
			return false;
		}

		return true;
	};

	const handleAuthentication = useCallback(() => {

		setWaitAuthCheck(true);

		const token = storage.getToken();
		const user = storage.getUser();

		if (isAuthTokenValid(token)) {
			handleSession({ token, user });
		} else {
			handleSession(null);
		}
	}, [handleSession]);

	useEffect(() => {
		handleAuthentication();
	}, [handleAuthentication]);

	return {
		waitAuthCheck,
		isLoginLoading,
		isRegisterLoading,
		user,
		login,
		register,
		logout,
	};
};

export default useAuth;
