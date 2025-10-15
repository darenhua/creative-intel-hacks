"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { InteractiveNetworkViz } from "@/app/components/InteractiveNetworkViz";
import { TowaReactionModal } from "@/app/components/TowaReactionModal";
import { PersonasPanel } from "@/app/components/PersonasPanel";
import { MissionStatus } from "@/app/components/MissionStatus";
import {
    getPersonasByJobId,
    getJobById,
    getPersonaResponses,
} from "@/app/actions/personas";
import { mockPeople } from "@/lib/mockPeople";
import type { Person } from "@/types/shared";
import apiClient from "@/lib/api-client";

export default function DashboardPage() {
    const { username, projectId } = useParams();
    const router = useRouter();

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Fetch persona responses to determine state
    const { data: personaResponses, isLoading: responsesLoading } = useQuery({
        queryKey: ["personaResponses", projectId],
        queryFn: () => getPersonaResponses(projectId as string),
        enabled: !!projectId,
    });

    // Determine if we're in responses state (STATE B) or personas state (STATE A)
    const isResponsesState = personaResponses && personaResponses.length > 0;

    // Fetch personas for this job (projectId = jobId)
    const { data: fetchedPersonas, isLoading: personasLoading } = useQuery({
        queryKey: ["personas", projectId],
        queryFn: () => getPersonasByJobId(projectId as string),
        enabled: !!projectId,
    });

    // Fetch job details
    const { data: job, isLoading: jobLoading } = useQuery({
        queryKey: ["job", projectId],
        queryFn: () => getJobById(projectId as string),
        enabled: !!projectId,
    });

    const isLoading = personasLoading || jobLoading;

    // Use fetched personas if available, otherwise fallback to mock data
    const personas =
        fetchedPersonas && fetchedPersonas.length > 0
            ? fetchedPersonas
            : mockPeople;

    // Persona response mutation
    const { mutateAsync: createResponses, isPending: creatingResponses } =
        useMutation({
            mutationFn: async () => {
                const response = await apiClient.POST("/{job_id}/responses", {
                    params: {
                        path: {
                            job_id: projectId as string,
                        },
                    },
                });
                return response.data;
            },
        });

    const handleRunSimulation = async () => {
        try {
            // Trigger persona response generation
            await createResponses();

            // Navigate to simulation page
            router.push(`/${username}/projects/${projectId}/simulation`);
        } catch (error) {
            console.error("Error generating responses:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen bg-black text-white flex items-center justify-center">
                <motion.div
                    className="w-16 h-16 border-4 border-transparent border-t-white/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
        );
    }

    return (
        <div className="h-screen bg-black text-white overflow-hidden relative">
            {/* Header */}
            <div className="border-b border-gray-800/50 bg-black/80 backdrop-blur-sm relative z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => router.push(`/${username}/projects`)}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-800"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-xl text-white">Dashboard</h1>
                            <p className="text-sm text-white/60">
                                {job?.demographic ||
                                    "Explore personas and run simulation"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-73px)] relative mr-[395px]">
                {/* Main Area - Interactive Network Visualization */}
                <div className="flex-1 relative">
                    <InteractiveNetworkViz
                        creatingResponses={creatingResponses}
                        people={personas}
                        isRunning={false}
                        onRunSimulation={handleRunSimulation}
                        showInterest={false}
                        projectId={projectId as string}
                    />
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedPerson && (
                    <TowaReactionModal
                        person={selectedPerson}
                        onClose={() => setSelectedPerson(null)}
                        onAddToFeedback={(person) => {
                            console.log("Adding to feedback:", person.name);
                        }}
                    />
                )}
            </AnimatePresence>

            <PersonasPanel
                people={personas}
                onClose={() => setShowFeedback(false)}
            />
        </div>
    );
}
