import React from 'react';
import { UsersIcon, SparkleIcon, RefreshIcon } from '../icons';

const UsersView = () => {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
            <UsersIcon className="w-8 h-8 text-slate-500" />
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Users</h2>
                <p className="text-slate-600">Invite others to your account.</p>
            </div>
        </div>

        <div className="space-y-8">
            {/* Invite Link Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 mb-2">Invite Link</h3>
                <p className="text-sm text-slate-600 mb-4">Share this link with anyone you want to invite. Choose whether to give them access to all profiles or just one specific profile.</p>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="access-level" className="block text-sm font-medium text-slate-700 mb-1">Invite access level:</label>
                        <select id="access-level" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Full access (all profiles)</option>
                            <option>Select profiles...</option>
                        </select>
                    </div>
                     <p className="text-xs text-slate-500">Click "Generate link" to create a short invite URL.</p>
                    <button className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Generate link
                    </button>
                </div>
            </div>

             {/* Team Members Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-slate-800">Team Members</h3>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5">
                        <RefreshIcon className="w-4 h-4" /> Refresh
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                        <div>
                            <p className="font-semibold text-slate-800">Lionel (Vous)</p>
                            <p className="text-sm text-slate-500">numtemalionel@gmail.com</p>
                        </div>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">Owner</span>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <h3 className="font-bold text-lg text-red-700">Danger zone</h3>
                <p className="text-sm text-slate-600 mt-2 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <button className="text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg">
                    Delete your account
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UsersView;