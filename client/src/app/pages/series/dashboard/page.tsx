import PageContainer from "@/app/shared/layout/PageContainer";
import HorizontalNav from "./components/HorizontalNav";

export default function DashboardPage() {
  return (
    <PageContainer>
      <HorizontalNav />

      {/* Main Content Area */}
      <section className="flex flex-1">
        {/* Central Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Summary Widgets */}
          <section className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded">Total Series</div>
            <div className="bg-gray-100 p-4 rounded">Watching</div>
            <div className="bg-gray-100 p-4 rounded">Need to Continue</div>
            <div className="bg-gray-100 p-4 rounded">Missing Subtitles</div>
          </section>

          {/* Notifications Area */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="mt-2 bg-yellow-50 p-4 rounded shadow">
              <p>No new notifications.</p>
            </div>
          </section>

          {/* Tracked Series Table */}
          <section>
            <h2 className="text-xl font-semibold">Tracked Series</h2>
            <table className="w-full mt-3 table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Poster</th>
                  <th className="border px-4 py-2">Series Name</th>
                  <th className="border px-4 py-2">Watch Status</th>
                  <th className="border px-4 py-2">Subtitle Status</th>
                  <th className="border px-4 py-2">Latest Episode</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    No series tracked yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </PageContainer>
  );
}
