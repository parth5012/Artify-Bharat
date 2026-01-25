// ## pages/artisan/orders.js
// ````javascript
import AppLayout from '../../components/AppLayout'
import { useState } from 'react'

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all')
  
  const orders = [
    { id: '#011', buyer: 'Joan Proctor Urn', location: 'Mumbai, Maharashtra', amount: 1349, time: '2h ago', status: 'pending', product: '🏺' },
    { id: '#502', buyer: 'Santanu Das', location: 'Delhi, NCR', amount: 2450, time: '6.34h ago', status: 'pending', product: '🧺' },
    { id: '#204', buyer: 'Sunaina Nath', location: 'Bangalore, Karnataka', amount: 3670, time: '7h ago', status: 'confirmed', product: '🪔' },
    { id: '#156', buyer: 'Ramesh Kumar', location: 'Jaipur, Rajasthan', amount: 890, time: '1d ago', status: 'shipped', product: '📿' },
    { id: '#089', buyer: 'Priya Singh', location: 'Pune, Maharashtra', amount: 1200, time: '2d ago', status: 'completed', product: '🧣' },
    { id: '#045', buyer: 'Arjun Reddy', location: 'Hyderabad, Telangana', amount: 560, time: '3d ago', status: 'completed', product: '🏺' },
  ]

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
  ]

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab)

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: '⏳', color: 'from-amber-500 to-amber-600' },
    { label: 'Revenue', value: `₹${Math.round(orders.reduce((sum, o) => sum + o.amount, 0) / 1000)}K`, icon: '💰', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: '✓', color: 'from-[#c2794d] to-[#8b6f47]' },
  ]

  return (
    <AppLayout currentPage="orders">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">Order Management</h2>
              <p className="text-[#6d5a3d]">Track and manage your product orders</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <select 
                value={selectedTimeFilter}
                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-[#d4c5b0]/50 rounded-xl text-sm font-medium text-[#3d3021] focus:outline-none focus:border-[#c2794d]"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                Export Data
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-4 md:p-6 shadow-sm hover:shadow-warm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-md`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#3d3021] mb-1 font-display">{stat.value}</div>
                <div className="text-xs md:text-sm text-[#6d5a3d]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-2 mb-6 shadow-sm overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-4 md:px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white shadow-md'
                      : 'text-[#6d5a3d] hover:bg-[#f8f6f3]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white/30' : 'bg-[#d4c5b0]/40'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table - Desktop */}
          <div className="hidden md:block bg-white rounded-2xl border-2 border-[#d4c5b0]/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8f6f3] border-b-2 border-[#d4c5b0]/40">
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Order ID</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Buyer Details</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Location</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Amount</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Time</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-[#3d3021]">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-bold text-[#3d3021]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4c5b0]/30">
                  {filteredOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-[#f8f6f3]/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] rounded-lg flex items-center justify-center border-2 border-[#d4c5b0]/50">
                            <span className="text-xl">{order.product}</span>
                          </div>
                          <span className="font-semibold text-[#3d3021]">{order.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-medium text-[#3d3021]">{order.buyer}</div>
                        <div className="text-xs text-[#6d5a3d]">Customer ID: {order.id.slice(1)}</div>
                      </td>
                      <td className="px-6 py-5 text-[#6d5a3d] text-sm">{order.location}</td>
                      <td className="px-6 py-5">
                        <span className="font-bold text-[#c2794d]">₹{order.amount}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-[#6d5a3d]">{order.time}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end space-x-2">
                          {order.status === 'pending' && (
                            <>
                              <button className="px-4 py-2 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 text-[#3d3021] text-sm font-medium rounded-lg hover:bg-[#c2794d]/10 hover:border-[#c2794d] transition-all duration-200">
                                Verify
                              </button>
                              <button className="px-4 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200">
                                Confirm
                              </button>
                            </>
                          )}
                          {order.status === 'confirmed' && (
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-200">
                              Mark as Shipped
                            </button>
                          )}
                          {(order.status === 'shipped' || order.status === 'completed') && (
                            <button className="px-4 py-2 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 text-[#6d5a3d] text-sm font-medium rounded-lg hover:bg-[#f8f6f3] transition-all duration-200">
                              View Details
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t-2 border-[#d4c5b0]/40 bg-[#f8f6f3]/50">
              <p className="text-sm text-[#6d5a3d]">Showing 1-{filteredOrders.length} of {filteredOrders.length} orders</p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] font-medium rounded-lg hover:border-[#c2794d] transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg shadow-sm">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Orders Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {filteredOrders.map((order, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] rounded-lg flex items-center justify-center border-2 border-[#d4c5b0]/50">
                      <span className="text-2xl">{order.product}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#3d3021]">{order.id}</div>
                      <div className="text-xs text-[#6d5a3d]">{order.time}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6d5a3d]">Buyer:</span>
                    <span className="font-medium text-[#3d3021]">{order.buyer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6d5a3d]">Location:</span>
                    <span className="font-medium text-[#3d3021]">{order.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6d5a3d]">Amount:</span>
                    <span className="font-bold text-[#c2794d]">₹{order.amount}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button className="flex-1 py-2 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 text-[#3d3021] text-sm font-medium rounded-lg">
                        Verify
                      </button>
                      <button className="flex-1 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white text-sm font-semibold rounded-lg">
                        Confirm
                      </button>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-lg">
                      Mark as Shipped
                    </button>
                  )}
                  {(order.status === 'shipped' || order.status === 'completed') && (
                    <button className="w-full py-2 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 text-[#6d5a3d] text-sm font-medium rounded-lg">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}