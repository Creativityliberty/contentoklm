import React, { useState, useEffect } from 'react';
import type { Post, Pillar, BrandVoice, VisualHarmonyAnalysis, VoiceConsistencyAnalysis } from '../../types';
import GridPlanner from '../GridPlanner';
import StrategicAnalysisDashboard from '../StrategicAnalysisDashboard';
import CampaignsDisplay from './CampaignsDisplay'; // Import the new component
import { TargetIcon, RocketLaunchIcon, GridIcon, MapIcon } from '../icons';
import { analyzeVisualHarmony, analyzeVoiceConsistency } from '../../services/geminiService';


interface PostsViewProps {
    posts: Post[];
    pillars: Pillar[];
    brandVoice: BrandVoice;
    niche: string;
    onSelectPost: (id: number) => void;
    onOpenCampaignModal: () => void;
}

type PostSubView = 'grid' | 'campaigns';

const PostsView: React.FC<PostsViewProps> = ({ posts, pillars, brandVoice, niche, onSelectPost, onOpenCampaignModal }) => {
    const [visualHarmony, setVisualHarmony] = useState<VisualHarmonyAnalysis | null>(null);
    const [voiceConsistency, setVoiceConsistency] = useState<VoiceConsistencyAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState<PostSubView>('grid');

    useEffect(() => {
        const analyzeGrid = async () => {
            if (!brandVoice) return;
            setIsAnalyzing(true);
            const [harmonyResult, voiceResult] = await Promise.all([
                analyzeVisualHarmony(posts),
                analyzeVoiceConsistency(posts, brandVoice)
            ]);
            setVisualHarmony(harmonyResult);
            setVoiceConsistency(voiceResult);
            setIsAnalyzing(false);
        };

        analyzeGrid();
    }, [posts, brandVoice]);

    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-2"><TargetIcon /> POSTS : Votre Champ de Bataille Créatif</h2>
                        <p className="text-slate-600">Planifiez vos posts, lancez des campagnes et obtenez des analyses stratégiques en temps réel.</p>
                    </div>
                    <button
                        onClick={onOpenCampaignModal}
                        className="flex-shrink-0 flex items-center justify-center gap-3 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-6 py-4 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg"
                    >
                        <RocketLaunchIcon className="w-6 h-6"/>
                        <span>Lancer une Campagne IA</span>
                    </button>
                </div>
                
                {/* Tabs for Grid/Campaigns */}
                <div className="mb-6 border-b border-slate-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('grid')}
                            className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'grid'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <GridIcon className="w-5 h-5" />
                            Grid
                        </button>
                        <button
                             onClick={() => setActiveTab('campaigns')}
                            className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'campaigns'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <MapIcon className="w-5 h-5" />
                           Campagnes
                        </button>
                    </nav>
                </div>


                {activeTab === 'grid' && (
                    <>
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Analyse de la grille actuelle :</h3>
                        </div>
                        <StrategicAnalysisDashboard
                            posts={posts}
                            pillars={pillars}
                            visualHarmony={visualHarmony}
                            voiceConsistency={voiceConsistency}
                            isLoading={isAnalyzing}
                        />
                         <GridPlanner posts={posts} pillars={pillars} onSelectPost={onSelectPost} />
                    </>
                )}

                {activeTab === 'campaigns' && (
                    <CampaignsDisplay posts={posts} pillars={pillars} onSelectPost={onSelectPost} />
                )}
            </div>
        </div>
    );
};

export default PostsView;