'use client';
import { FC, ReactNode,  } from 'react';

interface LayoutSiteProps {
	children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
	return (
		<>
			<>
				<div >
					<main>{children}</main>
				</div>
			</>
		</>
	);
};
export default LayoutSite;
