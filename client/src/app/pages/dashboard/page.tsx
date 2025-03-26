import PageContainer from '@/app/shared/layout/PageContainer';
import HorizontalNav from './components/HorizontalNav';
import Container from '@/app/shared/ui/Container';
import SummaryWidgets from './components/SummaryWidgets';
import Typography from '@/app/shared/ui/Typography';
import Notifications from './components/Notifications';
import SeriesTable from './components/SeriesTable';

export default function DashboardPage() {
	return (
		<PageContainer>
			<HorizontalNav />
			<Container className="flex flex-1">
				<Container className="flex-1 p-6 overflow-y-auto ">
					<Container className="overflow-x-auto mb-4">
						<Typography
							type="h2"
							className="text-xl font-semibold mb-4"
						>
							Notifications
						</Typography>
						<Notifications />
					</Container>
					<Container className="overflow-x-auto mb-4">
						<Typography
							type="h2"
							className="text-xl font-semibold mb-4"
						>
							Summary Traking
						</Typography>
						<SummaryWidgets />
					</Container>
					<Container className="overflow-x-auto mb-4">
						<Typography
							type="h2"
							className="text-xl font-semibold mb-4"
						>
							Tracked Series
						</Typography>
						<SeriesTable />
					</Container>
				</Container>
			</Container>
		</PageContainer>
	);
}
