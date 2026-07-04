"use client";

import  Navbar  from "../../components/nav";
import Sidebar from "../../components/sidebar"

const AdminDashboard = () => {
  return (
      <main className="p-6">

          {/* Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500">Users</p>
                <p className="text-xl font-semibold text-gray-800">1,245</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-xl font-semibold text-gray-800">₹92,000</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500">Orders</p>
                <p className="text-xl font-semibold text-gray-800">320</p>
              </div>

            </div>
          </div>

      </main>
  );
};

export default AdminDashboard;