import React, { useMemo } from 'react';
import { BookOpenIcon } from '../icons';
import { markdownContent } from './ApiDocumentationContent';

const ApiDocsView = () => {
    const renderedContent = useMemo(() => {
        const lines = markdownContent.split('\n');
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeBlockContent: string[] = [];
        let codeLang = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    elements.push(
                        <pre key={`code-${i}`} className="bg-slate-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
                            <code>{codeBlockContent.join('\n')}</code>
                        </pre>
                    );
                    inCodeBlock = false;
                    codeBlockContent = [];
                    codeLang = '';
                } else {
                    inCodeBlock = true;
                    codeLang = line.substring(3);
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                continue;
            }

            if (line.startsWith('## ')) {
                const text = line.substring(3);
                const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                elements.push(<h2 key={i} id={id} className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{text}</h2>);
            } else if (line.startsWith('# ')) {
                 const text = line.substring(2);
                 const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                elements.push(<h1 key={i} id={id} className="text-3xl font-bold mt-8 mb-4 border-b pb-2">{text}</h1>);
            } else if (line.startsWith('### ')) {
                 const text = line.substring(4);
                 const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                elements.push(<h3 key={i} id={id} className="text-xl font-bold mt-6 mb-3">{text}</h3>);
            } else if (line.startsWith('-   ')) {
                elements.push(<li key={i} className="ml-5 list-disc">{line.substring(4)}</li>);
            } else if (line.trim() === '') {
                 elements.push(<div key={i} className="h-4" />);
            }
            else {
                elements.push(<p key={i} className="my-4 leading-relaxed">{line}</p>);
            }
        }
        return elements;
    }, []);

    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <BookOpenIcon className="w-8 h-8 text-slate-500" />
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">API Documentation</h2>
                        <p className="text-slate-600">Endpoints, authentication, and examples.</p>
                    </div>
                </div>

                <div className="prose prose-slate bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-none">
                    {renderedContent}
                </div>
            </div>
        </div>
    );
};

// We create a separate file for the content to keep the component clean.
const ApiDocumentationContent = () => null;
export { ApiDocumentationContent };
export default ApiDocsView;
