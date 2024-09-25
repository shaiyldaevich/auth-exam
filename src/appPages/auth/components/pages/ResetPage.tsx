'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePatchResetPasswordMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';
interface IformResetPassword {
	newPassword: string;
}
const ResetPage = () => {
	const { register, handleSubmit } = useForm<IformResetPassword>();
    const [patchResetPassword] = usePatchResetPasswordMutation()
	const searchParams = useSearchParams();
    const router= useRouter()
	const token = searchParams.get('token');
	console.log(token);
	const onSubmit: SubmitHandler<IformResetPassword> = async (data) => {
		const newData = {
			token,
			newPassword: data.newPassword
		};
       // @ts-ignore
		const { data: responseData, error } = await patchResetPassword(newData);
		if (responseData) {
            router.push('/auth/sign-in')
            alert(responseData.message);
        }else{
            const errorMessage = error as { data: { message: string } };
			alert(errorMessage.data.message);
        }
        
	};

	return (
		<section >
			<div className="container">
				<div >
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="new password"
							{...register('newPassword', { required: true })}
						/>
                        <button type='submit'>reset</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ResetPage;
