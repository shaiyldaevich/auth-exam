'use client';
import { usePostLoginMutation } from '@/redux/api/auth';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/navigation';

interface IFormInput {
	email: string;
	password: string;
}

const SignInPage = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<IFormInput>();
	const [postLogin] = usePostLoginMutation();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const { data: responseData, error } = await postLogin(data);
			if (responseData) {
				localStorage.setItem('tokens', JSON.stringify(responseData));
				router.push('/');
			} else {
				const errorMessage = error as { data: { message: string } };
				alert(errorMessage.data.message);
			}
			// console.log(responseData);
			// console.log(error);
		} catch (error) {
			console.table(error);
		}
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
							placeholder="passworld"
							{...register('password', { required: true })}
						/>
						<button type="submit">Войти</button>
					</form>

					<a href="/auth/forgot">забыли пороль?</a>
				</div>
				<div>
					<a href="/auth/sign-up">Зарегистрироваться</a>
				</div>
			</div>
		</section>
	);
};

export default SignInPage;
