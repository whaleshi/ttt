import type { ReactElement } from 'react';
import BaseLayout from '@/components/common/BaseLayout';
import Header from '@/components/common/Header';
import UserIndex from '@/components/user/Index';

function UserLayout() {
	return (
		<>
			<UserIndex />
		</>
	);
}


UserLayout.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<div className="md:flex md:flex-col h-screen md:w-screen md:fixed md:top-0 md:left-0 bg-[#100c15]">
				<Header />
				<BaseLayout>{page}</BaseLayout>
			</div>
		</>
	);
};

export default UserLayout;