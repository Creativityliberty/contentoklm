import React, { useState, useEffect, useContext } from 'react';
import type { Post, Pillar, BrandVoice, View, PostStatus, BrandDiscoveryResult } from './types';
import { PostEditor } from './components/PostEditor';
import CampaignArchitectModal from './components/CampaignArchitectModal';
import Sidebar from './components/Sidebar';
import PostsView from './components/views/PostsView';
import ConnectionsView from './components/views/ConnectionsView';
import AnalyticsView from './components/views/AnalyticsView';
import UsersView from './components/views/UsersView';
import ApiKeysView from './components/views/ApiKeysView';
import ApiDocsView from './components/views/ApiDocsView';
import { SparkleIcon, LoaderIcon, BrainCircuitIcon, MenuIcon, LinkIcon, RocketLaunchIcon } from './components/icons';
import { AppContext } from './contexts/AppContext';
import { PostsContext } from './contexts/PostsContext';
import { ToastContext } from './contexts/ToastContext';
import { discoverBrandFromUrl } from './services/geminiService';
import Toast from './components/Toast';

const VoiceSlider: React.FC<{label: string, left: string, right: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, left, right, value, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        <input 
            type="range" min="-1" max="1" step="0.1" value={value} onChange={onChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{left}</span>
            <span>{right}</span>
        </div>
    </div>
);

const Onboarding: React.FC = () => {
    const { onboardingComplete } = useContext(AppContext)!;
    const { addToast } = useContext(ToastContext)!;

    const [step, setStep] = useState(1);
    const [url, setUrl] = useState('');
    const [initialNiche, setInitialNiche] = useState('');
    const [discoveryResult, setDiscoveryResult] = useState<BrandDiscoveryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUrlSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim() || initialNiche.trim()) {
            setIsLoading(true);
            try {
                const result = await discoverBrandFromUrl(initialNiche.trim(), url.trim());
                setDiscoveryResult(result);
                setStep(2);
            } catch (error) {
                addToast((error as Error).message, 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleValidationConfirm = () => {
        if (!discoveryResult) return;
        const { summary, ...voiceSettings } = discoveryResult.voiceAnalysis;
        const pillarsWithIds = discoveryResult.pillars.map((p, i) => ({ ...p, id: i }));
        onboardingComplete(discoveryResult.niche, pillarsWithIds, voiceSettings);
    };

    const handlePillarNameChange = (index: number, newName: string) => {
      if (!discoveryResult) return;
      const newPillars = [...discoveryResult.pillars];
      newPillars[index].name = newName;
      setDiscoveryResult({ ...discoveryResult, pillars: newPillars });
    };
    
    const handleVoiceChange = (key: keyof BrandVoice, value: number) => {
      if (!discoveryResult) return;
      setDiscoveryResult({
        ...discoveryResult,
        voiceAnalysis: { ...discoveryResult.voiceAnalysis, [key]: value }
      });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl transition-all">
                {step === 1 ? <SparkleIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" /> : <BrainCircuitIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />}
                {step === 1 ? (
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Your AI Content Planner</h1>
                        <p className="text-slate-500 mb-6 text-center">Let's discover your brand. Enter your website URL for an instant analysis.</p>
                        <form onSubmit={handleUrlSubmit} className="space-y-4">
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                             <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourbrand.com (optional)" className="w-full p-3 pl-10 border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"/>
                          </div>
                          <div className="relative flex items-center">
                              <span className="flex-grow border-t border-slate-200"></span><span className="mx-4 text-xs font-semibold text-slate-400">OR</span><span className="flex-grow border-t border-slate-200"></span>
                          </div>
                           <input type="text" value={initialNiche} onChange={(e) => setInitialNiche(e.target.value)} placeholder="Describe your niche manually" className="w-full text-center p-3 border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"/>
                          <button type="submit" disabled={isLoading || (!url.trim() && !initialNiche.trim())} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2">
                            {isLoading ? <><LoaderIcon className="animate-spin"/> Discovering Brand...</> : "Start Discovery"}
                          </button>
                        </form>
                    </div>
                ) : discoveryResult && (
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Brand Profile Discovered!</h1>
                        <p className="text-slate-500 mb-6 text-center">AI has pre-configured your planner. Review and adjust as needed.</p>
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto p-1 pr-4">
                            <div><h3 className="text-lg font-semibold text-slate-700 mb-2">Refined Niche</h3><p className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-slate-800">{discoveryResult.niche}</p></div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">Content Pillars</h3>
                                <div className="space-y-3">{discoveryResult.pillars.map((pillar, index) => (<div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${pillar.color}`}><span className="text-2xl">{pillar.emoji}</span><input type="text" value={pillar.name} onChange={(e) => handlePillarNameChange(index, e.target.value)} className="w-full bg-transparent font-semibold text-slate-800 border-b-2 border-black/10 focus:outline-none focus:border-black/30"/></div>))}</div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">Voice Profile</h3>
                                <p className="text-slate-500 mb-4 text-sm italic p-3 bg-slate-100 rounded-lg border border-slate-200">"{discoveryResult.voiceAnalysis.summary}"</p>
                                <div className="space-y-4">
                                    <VoiceSlider label="Formality" left="Casual" right="Formal" value={discoveryResult.voiceAnalysis.formality} onChange={(e) => handleVoiceChange('formality', parseFloat(e.target.value))} />
                                    <VoiceSlider label="Humor" left="Serious" right="Humorous" value={discoveryResult.voiceAnalysis.humor} onChange={(e) => handleVoiceChange('humor', parseFloat(e.target.value))} />
                                    <VoiceSlider label="Tone" left="Direct" right="Poetic" value={discoveryResult.voiceAnalysis.tone} onChange={(e) => handleVoiceChange('tone', parseFloat(e.target.value))} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleValidationConfirm} className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">Confirm & Start Planning!</button>
                    </div>
                )}
            </div>
        </div>
    );
};

function AppContent() {
    const { niche } = useContext(AppContext)!;
    // FIX: Refactor state management for editingPostId.
    // The state now lives in AppContent, which is the correct component to manage it.
    // The original implementation had a broken state flow causing the PostEditor not to open.
    const postsContext = useContext(PostsContext)!;
    const { posts } = postsContext;
    
    const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
    const [activeView, setActiveView] = useState<View>('posts');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hasSelectedKey, setHasSelectedKey] = useState(false);
    const [isCheckingKey, setIsCheckingKey] = useState(true);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);


    useEffect(() => {
        const checkApiKey = async () => {
            setIsCheckingKey(true);
            if (await window.aistudio.hasSelectedApiKey()) {
                setHasSelectedKey(true);
            }
            setIsCheckingKey(false);
        }
        checkApiKey();
    }, []);

    const handleSelectKey = async () => {
        await window.aistudio.openSelectKey();
        setHasSelectedKey(true);
    }

    const handleNavigate = (view: View) => {
        setActiveView(view);
        setIsSidebarOpen(false);
    };
    
    // FIX: Create a new context value that overrides setEditingPostId with our local state setter.
    // This allows child components (like PostsView) to update the state that lives in AppContent.
    const newPostsContextValue = {
        ...postsContext,
        setEditingPostId: setEditingPostId,
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'posts': return <PostsView onOpenCampaignModal={() => setIsCampaignModalOpen(true)} />;
            case 'connections': return <ConnectionsView />;
            case 'analytics': return <AnalyticsView />;
            case 'users': return <UsersView />;
            case 'apiKeys': return <ApiKeysView />;
            case 'apiDocs': return <ApiDocsView />;
            default: return <PostsView onOpenCampaignModal={() => setIsCampaignModalOpen(true)} />;
        }
    };

    if (!niche) {
        return <Onboarding />;
    }

    if (isCheckingKey) {
        return <div className="flex items-center justify-center min-h-screen"><LoaderIcon className="w-12 h-12 animate-spin text-indigo-500" /></div>;
    }

    if (!hasSelectedKey) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 text-center">
                <RocketLaunchIcon className="w-16 h-16 text-indigo-500 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Video Generation Requires API Key</h1>
                <p className="text-slate-600 max-w-md mb-6">To use advanced video features (Veo), select an API key. Your key is stored securely.</p>
                <p className="text-xs text-slate-500 mb-6">For billing info, visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">ai.google.dev/gemini-api/docs/billing</a>.</p>
                <button onClick={handleSelectKey} className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">Select API Key</button>
            </div>
        );
    }

    const editingPost = posts.find(p => p.id === editingPostId) ?? null;

    return (
        // FIX: Provide the new context value to all child components.
        <PostsContext.Provider value={newPostsContextValue}>
            <div className="min-h-screen bg-slate-100 font-sans flex">
                <Sidebar activeView={activeView} onNavigate={handleNavigate} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col h-screen md:ml-64">
                    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600"><MenuIcon className="w-6 h-6" /></button>
                            <div className="hidden md:block"></div>
                            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"><span className="font-semibold">Niche:</span> {niche}</div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto">{renderActiveView()}</main>
                </div>
                
                <PostEditor post={editingPost} onClose={() => setEditingPostId(null)} />
                <CampaignArchitectModal isOpen={isCampaignModalOpen} onClose={() => setIsCampaignModalOpen(false)} />
                <Toast />
            </div>
        </PostsContext.Provider>
    );
}

export default AppContent;