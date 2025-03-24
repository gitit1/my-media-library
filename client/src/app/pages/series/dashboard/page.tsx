import PageContainer from '@/app/shared/layout/PageContainer';
import HorizontalNav from './components/HorizontalNav';
import Container from '@/app/shared/ui/Container';
import SummaryWidgets from './components/SummaryWidgets';
import Typography from '@/app/shared/ui/Typography';

export default function DashboardPage() {
	return (
		<PageContainer>
			<HorizontalNav />
			<Container className="flex flex-1">
				<Container className="flex-1 p-6 overflow-y-auto ">
					<SummaryWidgets />
					{/* Notifications Area */}
					<Container className="mb-6">
						<Typography type="h2" className="text-xl font-semibold">
							Notifications
						</Typography>
						<Container className="mt-2 bg-yellow-50 p-4 rounded shadow">
							<Typography>No new notifications.</Typography>
						</Container>
					</Container>

					{/* Tracked Series Table */}
					<Container>
						<Typography type="h2" className="text-xl font-semibold">
							Tracked Series
						</Typography>
						<Container className="overflow-x-auto mt-3">
							<table className="w-full table-auto">
								<thead>
									<tr>
										<th className="border px-4 py-2">
											Poster
										</th>
										<th className="border px-4 py-2">
											Series Name
										</th>
										<th className="border px-4 py-2">
											Watch Status
										</th>
										<th className="border px-4 py-2">
											Subtitle Status
										</th>
										<th className="border px-4 py-2">
											Latest Episode
										</th>
										<th className="border px-4 py-2">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td
											colSpan={6}
											className="border px-4 py-2 text-center"
										>
											No series tracked yet.
										</td>
									</tr>
								</tbody>
							</table>
						</Container>
					</Container>
				</Container>
			</Container>
		</PageContainer>
	);
}
