import { UploadCloud } from 'lucide-react';

const UploadHeader = ({ icon: Icon = UploadCloud, title, subtitle, buttonText = 'Upload', buttonIcon: ButtonIcon = UploadCloud, onAction }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 animate-float-in">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">{title}</h1>
          <p className="text-gray-600 font-medium mt-1">{subtitle}</p>
        </div>
      </div>
      <button onClick={onAction} className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-800 group">
        <ButtonIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {buttonText}
      </button>
    </div>
  );
};

export default UploadHeader;
