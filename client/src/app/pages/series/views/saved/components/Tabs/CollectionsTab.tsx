// client/src/app/pages/series/views/saved/components/CollectionsTab.tsx

import { TypographyType } from '@types';
import { Card, Typography } from '@ui';

export default function CollectionsTab() {
	return (
		<Card title="Collections" className="p-4">
			<Typography
				type={TypographyType.P}
				className="text-muted-foreground text-sm"
			>
				Collections – coming soon...
			</Typography>
		</Card>
	);
}
