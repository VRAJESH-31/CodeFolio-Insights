import { Palette, Sparkles, LayoutPanelLeft } from 'lucide-react';
import { usePreferenceStore } from '@/store/export.js';

const AppearanceSettings = () => {
  // Connect to Zustand Store
  const { colorMode, setColorMode, themeVariant, setThemeVariant, layout, setLayout, pageView, setPageView } = usePreferenceStore();

  const modes = ['Light', 'Dark'];
  const layouts = ['Compact', 'Comfortable', 'Spacious'];

  const themes = [
    {
      name: 'blue',
      class: {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
      },
    },
    {
      name: 'red',
      class: {
        bg: 'bg-red-500',
        border: 'border-red-500',
      },
    },
    {
      name: 'green',
      class: {
        bg: 'bg-green-500',
        border: 'border-green-500',
      },
    },
    {
      name: 'purple',
      class: {
        bg: 'bg-purple-500',
        border: 'border-purple-500',
      },
    },
    {
      name: 'orange',
      class: {
        bg: 'bg-orange-500',
        border: 'border-orange-500',
      },
    },
    {
      name: 'pink',
      class: {
        bg: 'bg-pink-500',
        border: 'border-pink-500',
      },
    },
  ];

  // Map display labels to the exact keys used in the Store
  const navSections = [
    { id: 'Settings', label: 'Settings' },
    { id: 'Public APIs', label: 'Public API' },
    { id: 'Analyzers', label: 'Analyzers' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 p-8">
      <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-blue-600" />
        Appearance Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Theme Mode</h3>
            <div className="grid grid-cols-2 gap-4">
              {modes.map((m) => (
                <button key={m} onClick={() => setColorMode(m.toLowerCase())} className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${colorMode === m.toLowerCase() ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                  <div className="text-sm font-medium text-gray-800">{m}</div>
                  {colorMode === m.toLowerCase() && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Style Feature (Connected to Store) */}
          <div className="space-y-4 pt-2">
            <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
              <LayoutPanelLeft className="w-5 h-5 text-blue-600" />
              Navigation Style
            </h3>
            <div className="space-y-3">
              {navSections.map((section) => (
                <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">{section.label}</span>
                  <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                    {['tab', 'sidebar'].map((type) => (
                      <button key={type} onClick={() => setPageView(section.id, type)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 capitalize ${pageView[section.id] === type ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-blue-600'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Accent Color</h3>
            <div className="flex justify-around gap-4">
              {themes.map((theme) => (
                <button key={theme.name} onClick={() => setThemeVariant(theme.name)} className={`relative w-12 h-12 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${themeVariant === theme.name ? theme.class.border + ' shadow-lg' : 'border-gray-200'}`}>
                  <div className={`w-full h-full rounded-lg ${theme.class.bg}`}></div>
                  {themeVariant === theme.name && <div className={`absolute -top-1 -right-1 w-4 h-4 ${theme.class.bg} rounded-full border-2 border-white`}></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Layout</h3>
            <div className="space-y-3">
              {layouts.map((l) => (
                <label key={l} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer">
                  <input type="radio" name="layout" checked={layout === l.toLowerCase()} onChange={() => setLayout(l.toLowerCase())} className="text-blue-500 focus:ring-blue-500" />
                  <div>
                    <div className="font-medium text-gray-800">{l}</div>
                    <div className="text-sm text-gray-600">{l === 'Compact' ? 'Dense information display' : l === 'Comfortable' ? 'Balanced spacing' : 'More whitespace'}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-800">Preview</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">Your preferences are synced and saved automatically to local storage.</p>
      </div>
    </div>
  );
};

export default AppearanceSettings;
