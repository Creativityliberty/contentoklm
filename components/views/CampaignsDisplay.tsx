import React from 'react';
import type { Post, Pillar } from '../../types';
import { RocketLaunchIcon, ImageIcon } from '../icons';

interface CampaignPostCellProps {
  post: Post;
  pillar: Pillar | undefined;
  onSelect: () => void;
}

const CampaignPostCell: React.FC<CampaignPostCellProps> = ({ post, pillar, onSelect }) => (
  <div onClick={onSelect} className="relative aspect-square bg-slate-200/50 rounded-md cursor-pointer group overflow-hidden transition-all hover:shadow-md">
    {post.imageUrl ? (
      <img src={post.imageUrl} alt={post.topic} className="w-full h-full object-cover" />
    ) : (
      <div className="p-2 text-center text-[10px] text-slate-600 flex flex-col justify-center items-center h-full">
         <ImageIcon className="w-6 h-6 text-slate-400 mb-1"/>
        <p className="font-semibold line-clamp-2">{post.topic}</p>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
      {pillar && <span className="text-white text-xs font-bold drop-shadow-lg">{pillar.emoji} {pillar.name}</span>}
    </div>
  </div>
);


interface CampaignsDisplayProps {
  posts: Post[];
  pillars: Pillar[];
  onSelectPost: (id: number) => void;
}

const CampaignsDisplay: React.FC<CampaignsDisplayProps> = ({ posts, pillars, onSelectPost }) => {
  const campaigns = posts.reduce((acc, post) => {
    if (post.campaignId) {
      if (!acc[post.campaignId]) {
        acc[post.campaignId] = [];
      }
      acc[post.campaignId].push(post);
    }
    return acc;
  }, {} as Record<string, Post[]>);

  const campaignIds = Object.keys(campaigns);

  if (campaignIds.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
        <RocketLaunchIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-lg font-medium text-slate-900">Aucune campagne n'a encore été créée</h3>
        <p className="mt-1 text-sm text-slate-500">Cliquez sur "Lancer une Campagne IA" pour commencer à planifier votre prochaine stratégie.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {campaignIds.map((campaignId) => {
        const campaignPosts = campaigns[campaignId].sort((a,b) => a.id - b.id);
        const firstPost = campaignPosts[0];
        
        return (
          <div key={campaignId} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/80">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">Campagne : <span className="text-indigo-600">{firstPost.topic.substring(0, 30)}...</span></h3>
                <p className="text-sm text-slate-500">Séquence de {campaignPosts.length} posts</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {campaignPosts.map((post) => {
                const pillar = pillars.find(p => p.id === post.pillarId);
                return <CampaignPostCell key={post.id} post={post} pillar={pillar} onSelect={() => onSelectPost(post.id)} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default CampaignsDisplay;