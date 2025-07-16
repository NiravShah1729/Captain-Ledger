// src/pages/Dashboard.jsx
import React from "react";
import {useAppContext} from "react";
// Dashboard Page
const Dashboard = () => {
    const { transactions, attendanceData, feedback } = useAppContext();
    
    const stats = [
      { label: 'Total Transferred', value: `₹${transactions.reduce((sum, t) => sum + t.amount, 0)}`, icon: DollarSign, color: 'from-green-400 to-emerald-600' },
      { label: 'Attendance Rate', value: `${Math.round((attendanceData.attendees.length / attendanceData.totalMembers) * 100)}%`, icon: Users, color: 'from-blue-400 to-cyan-600' },
      { label: 'Feedback Count', value: feedback.length, icon: MessageCircle, color: 'from-purple-400 to-pink-600' },
      { label: 'Active Missions', value: '2', icon: Target, color: 'from-red-400 to-orange-600' }
    ];
  
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Mission Control Dashboard
          </h1>
          <div className="mt-4 sm:mt-0 text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6 hover:scale-105 transition-transform">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
  
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 size={20} className="mr-2" />
              Monthly Transfers
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">(Chart.js integration)</p>
              </div>
            </div>
          </GlassCard>
  
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users size={20} className="mr-2" />
              Team Attendance
            </h3>
            <div className="space-y-3">
              {attendanceData.attendees.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{member}</span>
                  </div>
                  <span className="text-sm text-gray-400">Present</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    );
  };

  export default Dashboard;
