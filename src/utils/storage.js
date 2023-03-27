const storagePrefix = 'template_react_';

export const storage = {
	getToken: () => {
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
	},
	setToken: token => {
		window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
	},
	clearToken: () => {
		window.localStorage.removeItem(`${storagePrefix}token`);
	},
	getUser: () => {
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}user`));
	},
	setUser: user => {
		window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
	},
	clearUser: () => {
		window.localStorage.removeItem(`${storagePrefix}user`);
	},
};
