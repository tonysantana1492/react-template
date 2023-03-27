import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
	return (
		<Layout
			title="Log in to your account"
			linkName="Register"
			linkUrl="/auth/register"
			linkAsk="Don't have an account?"
		>
			<LoginForm />
		</Layout>
	);
};
