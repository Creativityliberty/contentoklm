import React, { useState, useEffect, useContext } from 'react';
import { LoaderIcon, RocketLaunchIcon, SparkleIcon, XIcon } from './icons';
import { suggestCampaignObjectives, generateCampaign } from '../services/geminiService';
import { AppContext } from '../contexts/AppContext';
import { PostsContext } from '../contexts/PostsContext';
import { ToastContext } from '../contexts/ToastContext';
// FIX: Import the 'Post' type to resolve "Cannot find name 'Post'" error.
import { Post, PostStatus } from '../types';

interface CampaignArchitectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignArchitectModal: React.FC<CampaignArchitectModalProps> = ({ isOpen, onClose }) => {
  const { niche } = useContext(AppContext)!;
  const { setPosts } = useContext(PostsContext)!;
  const { addToast } = useContext(ToastContext)!;

  const [objective, setObjective] = useState('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (isOpen && niche) {
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        try {
            const suggs = await suggestCampaignObjectives(niche);
            setSuggestions(suggs);
        } catch(error) {
            addToast((error as Error).message, 'error');
        } finally {
            setIsLoadingSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
        setObjective('');
        setDetails('');
        setSuggestions([]);
    }
  }, [isOpen, niche, addToast]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective.trim() || !details.trim() || !niche) return;

    setIsLoading(true);
    try {
        const campaignPostsSuggestions = await generateCampaign(objective, details, niche);
        
        const initialPosts: Post[] = Array.from({ length: 9 }, (_, i) => ({
            id: i, topic: '', caption: '', imageUrl: null, videoUrl: null, status: 'empty', contentType: 'Image',
        }));
        const newGridPosts: Post[] = [...initialPosts];
        const campaignId = `campaign-${Date.now()}`;

        campaignPostsSuggestions.forEach(suggestion => {
            const gridIndex = suggestion.position - 1;
            if (gridIndex >= 0 && gridIndex < 9) {
                newGridPosts[gridIndex] = {
                    ...newGridPosts[gridIndex],
                    topic: suggestion.topic,
                    contentType: suggestion.contentType,
                    status: 'draft' as PostStatus,
                    campaignId: campaignId,
                };
            }
        });
        setPosts(newGridPosts);
        addToast("Campaign generated successfully!", 'success');
        onClose();
    } catch(error) {
        addToast((error as Error).message, 'error');
    } finally {
        setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  
  const handleSuggestionClick = (suggestion: string) => setObjective(suggestion);

  const getDetailsPlaceholder = () => {
    if (objective.toLowerCase().includes('launch')) return "Describe the new collection/product, its key features, target audience, and the desired feeling...";
    if (objective.toLowerCase().includes('sale') || objective.toLowerCase().includes('offer')) return "Detail the promotion: percentage off, eligible products, duration of the sale...";
    if (objective.toLowerCase().includes('engagement') || objective.toLowerCase().includes('community')) return "Describe the type of engagement: A contest? A Q&A series? A user-generated content campaign?...";
    return "Describe the product/event, key features, target audience, desired feeling...";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/60" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg m-4 transform transition-all" onClick={stopPropagation}>
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <RocketLaunchIcon className="w-8 h-8 text-indigo-500"/>
            <h2 className="text-2xl font-bold text-slate-800">Campaign Architect</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200">
            <XIcon className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-6">
            <p className="text-slate-600">Define your campaign goal. The AI will generate a strategic sequence of posts to pre-fill your grid.</p>
            <div>
              <label htmlFor="objective" className="block text-sm font-semibold text-slate-700 mb-2">Campaign Objective</label>
               {isLoadingSuggestions ? (
                 <div className="flex items-center gap-2 text-slate-500 text-sm"> <LoaderIcon className="w-4 h-4 animate-spin"/> <span>Generating suggestions...</span> </div>
               ) : (
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestions.map((sugg, i) => (
                    <button key={i} type="button" onClick={() => handleSuggestionClick(sugg)} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"> {sugg} </button>
                  ))}
                </div>
               )}
              <input 
                id="objective" type="text" value={objective} onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g., Launch new Autumn collection"
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition" required
              />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-semibold text-slate-700 mb-2">Product/Event Details</label>
              <textarea 
                id="details" rows={4} value={details} onChange={(e) => setDetails(e.target.value)}
                placeholder={getDetailsPlaceholder()}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition" required
              />
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? ( <> <LoaderIcon className="w-5 h-5 animate-spin" /> <span>Building Your Campaign...</span> </> ) : ( <> <SparkleIcon className="w-5 h-5"/> <span>Generate Campaign</span> </> )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignArchitectModal;