import React from 'react';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, LinkedInIcon, XIcon, ThreadsIcon, PinterestIcon, RedditIcon, BlueskyIcon, PlusIcon, PencilIcon } from '../icons';

const platforms = [
  { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, connected: false },
  { name: 'TikTok', icon: <TikTokIcon className="w-6 h-6" />, connected: false },
  { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, connected: false },
  { name: 'YouTube', icon: <YouTubeIcon className="w-6 h-6" />, connected: false },
  { name: 'LinkedIn', icon: <LinkedInIcon className="w-6 h-6" />, connected: false },
  { name: 'X (Twitter)', icon: <XIcon className="w-6 h-6" />, connected: false },
  { name: 'Threads', icon: <ThreadsIcon className="w-6 h-6" />, connected: false },
  { name: 'Pinterest', icon: <PinterestIcon className="w-6 h-6" />, connected: false },
  { name: 'Reddit', icon: <RedditIcon className="w-6 h-6" />, connected: false },
  { name: 'Bluesky', icon: <BlueskyIcon className="w-6 h-6" />, connected: false },
];

const ConnectionsView = () => {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Connections</h2>
                <p className="text-slate-600">Manage profiles and platform integrations.</p>
            </div>
            <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                <span>New Profile</span>
            </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Profiles Section */}
            <div className="lg:col-span-1">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-3 px-2">Select Profile</h3>
                    <div className="space-y-1">
                        <div className="bg-indigo-100 text-indigo-700 p-3 rounded-md font-semibold cursor-pointer">
                            <p>Default Profile</p>
                            <p className="text-xs font-normal">default</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platforms Section */}
            <div className="lg:col-span-2">
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Default Profile</h3>
                            <p className="text-sm text-slate-500">Your default profile</p>
                            <p className="text-xs text-slate-400 mt-1">profile id: 69175e4b9d71f194900a25d2</p>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5">
                            <PencilIcon className="w-4 h-4" /> Edit
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-600 mt-4">Platforms for Default Profile</h4>
                        {platforms.map((platform) => (
                            <div key={platform.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-600">{platform.icon}</div>
                                    <span className="font-semibold text-slate-800">{platform.name}</span>
                                </div>
                                <button className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1">
                                    <PlusIcon className="w-4 h-4" /> Connect
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsView;