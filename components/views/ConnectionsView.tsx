import React from 'react';
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, LinkedInIcon, XIcon, ThreadsIcon, PinterestIcon, RedditIcon, BlueskyIcon, PlusIcon } from '../icons';

const platforms = [
  { name: 'Instagram', icon: <InstagramIcon className="w-8 h-8 text-white" /> },
  { name: 'TikTok', icon: <TikTokIcon className="w-8 h-8 text-white" /> },
  { name: 'Facebook', icon: <FacebookIcon className="w-8 h-8 text-white" /> },
  { name: 'YouTube', icon: <YouTubeIcon className="w-8 h-8 text-white" /> },
  { name: 'LinkedIn', icon: <LinkedInIcon className="w-8 h-8 text-white" /> },
  { name: 'X', icon: <XIcon className="w-8 h-8 text-white" /> },
  { name: 'Threads', icon: <ThreadsIcon className="w-8 h-8 text-white" /> },
  { name: 'Pinterest', icon: <PinterestIcon className="w-8 h-8 text-white" /> },
  { name: 'Reddit', icon: <RedditIcon className="w-8 h-8 text-white" /> },
  { name: 'Bluesky', icon: <BlueskyIcon className="w-8 h-8 text-white" /> },
];

const ConnectionsView = () => {
  return (
    <div className="py-10 bg-slate-900 text-white min-h-full">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Select a platform to connect</h2>
        <p className="text-slate-400 text-center mb-10">Connecter un compte permet à notre IA d'apprendre votre voix unique et de vous donner des conseils sur-mesure.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center aspect-square cursor-pointer group hover:bg-white/10 transition-all duration-300">
              {platform.icon}
              <span className="mt-4 text-sm font-semibold text-slate-300">{platform.name}</span>
              <button className="mt-auto text-xs font-bold bg-white/10 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <PlusIcon className="w-3 h-3"/> Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsView;