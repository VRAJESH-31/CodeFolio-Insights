import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { PUBLIC_API_FAQS } from '@/constants/faqs.js';
import { FaqCard } from '@/components/cards/export.js';

const ApiFaq = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar h-full animate-float-in">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Frequently Asked Questions</h1>
        </div>
        <p className="text-slate-500 mb-10 ml-12">Everything you need to know about our Public APIs, rate limits, and integrations.</p>

        <div className="space-y-4">
          {PUBLIC_API_FAQS.map((faq, index) => (
            <FaqCard key={index} {...faq} isOpen={openIndex === index} onClick={() => toggleFaq(index)} />
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12">
            <HelpCircle size={200} />
          </div>

          <h2 className="text-2xl font-bold mb-3 relative z-10">Still have questions?</h2>
          <p className="text-blue-100 mb-6 relative z-10 max-w-md">Can't find the answer you're looking for? Please reach out to our friendly team.</p>
          <button onClick={() => navigate('/contact-us')} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors relative z-10">
            Submit a Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiFaq;
