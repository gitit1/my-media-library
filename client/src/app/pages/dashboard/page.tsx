'use client';

import { useTranslation } from 'react-i18next';
import { PageContainer, SeriesTable } from '@layout';
import { Container, Typography } from '@ui';
import { TypographyType } from '@types';
import { mockSeriesData } from '@mocks';
import HorizontalNav from './components/HorizontalNav';
import SummaryWidgets from './components/SummaryWidgets';
import Notifications from './components/Notifications';

export default function DashboardPage() {
	const { t } = useTranslation();

	const seriesData = mockSeriesData;

	return (
		<PageContainer>
			<HorizontalNav />
			<Container className="flex flex-1">
				<Container className="flex-1 p-6 overflow-y-auto">
					<Container className="overflow-x-auto mb-4">
						<Typography
							type={TypographyType.H2}
							className="text-xl font-semibold mb-4"
						>
							{t('dashboard.notifications')}
						</Typography>
						<Notifications />
					</Container>
					<Container className="overflow-x-auto mb-4">
						<Typography
							type={TypographyType.H2}
							className="text-xl font-semibold mb-4"
						>
							{t('dashboard.traking')}
						</Typography>
						<SummaryWidgets />
					</Container>
					<Container className="overflow-x-auto mb-4">
						<Typography
							type={TypographyType.H2}
							className="text-xl font-semibold mb-4"
						>
							{t('dashboard.trackedSeries')}
						</Typography>
						<SeriesTable data={seriesData} />
					</Container>
				</Container>
			</Container>
		</PageContainer>
	);
}
