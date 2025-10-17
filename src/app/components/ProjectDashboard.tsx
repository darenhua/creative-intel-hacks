import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { LogOut, Calendar, Plus } from "lucide-react";
import type { Project } from "@/types/shared";
import { TowaIcon } from "./TowaIcon";

interface ProjectDashboardProps {
    username: string;
    projects: Project[];
    onProjectSelect: (project: Project) => void;
    onNewProject: () => void;
    onLogout: () => void;
}

export function ProjectDashboard({
    username,
    projects,
    onProjectSelect,
    onNewProject,
    onLogout,
}: ProjectDashboardProps) {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Page fade-in animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative z-10"
            >
                {/* Header - matching nested pages style */}
                <div className="border-b border-gray-800/50 bg-black/80 backdrop-blur-sm relative z-50">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <TowaIcon className="h-8 w-auto" />
                            <div>
                                <h1 className="text-xl text-white">Projects</h1>
                                <p className="text-sm text-white/60">
                                    Manage your AI simulation projects
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-white/70">
                                {username}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onLogout}
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                <LogOut className="w-4 h-4 mr-1" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Page Header */}
                <div className="relative z-10 px-8 pt-12 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-white mb-2">
                                    Welcome back, {username}
                                </h1>
                                <p className="text-sm text-white/60">
                                    View insights and manage your campaigns
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    onClick={onNewProject}
                                    className="px-6 py-3 text-white border-2 border-transparent relative overflow-hidden group"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #6EE7B7, #2563EB, #A855F7)",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(110, 231, 183, 0.3), rgba(37, 99, 235, 0.3), rgba(168, 85, 247, 0.3))",
                                            filter: "blur(4px)",
                                        }}
                                    />
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        New Project
                                    </span>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Project Grid - Modern Glass Cards */}
                <div className="relative z-10 px-8 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        ease: "easeOut",
                                    }}
                                    className="group cursor-pointer"
                                    onClick={() => onProjectSelect(project)}
                                >
                                    <div
                                        className="p-6 bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-white/20 transition-all duration-300 relative overflow-hidden rounded-2xl group-hover:shadow-xl"
                                        style={{
                                            boxShadow: "0 0 40px rgba(110, 231, 183, 0.05)",
                                        }}
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(110, 231, 183, 0.03), rgba(37, 99, 235, 0.03), rgba(168, 85, 247, 0.03))",
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="space-y-4 relative z-10">
                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(
                                                    project.date
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </div>

                                            {/* Project Title */}
                                            <h3 className="text-lg font-semibold text-white leading-tight">
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-white/60 leading-relaxed min-h-[4rem]">
                                                {project.description}
                                            </p>

                                            {/* View Button */}
                                            <div className="pt-2">
                                                <div className="w-full py-2.5 px-4 text-center text-white/70 text-sm hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 rounded-lg group-hover:border-white/40">
                                                    View Project →
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
