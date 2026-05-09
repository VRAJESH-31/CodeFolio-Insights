import { ChevronDown } from 'lucide-react';

const FaqCard = ({ question, answer, icon: Icon, iconClasses, isOpen, onClick }) => {
  return (
    <div className={`group border rounded-2xl transition-all duration-300 ${isOpen ? 'border-blue-200 bg-blue-200/30' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'}`}>
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl transition-colors duration-300 ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'}`}>
            <Icon className={iconClasses} />
          </div>
          <span className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-900' : 'text-slate-700'}`}>{question}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-slate-600'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 pt-0 ml-14 text-slate-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

export default FaqCard;
