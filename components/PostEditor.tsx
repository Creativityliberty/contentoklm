import React, { useState, useEffect, useCallback } from 'react';
import type { Post, ContentType, Pillar, BrandVoice, PerformancePrediction, AspectRatio, GroundingCitation } from '../types';
import { SparkleIcon, ImageIcon, ReelIcon, CarouselIcon, XIcon, LoaderIcon, RocketLaunchIcon, SquareIcon, RectangleVerticalIcon, RectangleHorizontalIcon, ImageEditIcon, LinkIcon, GoogleIcon } from './icons';
import { generateCaptions, generateHashtags, generateImage, predictPerformance, generateTopics, generateVideo, editImage } from '../services/geminiService';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const ContentTypeButton: React.FC<{ type: ContentType; icon: React.ReactNode; currentType: ContentType; onClick: (type: ContentType) => void; }> = ({ type, icon, currentType, onClick }) => (
    <button
        onClick={() => onClick(type)}
        className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${currentType === type ? 'bg-indigo-500 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}
    >
        {icon}
        <span className="text-sm font-medium">{type}</span>
    </button>
);

const AIButton: React.FC<{ onClick: () => void; isLoading: boolean; text: string; }> = ({ onClick, isLoading, text }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 px-4 py-2 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
        ) : (
            <SparkleIcon className="w-5 h-5" />
        )}
        <span>{text}</span>
    </button>
);

const PerformanceIndicator: React.FC<{ prediction: PerformancePrediction | null, isLoading: boolean }> = ({ prediction, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <LoaderIcon className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
            </div>
        );
    }

    if (!prediction || prediction.performanceScore === 0) return null;
    
    const scoreColor = prediction.performanceScore > 75 ? 'text-green-500' : prediction.performanceScore > 50 ? 'text-amber-500' : 'text-red-500';

    return (
        <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <RocketLaunchIcon className={`w-6 h-6 ${scoreColor}`} />
                    <span className="font-bold text-slate-700">Performance Predictor</span>
                </div>
                <div className={`text-2xl font-bold ${scoreColor}`}>
                    {prediction.performanceScore}/100
                </div>
            </div>
            <ul className="space-y-1">
                {prediction.feedback.map((tip, index) => (
                    <li key={index} className="text-xs text-slate-600 list-disc list-inside">{tip}</li>
                ))}
            </ul>
        </div>
    );
};

interface PostEditorProps {
    post: Post | null;
    niche: string;
    pillars: Pillar[];
    brandVoice: BrandVoice;
    onUpdatePost: (post: Post) => void;
    onClose: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, niche, pillars, brandVoice, onUpdatePost, onClose }) => {
    const [localPost, setLocalPost] = useState<Post | null>(post);
    const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
    const [generatedCaptions, setGeneratedCaptions] = useState<{caption: string, justification: string}[]>([]);
    const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);
    const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
    const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
    const [visualPrompt, setVisualPrompt] = useState('');
    const [isGeneratingTopics, setIsGeneratingTopics] = useState(false);
    const [generatedTopics, setGeneratedTopics] = useState<{topics: string[], citations: GroundingCitation[]} | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [editPrompt, setEditPrompt] = useState('');

    const [prediction, setPrediction] = useState<PerformancePrediction | null>(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const debouncedCaption = useDebounce(localPost?.caption ?? '', 1000);

    useEffect(() => {
        setLocalPost(post);
        if (post) {
            setVisualPrompt(post.topic);
            setAspectRatio(post.contentType === 'Reel' ? '9:16' : '1:1');
        }
        setGeneratedCaptions([]);
        setGeneratedHashtags([]);
        setGeneratedTopics(null);
        setPrediction(null);
        setEditPrompt('');
    }, [post]);

    useEffect(() => {
        const getPrediction = async () => {
            if (debouncedCaption.trim().length > 10) {
                setIsPredicting(true);
                const result = await predictPerformance(debouncedCaption, localPost!.contentType);
                setPrediction(result);
                setIsPredicting(false);
            } else {
                setPrediction(null);
            }
        };
        if(localPost) {
            getPrediction();
        }
    }, [debouncedCaption, localPost?.contentType]);


    if (!localPost) return null;

    const handleUpdate = <K extends keyof Post>(key: K, value: Post[K]) => {
        const updatedPost = { ...localPost!, [key]: value, status: 'draft' as 'draft' };
        setLocalPost(updatedPost);
        onUpdatePost(updatedPost);
    };

    const handleSave = () => {
        if (localPost) {
            onUpdatePost(localPost);
            onClose();
        }
    };

    const handleGenerateTopics = async (useGoogle: boolean) => {
        if (!niche) return;
        setIsGeneratingTopics(true);
        const result = await generateTopics(niche, useGoogle);
        setGeneratedTopics(prev => ({
            topics: [...result.topics, ...(prev?.topics ?? [])],
            citations: [...result.citations, ...(prev?.citations ?? [])]
        }));
        if (result.citations.length > 0) {
            handleUpdate('groundingCitations', [...(localPost.groundingCitations || []), ...result.citations]);
        }
        setIsGeneratingTopics(false);
    };

    const handleGenerateCaptions = async (useGoogle: boolean) => {
        if (!localPost.topic) return;
        setIsGeneratingCaptions(true);
        const { captions, citations } = await generateCaptions(localPost.topic, niche, brandVoice, useGoogle);
        setGeneratedCaptions(prev => [...captions, ...prev]);
        if (citations.length > 0) {
            handleUpdate('groundingCitations', [...(localPost.groundingCitations || []), ...citations]);
        }
        setIsGeneratingCaptions(false);
    };

    const handleGenerateHashtags = async () => {
        if (!localPost.caption) return;
        setIsGeneratingHashtags(true);
        const hashtags = await generateHashtags(localPost.caption);
        setGeneratedHashtags(prev => [...hashtags, ...prev]);
        setIsGeneratingHashtags(false);
    };
    
    const handleGenerateVisual = async () => {
        if (!visualPrompt) return;
        setIsGeneratingVisual(true);
        handleUpdate('imageUrl', null);
        handleUpdate('videoUrl', null);

        if (localPost.contentType === 'Reel') {
            const videoUrl = await generateVideo(visualPrompt, aspectRatio as '9:16' | '16:9');
            if(videoUrl) handleUpdate('videoUrl', videoUrl);
        } else {
            const imageUrl = await generateImage(visualPrompt, aspectRatio);
            if(imageUrl) handleUpdate('imageUrl', imageUrl);
        }
        setIsGeneratingVisual(false);
    };

    const handleEditImage = async () => {
        if (!editPrompt || !localPost.imageUrl) return;
        setIsEditingImage(true);
        const mimeType = localPost.imageUrl.substring(5, localPost.imageUrl.indexOf(';'));
        const newImageUrl = await editImage(localPost.imageUrl, mimeType, editPrompt);
        if (newImageUrl) {
            handleUpdate('imageUrl', newImageUrl);
        }
        setIsEditingImage(false);
    };
    
    const handleClearTopics = () => setGeneratedTopics(null);

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${post ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${post ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800">Edit Post</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
                            <XIcon className="w-6 h-6 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Content Type */}
                        <div>
                            <label className="text-sm font-semibold text-slate-600 mb-2 block">Content Type</label>
                            <div className="flex gap-2">
                                <ContentTypeButton type="Image" icon={<ImageIcon className="w-5 h-5"/>} currentType={localPost.contentType} onClick={(type) => handleUpdate('contentType', type)} />
                                <ContentTypeButton type="Reel" icon={<ReelIcon className="w-5 h-5"/>} currentType={localPost.contentType} onClick={(type) => handleUpdate('contentType', type)} />
                                <ContentTypeButton type="Carousel" icon={<CarouselIcon className="w-5 h-5"/>} currentType={localPost.contentType} onClick={(type) => handleUpdate('contentType', type)} />
                            </div>
                        </div>

                        {/* Pillar */}
                        {pillars.length > 0 && (
                             <div>
                                <label className="text-sm font-semibold text-slate-600 mb-2 block">Content Pillar</label>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {pillars.map(pillar => {
                                        const isSelected = localPost.pillarId === pillar.id;
                                        return (
                                            <button 
                                                key={pillar.id}
                                                onClick={() => handleUpdate('pillarId', isSelected ? undefined : pillar.id)}
                                                className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1.5 border-2 text-slate-800 font-medium ${pillar.color} ${isSelected ? 'border-slate-700 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                            >
                                                <span>{pillar.emoji}</span>
                                                <span>{pillar.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Visual */}
                        <div>
                            <label className="text-sm font-semibold text-slate-600 mb-2 block">Visual</label>
                            <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {isGeneratingVisual ? (
                                    <div className="flex flex-col items-center gap-2 text-slate-500">
                                        <LoaderIcon className="w-8 h-8 animate-spin"/>
                                        <p>Creating magic...</p>
                                        {localPost.contentType === 'Reel' && <p className="text-xs">(Video generation can take a few minutes)</p>}
                                    </div>
                                ) : localPost.imageUrl ? (
                                    <img src={localPost.imageUrl} alt={localPost.topic} className="w-full h-full object-cover"/>
                                ) : localPost.videoUrl ? (
                                    <video src={localPost.videoUrl} controls autoPlay muted loop className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-16 h-16 text-slate-400"/>
                                )}
                            </div>
                            <div className="mt-4 space-y-3">
                                <input
                                    type="text"
                                    value={visualPrompt}
                                    onChange={(e) => setVisualPrompt(e.target.value)}
                                    placeholder={localPost.contentType === 'Reel' ? "Describe the video you want to create..." : "Describe the image you want to create..."}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                 <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-slate-600">Aspect Ratio:</label>
                                    <div className="flex gap-2">
                                        {/* FIX: Wrapped the ternary expression in parentheses to ensure the type cast applies to the entire result. */}
                                        {((localPost.contentType === 'Reel' ? ['9:16', '16:9'] : ['1:1', '3:4', '4:3', '16:9']) as AspectRatio[]).map(ar => {
                                            const icons: Record<AspectRatio, React.ReactNode> = {
                                                '1:1': <SquareIcon className="w-5 h-5" />,
                                                '3:4': <RectangleVerticalIcon className="w-5 h-5" />,
                                                '4:3': <RectangleHorizontalIcon className="w-5 h-5" />,
                                                '16:9': <RectangleHorizontalIcon className="w-5 h-5" />,
                                                '9:16': <RectangleVerticalIcon className="w-5 h-5 transform" />
                                            };
                                            return (
                                                <button key={ar} onClick={() => setAspectRatio(ar)} title={ar} className={`p-2 rounded-lg ${aspectRatio === ar ? 'bg-indigo-500 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>
                                                    {icons[ar]}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <AIButton onClick={handleGenerateVisual} isLoading={isGeneratingVisual} text={localPost.imageUrl || localPost.videoUrl ? "Regenerate Visual" : "Generate Visual"} />
                                
                                {localPost.imageUrl && !isGeneratingVisual && (
                                    <div className="pt-3 border-t border-slate-200 space-y-2">
                                         <input
                                            type="text"
                                            value={editPrompt}
                                            onChange={(e) => setEditPrompt(e.target.value)}
                                            placeholder="Describe your edits, e.g., 'make the background blue'"
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <button onClick={handleEditImage} disabled={isEditingImage || !editPrompt} className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                            {isEditingImage ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <ImageEditIcon className="w-5 h-5" />}
                                            <span>Edit with AI</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Topic */}
                        <div>
                            <label htmlFor="topic" className="text-sm font-semibold text-slate-600 mb-2 block">Topic / Main Idea</label>
                            <input
                                id="topic"
                                type="text"
                                value={localPost.topic}
                                onChange={(e) => handleUpdate('topic', e.target.value)}
                                placeholder="e.g., 5 mistakes to avoid in your first year of business"
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="flex gap-2 mt-2">
                                 <button onClick={() => handleGenerateTopics(false)} disabled={isGeneratingTopics} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg transition-all disabled:opacity-50">
                                    {isGeneratingTopics ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparkleIcon className="w-5 h-5" />} Suggest Ideas
                                 </button>
                                 <button onClick={() => handleGenerateTopics(true)} disabled={isGeneratingTopics} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg transition-all disabled:opacity-50">
                                    {isGeneratingTopics ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <GoogleIcon className="w-5 h-5" />} Find Trends
                                 </button>
                            </div>
                             {generatedTopics && generatedTopics.topics.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-semibold">Suggestions:</p>
                                        <button onClick={handleClearTopics} className="text-xs font-semibold text-slate-500 hover:text-indigo-600">Clear</button>
                                    </div>
                                    {generatedTopics.topics.map((topic, index) => (
                                        <div key={index} className="p-2 bg-slate-100 rounded-lg text-sm border border-slate-200 flex justify-between items-center">
                                            <p className="whitespace-pre-wrap">{topic}</p>
                                            <button onClick={() => handleUpdate('topic', topic)} className="ml-2 text-xs font-bold text-indigo-600 hover:underline flex-shrink-0">Use this</button>
                                        </div>
                                    ))}
                                    {generatedTopics.citations && generatedTopics.citations.length > 0 && (
                                        <div className="mt-2 p-2 bg-slate-100 rounded-lg border border-slate-200">
                                            <h5 className="text-xs font-semibold text-slate-600 mb-1">Trending topics based on:</h5>
                                            <ul className="space-y-1">
                                                {generatedTopics.citations.map((citation, i) => (
                                                    <li key={i} className="text-xs">
                                                        <a href={citation.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-start gap-1.5">
                                                            <LinkIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                            <span className="truncate">{citation.title || citation.uri}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Caption */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="caption" className="text-sm font-semibold text-slate-600">Caption</label>
                                <PerformanceIndicator prediction={prediction} isLoading={isPredicting} />
                            </div>
                            <textarea
                                id="caption"
                                value={localPost.caption}
                                onChange={(e) => handleUpdate('caption', e.target.value)}
                                rows={6}
                                placeholder="Write your caption here or let AI help..."
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                             <div className="flex gap-2 mt-2">
                                 <button onClick={() => handleGenerateCaptions(false)} disabled={isGeneratingCaptions} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 px-4 py-2 rounded-lg transition-all disabled:opacity-50">
                                    {isGeneratingCaptions ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparkleIcon className="w-5 h-5" />} Generate
                                 </button>
                                 <button onClick={() => handleGenerateCaptions(true)} disabled={isGeneratingCaptions} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 px-4 py-2 rounded-lg transition-all disabled:opacity-50">
                                    {isGeneratingCaptions ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <GoogleIcon className="w-5 h-5" />} Generate with Trends
                                 </button>
                            </div>
                            {generatedCaptions.length > 0 && (
                                <div className="mt-4 space-y-3">
                                     <div className="flex justify-between items-center">
                                        <p className="text-sm font-semibold">Suggestions:</p>
                                        <button onClick={() => setGeneratedCaptions([])} className="text-xs font-semibold text-slate-500 hover:text-indigo-600">Clear all</button>
                                    </div>
                                    {generatedCaptions.map((item, index) => (
                                        <div key={index} className="p-3 bg-slate-100 rounded-lg text-sm border border-slate-200">
                                            <p className="whitespace-pre-wrap">{item.caption}</p>
                                            <p className="mt-2 pt-2 border-t border-slate-200/80 text-xs text-slate-500 italic">
                                                <SparkleIcon className="w-3 h-3 inline-block mr-1 text-violet-500"/>
                                                <strong>Justification:</strong> {item.justification}
                                            </p>
                                            <button onClick={() => handleUpdate('caption', item.caption)} className="mt-2 text-xs font-bold text-indigo-600 hover:underline">Use this caption</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {localPost.groundingCitations && localPost.groundingCitations.length > 0 && (
                                <div className="mt-4 p-3 bg-slate-100 rounded-lg">
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Sources from Google Search:</h4>
                                    <ul className="space-y-1">
                                        {localPost.groundingCitations.map((citation, i) => (
                                            <li key={i} className="text-xs">
                                                <a href={citation.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-start gap-1.5">
                                                    <LinkIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <span className="truncate">{citation.title || citation.uri}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                         {/* Hashtags */}
                        <div>
                            <label className="text-sm font-semibold text-slate-600 mb-2 block">Hashtags</label>
                            <AIButton onClick={handleGenerateHashtags} isLoading={isGeneratingHashtags} text="Suggest Hashtags"/>
                            {generatedHashtags.length > 0 && (
                                <div className="mt-4 p-3 bg-slate-100 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm font-semibold">Suggestions:</p>
                                        <button onClick={() => setGeneratedHashtags([])} className="text-xs font-semibold text-slate-500 hover:text-indigo-600">Clear all</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {generatedHashtags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    <button onClick={() => handleUpdate('caption', `${localPost.caption}\n\n${[...new Set(generatedHashtags)].join(' ')}`)} className="mt-3 text-xs font-bold text-indigo-600 hover:underline">Append unique to caption</button>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="p-4 border-t border-slate-200 bg-white">
                        <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            Save & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};