import React from 'react';

const Welcome = () => {
	const logout = () => {
		localStorage.removeItem('tokens');
		sessionStorage.removeItem('tokens');
		window.location.reload();
	};
	return (
		<div>
			welcome
		</div>
	);
};

export default Welcome;
