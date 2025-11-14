import React from 'react';
import { BarChartIcon, RocketLaunchIcon } from '../icons';

const AnalyticsView = () => {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200">
            <BarChartIcon className="w-16 h-16 text-indigo-500 mx-auto mb-6"/>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Analytics Add-on Required</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                Get access to powerful analytics to track your posts' performance across all platforms. Track both posts scheduled through AI Planner and external posts from your connected accounts.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left mb-10">
                <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-800 mb-2">Complete Performance Tracking</h3>
                    <p className="text-sm text-slate-600">Track external posts from your connected accounts.</p>
                </div>
                 <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-800 mb-2">Auto-Sync</h3>
                    <p className="text-sm text-slate-600">Automatic sync of analytics data from all connected platforms.</p>
                </div>
                 <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-800 mb-2">Best Performing Content</h3>
                    <p className="text-sm text-slate-600">Identify your top-performing posts and optimize your strategy.</p>
                </div>
            </div>

             <button className="w-full max-w-xs mx-auto bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all text-base flex items-center justify-center gap-2">
                <RocketLaunchIcon className="w-5 h-5" />
                Upgrade to Creator - $19/mo
            </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;