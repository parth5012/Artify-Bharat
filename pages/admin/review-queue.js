import AppLayout from '../../components/AppLayout'
import { useState } from 'react'

export default function AdminReviewQueue() {
  const [filter, setFilter] = useState('all')
  
  const submissions = [
    { id: 1, artisan: 'Kisan Patel', product: 'Terracotta Vase', category: 'Pottery', submitted: '2h ago', status: 'pending', image: '🏺', aiScore: 94 },
    { id: 2, artisan: 'Sunita Devi', product: 'Handwoven Basket', category: 'Weaving', submitted: '5h ago', status: 'pending', image: '🧺', aiScore: 91 },
    { id: 3, artisan: 'Ramesh Kumar', product: 'Clay Diya Set', category: 'Pottery', submitted: '1d ago', status: 'pending', image: '🪔', aiScore: 88 },
    { id: 4, artisan: 'Priya Sharma', product: 'Silver Necklace', category: 'Jewellery', submitted: '2d ago', status: 'approved', image: '📿', aiScore: 96 },
    { id: 5, artisan: 'Amit Singh', product: 'Wooden Carving', category: 'Carving', submitted: '3d ago', status: 'approved', image: '🗿', aiScore: 92 },
  ]

  const filteredSubmissions = filter === 'all' ? submissions : submissions.filter(s => s.status === filter)

  const handleApprove = (id) => {
    console.log('Approved:', id)
  }

  const handleReject = (id) => {
    console.log('Rejected:', id)
  }

  return (
    <AppLayout currentPage="admin">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-3xl">👑</span>
              <h2 className="text-3xl font-bold text-[#3d3021] font-display">Admin Review Queue</h2>
            </div>
            <p className="text-[#6d5a3d]">Review and approve artisan product submissions</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">{submissions.filter(s => s.status === 'pending').length}</div>
              <div className="text-sm text-[#6d5a3d]">Pending Review</div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">{submissions.filter(s => s.status === 'approved').length}</div>
              <div className="text-sm text-[#6d5a3d]">Approved</div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 text-center">
              <div className="text-3xl font-bold text-[#c2794d] mb-1">{submissions.length}</div>
              <div className="text-sm text-[#6d5a3d]">Total Submissions</div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
              <div className="text-sm text-[#6d5a3d]">Avg AI Score</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-xl transition-all duration-200 text-sm font-medium capitalize ${
                  filter === status
                    ? 'bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white shadow-md'
                    : 'bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] hover:border-[#c2794d]'
                }`}
              >
                {status}
                {status !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-white/30 rounded-full text-xs">
                    {submissions.filter(s => s.status === status).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Submissions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 overflow-hidden hover:shadow-warm transition-all">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] flex items-center justify-center relative">
                  <div className="text-8xl">{submission.image}</div>
                  {/* AI Score Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 rounded-lg border border-[#c2794d]/40 flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-[#c2794d]">AI: {submission.aiScore}%</span>
                  </div>
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold ${
                    submission.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    submission.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {submission.status}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3d3021] mb-2">{submission.product}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#6d5a3d]">Artisan:</span>
                      <span className="font-medium text-[#3d3021]">{submission.artisan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6d5a3d]">Category:</span>
                      <span className="font-medium text-[#3d3021]">{submission.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6d5a3d]">Submitted:</span>
                      <span className="font-medium text-[#3d3021]">{submission.submitted}</span>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium">
                      🤖 AI detected handmade patterns with {submission.aiScore}% confidence
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {submission.status === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReject(submission.id)}
                        className="flex-1 py-2.5 bg-red-50 border-2 border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition-colors"
                      >
                        ✕ Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(submission.id)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-md transition-all"
                      >
                        ✓ Approve
                      </button>
                    </div>
                  )}
                  {submission.status === 'approved' && (
                    <div className="py-2.5 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-semibold rounded-lg text-center">
                      ✓ Approved & Published
                    </div>
                  )}
                  {submission.status === 'rejected' && (
                    <div className="py-2.5 bg-red-50 border-2 border-red-200 text-red-700 font-semibold rounded-lg text-center">
                      ✕ Rejected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-[#3d3021] mb-2">No submissions found</h3>
              <p className="text-[#6d5a3d]">There are no {filter} submissions at the moment</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}