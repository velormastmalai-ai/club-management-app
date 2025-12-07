import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Elite Club</h1>
              <span className="ml-3 px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                Demo
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">owner@club.com</span>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'events', 'bookings', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹18,500</p>
                <p className="text-sm text-green-600 mt-2">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">20</p>
                <p className="text-sm text-blue-600 mt-2">15 confirmed</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-600 mt-2">All published</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600 mt-2">10 active members</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">Create Event</p>
                  <p className="text-sm text-gray-600">Add a new event to your club</p>
                </button>
                <button className="px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">View Bookings</p>
                  <p className="text-sm text-gray-600">Manage all bookings</p>
                </button>
                <button className="px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50">
                  <p className="font-medium text-gray-900">Send Notification</p>
                  <p className="text-sm text-gray-600">Notify your members</p>
                </button>
              </div>
            </div>

            {/* API Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🚀 Demo Mode Active</h3>
              <p className="text-blue-800 mb-4">
                This is a demo interface. The backend API is fully functional!
              </p>
              <div className="space-y-2">
                <p className="text-sm text-blue-700">
                  <strong>API Documentation:</strong>{' '}
                  <a href="http://localhost:3000/api/docs" target="_blank" rel="noopener noreferrer" className="underline">
                    http://localhost:3000/api/docs
                  </a>
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Demo Accounts:</strong> owner@club.com, admin@club.com, user1@example.com
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Password:</strong> password123
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Events</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Create Event
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Live Music Night', date: 'Tonight, 6 hours from now', capacity: '45/100', price: '₹500 - ₹1,000' },
                { title: 'Stand-Up Comedy Night', date: 'Tomorrow, 8 PM', capacity: '78/150', price: '₹600 - ₹1,200' },
                { title: 'Electronic Dance Night', date: 'Next week', capacity: '120/200', price: '₹800 - ₹2,000' },
                { title: 'Premium Wine Tasting', date: 'Next month', capacity: '15/50', price: '₹2,500 - ₹5,000' },
              ].map((event, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📅 {event.date}</p>
                    <p>👥 {event.capacity} seats</p>
                    <p>💰 {event.price}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TKT-{1000 + idx}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Live Music Night</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">user{idx + 1}@example.com</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{Math.floor(Math.random() * 3) + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{500 + idx * 100}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          idx < 7 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {idx < 7 ? 'Confirmed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Club Settings</h2>
            <div className="bg-white shadow rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                <input
                  type="text"
                  defaultValue="Elite Club"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue="Premium club for exclusive events and experiences"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                  <input
                    type="color"
                    defaultValue="#0ea5e9"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                  <input
                    type="color"
                    defaultValue="#0369a1"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Enable Maintenance Mode</p>
                    <p className="text-sm text-gray-600">Temporarily disable public access to your club</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                    Enable
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
