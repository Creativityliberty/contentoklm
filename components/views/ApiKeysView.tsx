import React from 'react';
import { KeyIcon, PlusIcon } from '../icons';

const ApiKeysView = () => {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <KeyIcon className="w-8 h-8 text-slate-500" />
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">API Keys</h2>
                    <p className="text-slate-600">Authentication tokens for using the API.</p>
                </div>
            </div>
            <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                <span>Create key</span>
            </button>
        </div>

        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center">
            <KeyIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">No API keys yet</h3>
            <p className="text-slate-500 mt-2">Create your first API key to get started with our developer tools.</p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysView;