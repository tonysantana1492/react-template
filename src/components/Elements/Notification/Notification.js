import toast from 'react-hot-toast';

export const Notification = {
	success(message){
		toast.success(message);
	},

	error(message){
		toast.error(message);
	}
};
