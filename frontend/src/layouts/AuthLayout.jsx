import { Outlet } from 'react-router-dom';
import { AuthVisualSide } from '@/components/export.js';

const AuthLayout = () => {
  return (
    <div className="flex h-full">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative overflow-y-auto py-10">
        {/* Decorative Top Left Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md mx-auto relative z-10 animate-fade-in-up">
          <Outlet />
        </div>
      </div>

      {/* Right Visual Section */}
      <AuthVisualSide />
    </div>
  );
};

export default AuthLayout;
