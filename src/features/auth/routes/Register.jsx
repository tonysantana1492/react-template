import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
	
	return (
		<Layout title="Register your account" linkName="Login" linkUrl="/auth/login" linkAsk="Already have an account?">
			<RegisterForm />
		</Layout>
	);
};
