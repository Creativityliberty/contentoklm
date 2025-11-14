import React from 'react';
import { HomeIcon, SparkleIcon, InstagramIcon, BarChartIcon, UsersIcon, KeyIcon, BookOpenIcon, RocketLaunchIcon, XIcon } from './icons';
import { View } from '../types';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive, onClick }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-200'}`}>
        {icon}
        <span>{label}</span>
    </a>
);

interface SidebarProps {
    activeView: View;
    onNavigate: (view: View) => void;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, onClose }) => {

    const sidebarContent = (
        <>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <SparkleIcon className="w-8 h-8 text-indigo-500"/>
                    <h1 className="text-xl font-bold text-slate-800">AI Planner</h1>
                </div>
                 <button onClick={onClose} className="md:hidden p-2 -mr-2 text-slate-500">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-6">
                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">MAIN</h3>
                    <div className="space-y-1">
                        <NavLink icon={<HomeIcon className="w-5 h-5"/>} label="Posts" isActive={activeView === 'posts'} onClick={() => onNavigate('posts')}/>
                        <NavLink icon={<InstagramIcon className="w-5 h-5"/>} label="Connections" isActive={activeView === 'connections'} onClick={() => onNavigate('connections')}/>
                        <NavLink icon={<BarChartIcon className="w-5 h-5"/>} label="Analytics" isActive={activeView === 'analytics'} onClick={() => onNavigate('analytics')}/>
                    </div>
                </div>
                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Studio</h3>
                     <div className="space-y-1">
                        <NavLink icon={<UsersIcon className="w-5 h-5"/>} label="Users" isActive={activeView === 'users'} onClick={() => onNavigate('users')}/>
                        <NavLink icon={<KeyIcon className="w-5 h-5"/>} label="API Keys" isActive={activeView === 'apiKeys'} onClick={() => onNavigate('apiKeys')}/>
                    </div>
                </div>
                 <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">RESOURCES</h3>
                     <div className="space-y-1">
                        <NavLink icon={<BookOpenIcon className="w-5 h-5"/>} label="API Docs" isActive={activeView === 'apiDocs'} onClick={() => onNavigate('apiDocs')}/>
                    </div>
                </div>
            </nav>
            
            <div className="p-4 border-t border-slate-200">
                <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">USAGE</h3>
                <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-slate-800">Free Plan</span>
                        <span className="text-sm font-bold text-slate-800">0/10 posts</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Resets on Dec 14, 2025</p>
                    
                    <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg mb-4">
                        <p className="text-sm font-bold mb-1">🎁 Get +20 FREE posts</p>
                        <p className="text-xs">Unlimited invites →</p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-2.5 px-4 rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2">
                        <RocketLaunchIcon className="w-4 h-4" />
                        Upgrade to Build - $19/mo
                    </button>
                </div>
            </div>
        </>
    );
    
    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            </div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </div>
            
            {/* Desktop Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex-col h-screen fixed top-0 left-0 hidden md:flex">
                {sidebarContent}
            </div>
        </>
    );
};

export default Sidebar;