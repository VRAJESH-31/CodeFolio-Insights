import { useState } from 'react';
import { Plus, LayoutGrid, AlertCircle } from 'lucide-react';
import {
  useProjects,
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from '../../hooks/useApiProjects.js';
import { ProjectCard } from '../../components/card/export.js';
import {
  CreateApiProjectModal,
  DeleteApiProjectModal,
  EditApiProjectModal,
} from '../../components/modals/export.js';
import { ApiProjectSkeleton } from '../../components/skeletons/export.js';

const ApiProjects = () => {
  const { data: projects, isLoading, isError } = useProjects();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const handleCreateProject = (data) => {
    createProject(data, {
      onSuccess: () => setIsCreateModalOpen(false),
    });
  };

  const handleUpdateProject = (data) => {
    updateProject(data, {
      onSuccess: () => setProjectToEdit(null),
    });
  };

  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    deleteProject(projectToDelete._id, {
      onSuccess: () => setProjectToDelete(null),
    });
  };

  if (isLoading) {
    return <ApiProjectSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center max-w-md mx-auto animate-float-in">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center border border-red-100">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Failed to Load Projects
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Something went wrong while fetching your projects. Please try
            refreshing the page.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-20 animate-float-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
                My Projects
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all transform uppercase tracking-widest text-[10px]"
          >
            <Plus className="w-4 h-4" />
            Create New Project
          </button>
        </div>

        {/* Content Grid */}
        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-float-in">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDeleteRequest={() => setProjectToDelete(project)}
                onEditRequest={() => setProjectToEdit(project)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center space-y-6 animate-float-in">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 mx-auto transform hover:rotate-12 transition-transform">
              <LayoutGrid className="w-10 h-10 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                No Projects Found
              </h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">
                You haven't created any API projects yet. Create your first
                project to get an API key and start integrating!
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-10 py-4 bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all"
            >
              Get Started Now
            </button>
          </div>
        )}

        {/* Modals */}
        <CreateApiProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateProject}
          isPending={isCreating}
        />

        <DeleteApiProjectModal
          isOpen={!!projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onDelete={handleDeleteProject}
          projectName={projectToDelete?.name}
          isPending={isDeleting}
        />

        <EditApiProjectModal
          isOpen={!!projectToEdit}
          onClose={() => setProjectToEdit(null)}
          onUpdate={handleUpdateProject}
          project={projectToEdit}
          isPending={isUpdating}
        />
      </div>
    </div>
  );
};

export default ApiProjects;
