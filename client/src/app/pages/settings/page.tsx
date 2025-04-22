'use client';

import { TypographyType } from '@types';
import { Container, Typography } from '@ui';
import React from 'react';

export default function ManagePathsPage() {
	return (
		<Container className="p-6">
			<Typography type={TypographyType.H1} className="mb-4">
				Manage File Paths
			</Typography>
			<Typography type={TypographyType.P}>
				This is where you’ll manage your media folders.
			</Typography>
		</Container>
	);
}
