'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostForgotPasswordMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';

interface IformForgotPassword {
	email: string;
	frontEndUrl: string;
}
const ForgotPage = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<IformForgotPassword>();
	const [postForgotPassword] = usePostForgotPasswordMutation();
	const onSubmit: SubmitHandler<IformForgotPassword> = async (data) => {
		const newData = {
			email: data.email,
			frontEndUrl: window.location.href
		};
		const { data: responseData, error } = await postForgotPassword(newData);
		if (responseData) {
			alert(responseData.message);
		} else {
			const errorMessage = error as { data: { message: string } };
			alert(errorMessage.data.message);
		}
	};

	return (
			<div>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="email"
							{...register('email', { required: true })}
						/>
						<button type="submit">отправить письмо сброса</button>
					</form>

					<a onClick={() => router.push('/auth/sign-up')}>
						создать новый аккаунт
					</a>
				</div>
				<div>
					<a onClick={() => router.push('/auth/sign-in')}>Выйти</a>
				</div>
			</div>
	);
};

export default ForgotPage;
