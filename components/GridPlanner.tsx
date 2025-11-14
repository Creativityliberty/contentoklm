import React from 'react';
import type { Post, Pillar } from '../types';
import { PlusIcon, RocketLaunchIcon, ReelIcon } from './icons';

interface GridCellProps {
  post: Post;
  pillar: Pillar | undefined;
  onSelect: () => void;
}

const GridCell: React.FC<GridCellProps> = ({ post, pillar, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="aspect-square bg-slate-200/50 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-slate-200 flex items-center justify-center group overflow-hidden relative"
    >
      {pillar && (
         <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${pillar.color} border border-white/50 shadow-sm`} title={pillar.name} />
      )}
      {post.campaignId && (
          <div className="absolute top-2 left-2 text-indigo-500 bg-white/70 backdrop-blur-sm rounded-full p-1" title="Campaign Post">
              <RocketLaunchIcon className="w-4 h-4" />
          </div>
      )}
      {post.status === 'empty' && (
        <div className="text-center">
          <PlusIcon className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
      )}
      {post.status === 'draft' && post.imageUrl && (
        <img src={post.imageUrl} alt={post.topic || 'Generated visual'} className="w-full h-full object-cover" />
      )}
      {post.status === 'draft' && post.videoUrl && (
        <video src={post.videoUrl} muted loop playsInline className="w-full h-full object-cover" />
      )}
      {post.status === 'draft' && !post.imageUrl && !post.videoUrl && (
        <div className="p-2 text-center text-xs text-slate-600">
          {post.contentType === 'Reel' && <ReelIcon className="w-8 h-8 mx-auto text-slate-400 mb-1" />}
          <p className="font-semibold">{post.contentType}</p>
          <p className="truncate">{post.topic}</p>
        </div>
      )}
       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
            {pillar && <div className="text-white text-xs font-bold drop-shadow-lg">{pillar.emoji} {pillar.name}</div>}
       </div>
    </div>
  );
};

interface GridPlannerProps {
  posts: Post[];
  pillars: Pillar[];
  onSelectPost: (id: number) => void;
}

const GridPlanner: React.FC<GridPlannerProps> = ({ posts, pillars, onSelectPost }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {posts.map((post) => {
          const pillar = pillars.find(p => p.id === post.pillarId);
          return <GridCell key={post.id} post={post} pillar={pillar} onSelect={() => onSelectPost(post.id)} />
        })}
      </div>
    </div>
  );
};

export default GridPlanner;
