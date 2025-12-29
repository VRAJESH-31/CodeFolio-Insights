import { Palette, Sparkles } from 'lucide-react';

const AppearanceSettings = () => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                Appearance Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 text-lg">Theme</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['Light', 'Dark', 'Auto'].map((theme, i) => (
                                <button
                                    key={theme}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${i === 0 ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                                >
                                    <div className="text-sm font-medium text-gray-800">{theme}</div>
                                    {i === 0 && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 text-lg">Accent Color</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {['blue', 'purple', 'green', 'orange'].map((color, i) => (
                                <button
                                    key={color}
                                    className={`relative w-12 h-12 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${i === 0 ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
                                >
                                    <div className={`w-full h-full rounded-lg bg-${color}-500`}></div>
                                    {i === 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 text-lg">Layout</h3>
                        <div className="space-y-3">
                            {['Compact', 'Comfortable', 'Spacious'].map((layout, i) => (
                                <label key={layout} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer">
                                    <input type="radio" name="layout" checked={i === 1} onChange={() => { }} className="text-blue-500 focus:ring-blue-500" />
                                    <div>
                                        <div className="font-medium text-gray-800">{layout}</div>
                                        <div className="text-sm text-gray-600">{i === 0 ? 'Dense information display' : i === 1 ? 'Balanced spacing' : 'More whitespace'}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 text-lg">Font Size</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Small</span>
                            <input type="range" min="12" max="18" defaultValue="16" className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
                            <span className="text-sm text-gray-600">Large</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-800">Preview</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">Changes will be applied across all pages instantly. Your preferences are saved automatically.</p>
            </div>
        </div>
    );
};

export default AppearanceSettings;
