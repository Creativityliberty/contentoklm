import React, { useContext } from 'react';
import type { Post, Pillar, VisualHarmonyAnalysis, VoiceConsistencyAnalysis } from '../types';
import { EyeIcon, MicrophoneIcon, BalanceIcon, CheckIcon, LoaderIcon, ThumbsUpIcon } from './icons';
import { PostsContext } from '../contexts/PostsContext';
import { AppContext } from '../contexts/AppContext';

interface AnalysisCardProps {
    icon: React.ReactNode;
    title: string;
    score: string;
    scoreColor: string;
    feedback: string;
    isLoading: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ icon, title, score, scoreColor, feedback, isLoading }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80 flex-1 min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h4 className="font-semibold text-slate-700">{title}</h4>
        </div>
        {isLoading ? (
            <div className="flex items-center gap-2 text-slate-500">
                <LoaderIcon className="w-4 h-4 animate-spin" />
                <span className="text-sm">Analyzing...</span>
            </div>
        ) : (
            <div>
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${scoreColor}`}>
                    {score === 'Excellente' && <CheckIcon className="w-3.5 h-3.5" />}
                    {score === 'Constante' && <ThumbsUpIcon className="w-3.5 h-3.5" />}
                    {score}
                </div>
                <p className="text-xs text-slate-500 mt-2">{feedback}</p>
            </div>
        )}
    </div>
);


const PillarAnalysis: React.FC = () => {
    const { posts } = useContext(PostsContext)!;
    const { pillars } = useContext(AppContext)!;

    if (pillars.length === 0) return null;

    const pillarCounts = pillars.map(pillar => ({
        ...pillar,
        count: posts.filter(post => post.pillarId === pillar.id && post.status === 'draft').length
    }));
    
    const unassignedCount = posts.filter(p => p.status === 'draft' && p.pillarId === undefined).length;
    const missingPillars = pillars.filter(p => !posts.some(post => post.pillarId === p.id && post.status === 'draft'));

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-3">
                <BalanceIcon className="w-5 h-5 text-slate-500" />
                <h4 className="font-semibold text-slate-700">Équilibre des Piliers</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {pillarCounts.map(p => (
                    <div key={p.id} className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium text-slate-800 ${p.color}`}>
                        {p.emoji} {p.name}
                        <span className="px-1.5 py-0.5 bg-black/10 rounded-full text-[10px] font-bold">{p.count}</span>
                    </div>
                ))}
                {unassignedCount > 0 && (
                     <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium text-slate-800 bg-slate-200">
                        Non assigné
                        <span className="px-1.5 py-0.5 bg-black/10 rounded-full text-[10px] font-bold">{unassignedCount}</span>
                    </div>
                )}
            </div>
            {missingPillars.length > 0 && (
                <p className="text-xs text-amber-700 mt-3 bg-amber-100 p-2 rounded-md">
                    <strong>Attention:</strong> Le pilier '{missingPillars[0].name}' n'est pas utilisé. Voulez-vous une suggestion pour rééquilibrer ?
                </p>
            )}
        </div>
    );
};


interface StrategicAnalysisDashboardProps {
    visualHarmony?: VisualHarmonyAnalysis | null;
    voiceConsistency?: VoiceConsistencyAnalysis | null;
    isLoading: boolean;
}

const StrategicAnalysisDashboard: React.FC<StrategicAnalysisDashboardProps> = ({ visualHarmony, voiceConsistency, isLoading }) => {
    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <AnalysisCard 
                    icon={<EyeIcon className="w-5 h-5 text-sky-500"/>}
                    title="Harmonie Visuelle"
                    score={visualHarmony?.score ?? ''}
                    scoreColor={visualHarmony?.score === 'Excellente' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                    feedback={visualHarmony?.feedback ?? ''}
                    isLoading={isLoading}
                />
                <AnalysisCard 
                    icon={<MicrophoneIcon className="w-5 h-5 text-violet-500"/>}
                    title="Voix de Marque"
                    score={voiceConsistency?.score ?? ''}
                    scoreColor={voiceConsistency?.score === 'Constante' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                    feedback={voiceConsistency?.feedback ?? ''}
                    isLoading={isLoading}
                />
            </div>
            <PillarAnalysis />
        </div>
    );
};

export default StrategicAnalysisDashboard;