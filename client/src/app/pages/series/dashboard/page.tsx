import Header from "./components/Header";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen">
      
      {/* Header Section */}
      <Header />

      {/* Horizontal Navigation */}
      <nav className="flex gap-4 px-6 py-3 bg-gray-100 shadow-sm">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Scan Filesystem</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Series</button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded">Add New Path</button>
      </nav>

      {/* Main Content Area */}
      <section className="flex flex-1">

        {/* Left Navigation Sidebar */}
        <aside className="w-56 bg-gray-50 p-4 border-r">
          <nav className="space-y-2">
            <a href="#" className="block">Dashboard</a>
            <a href="#" className="block">Saved Series</a>
            <a href="#" className="block">Scanner</a>
            <a href="#" className="block">Unmatched Series</a>
            <a href="#" className="block">Settings</a>
          </nav>
        </aside>

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
    </main>
  );
}
