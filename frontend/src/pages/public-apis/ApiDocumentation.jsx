import React, { useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { documentationData } from '@/constants/apiDocumentation.js';
import { ApiDocumentationSidebar } from '@/components/sidebars/export.js';
import { ApiPlayground } from '@/components/export.js';
import { useAuthStore } from '@/store/export.js';

const ApiDocumentation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const categoryParam = searchParams.get('category');
  const titleParam = searchParams.get('title');

  useEffect(() => {
    if (!categoryParam || !titleParam) {
      navigate('/public-apis/documentation?category=GFG&title=User Info', {
        replace: true,
      });
    }
  }, [categoryParam, titleParam, navigate]);

  const { currentEndpoint, selectedCategory } = useMemo(() => {
    const cat = documentationData.find((c) => c.category === categoryParam);
    const ep = cat?.endpoints.find((e) => e.title === titleParam);

    // Fallback to first available endpoint if not found
    if (!ep && documentationData.length > 0) {
      return {
        currentEndpoint: documentationData[0].endpoints[0],
        selectedCategory: documentationData[0].category,
      };
    }

    return {
      currentEndpoint: ep,
      selectedCategory: cat?.category,
    };
  }, [categoryParam, titleParam]);

  const handleSelectEndpoint = (category, title) => {
    navigate(`/public-apis/documentation?category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`);
  };

  if (!currentEndpoint) return null;

  return (
    <div className="flex-1 flex gap-6 p-8 overflow-hidden h-full animate-float-in">
      {/* Sidebar Component */}
      <ApiDocumentationSidebar documentationData={documentationData} currentCategory={selectedCategory} currentTitle={currentEndpoint.title} onSelect={handleSelectEndpoint} />

      {/* Main Content */}
      <main className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 flex flex-col overflow-hidden">
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{currentEndpoint.title}</h1>
            <div className="flex flex-col gap-2">
              {currentEndpoint.description.map((desc, i) => (
                <p key={i} className="text-slate-500 font-medium leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>

          {/* Method & URL */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-sm group">
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg font-black text-[10px]">{currentEndpoint.request.type}</span>
            <code className="text-slate-700 flex-1 truncate">{currentEndpoint.request.url}</code>
          </div>

          {/* Parameters Table */}
          {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-black text-slate-800">Parameters</h3>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Name</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Type</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {currentEndpoint.parameters.map((param, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-blue-600 text-sm">{param.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wide">{param.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${param.status === 'required' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>{param.status}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium text-sm">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Interactive Playground Component */}
          <ApiPlayground title="API Playground" requestExample={currentEndpoint.example.request} responseExample={currentEndpoint.example.response} requestParameters={currentEndpoint.parameters} userApiKey={user?.apiKey || null} apiKeyWarningMessage="Log in to automatically attach your personal API Key here." />

          {/* Quotas & Limits */}
          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100/50 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-black text-slate-800">Usage & Quotas</h3>
            </div>
            <p className="text-slate-600 font-medium text-sm">{currentEndpoint.quotasInfo}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocumentation;
