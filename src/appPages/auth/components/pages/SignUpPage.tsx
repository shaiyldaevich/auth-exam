'use client';
import { usePostRegistrationMutation } from '@/redux/api/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IFormInput {
	email: string;
	password: string;
	username: string;
	photo: string;
}

const SignUpPage = () => {
	const { register, handleSubmit } = useForm<IFormInput>();
	const [postRegistration] = usePostRegistrationMutation();
	const route = useRouter();
	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const { data: responseData, error } = await postRegistration(data);
			if (responseData) {
				localStorage.setItem('tokens', JSON.stringify(responseData));
				route.push('/');
				alert(responseData.message);
			} else {
				const errorMessage = error as { data: { message: string } };
				alert(errorMessage.data.message);
			}
		} catch (error) {
			console.table(error);
		}
		// console.log(data);
	};
	return (
		<section>
			<div>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							placeholder="email"
							{...register('email', { required: true })}
						/>
						<input
							placeholder="password"
							{...register('password', { required: true })}
						/>
						<input
							placeholder="username"
							{...register('username', { required: true })}
						/>
						<input
							placeholder="photo"
							{...register('photo', { required: true })}
						/>

						<button type="submit">Регестрация</button>
					</form>
				</div>
				<div>
					<div>
						<h3>Eсть аккаунт?</h3>
						<a href="/auth/sign-in">Войти</a>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SignUpPage;
