"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, LogOut } from "lucide-react";
import { CenteredVideoAnalysis } from "@/app/components/CenteredVideoAnalysis";
import { ExpandedReport } from "@/app/components/AnalysisReport";
import {
    getPersonasByJobId,
    getJobById,
    getPersonaResponses,
} from "@/app/actions/personas";
import {
    generateAnalysisFromResponses,
    type AnalysisData,
} from "@/app/actions/analysis";
import { mockPeople } from "@/lib/mockPeople";
import type { Person } from "@/types/shared";
import { FeedbackPanel } from "@/app/components/FeedbackPanel";

export default function SimulationPage() {
    const { username, projectId } = useParams();
    const router = useRouter();

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [foundCount, setFoundCount] = useState(0);
    const [showAnalysisReport, setShowAnalysisReport] = useState(false);
    const [showExpandedReport, setShowExpandedReport] = useState(false);

    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Prompt state
    const [prompt, setPrompt] = useState("");

    // Fetch personas for this job (projectId = jobId)
    const { data: fetchedPersonas, isLoading: personasLoading } = useQuery({
        queryKey: ["personas", projectId],
        queryFn: async () => {
            const res = await getPersonasByJobId(projectId as string);
            return res.personas;
        },
        enabled: !!projectId,
    });

    // Fetch job details
    const { data: job, isLoading: jobLoading } = useQuery({
        queryKey: ["job", projectId],
        queryFn: () => getJobById(projectId as string),
        enabled: !!projectId,
    });

    // Fetch persona responses
    const { data: personaResponses } = useQuery({
        queryKey: ["personaResponses", projectId],
        queryFn: () => getPersonaResponses(projectId as string),
        enabled: !!projectId,
    });

    const isLoading = personasLoading || jobLoading;

    // Use fetched personas if available, otherwise fallback to mock data
    const personas =
        fetchedPersonas && fetchedPersonas.length > 0
            ? fetchedPersonas
            : mockPeople;

    // Prompt change handler
    const handlePromptChange = (value: string) => {
        setPrompt(value);
    };

    // Simulation handler
    const handleSimulate = () => {
        if (prompt.trim()) {
            startSimulation(personas);
        }
    };

    const startSimulation = useCallback(
        async (people: Person[]) => {
            setIsSimulating(true);
            setShowAnalysisReport(false);
            setProgress(0);
            setFoundCount(people.length);

            // Simulate search progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            setTimeout(async () => {
                                // Start AI analysis
                                setIsAnalyzing(true);
                                try {
                                    const analysis =
                                        await generateAnalysisFromResponses(
                                            projectId as string,
                                        );
                                    setAnalysisData(analysis);
                                } catch (error) {
                                    console.error(
                                        "Error generating analysis:",
                                        error,
                                    );
                                } finally {
                                    setIsAnalyzing(false);
                                    setShowAnalysisReport(true);
                                    setIsSimulating(false);
                                }
                            }, 3000);
                        }, 1000);
                        return 100;
                    }
                    return prev + Math.random() * 8 + 2;
                });
            }, 300);
        },
        [projectId],
    );

    // Auto-start simulation if we have persona responses but no analysis yet
    useEffect(() => {
        if (
            personaResponses &&
            personaResponses.length > 0 &&
            !analysisData &&
            !isSimulating &&
            !isAnalyzing
        ) {
            startSimulation(personas);
        }
    }, [personaResponses, analysisData, isSimulating, isAnalyzing, personas]);

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

    // Extract conversation data and create simplified stats
    const conversations = personaResponses?.map((response) => {
        const conversation = response.conversation;
        // Extract the user's response from the conversation
        // Assuming conversation is an array of messages with role and content
        const userMessage =
            (conversation as any)?.response || "No response available";

        return {
            id: response.id,
            name: response.persona?.name || "Unknown",
            location: response.persona?.location || "Unknown",
            feedback: userMessage,
            reaction: "interested", // Default since we don't have reaction data in responses
        };
    });

    return (
        <div className="h-screen bg-black text-white overflow-hidden relative mr-80">
            {/* Header */}
            <div className="border-b border-gray-800/50 bg-black/80 backdrop-blur-sm relative z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() =>
                                router.push(
                                    `/${username}/projects/${projectId}/dashboard`,
                                )
                            }
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-200"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-xl text-white">Simulation</h1>
                            <p className="text-sm text-white/60">
                                {job?.demographic ||
                                    "Analyzing persona reactions"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-50px)] w-full overflow-hidden relative">
                {/* Main Content Area */}
                <div className="flex-1 relative overflow-scroll pr-[17px] w-full h-full box-content flex flex-col">
                    <CenteredVideoAnalysis
                        jobId={projectId as string}
                        prompt={prompt}
                        onPromptChange={handlePromptChange}
                        onSimulate={handleSimulate}
                        isSimulating={isSimulating}
                        showAnalysisReport={showAnalysisReport}
                    />

                    {/* User Responses */}
                    <div className="mb-10 mr-12">
                        <div className="space-y-3 ">
                            {conversations?.map((conversation, index) => (
                                <motion.div
                                    key={conversation.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-3 rounded-sm"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid #1C1C1C",
                                    }}
                                >
                                    <div className="flex items-start gap-3 mb-2">
                                        <div
                                            className="w-8 h-8 rounded-full flex-shrink-0"
                                            style={{
                                                background: `linear-gradient(135deg, #6EE7B7, #2563EB)`,
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4
                                                className="text-white mb-0.5"
                                                style={{
                                                    fontFamily:
                                                        "Inter, system-ui, sans-serif",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {conversation.name}
                                            </h4>
                                            <p
                                                className="text-white/50"
                                                style={{
                                                    fontFamily:
                                                        "Inter, system-ui, sans-serif",
                                                    fontSize: "11px",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {conversation.location}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className="text-white/70"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        {conversation.feedback}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showExpandedReport && (
                    <ExpandedReport
                        isOpen={showExpandedReport}
                        people={personas}
                        onClose={() => setShowExpandedReport(false)}
                    />
                )}
            </AnimatePresence>

            <FeedbackPanel
                personaResponses={personaResponses || []}
                onClose={() => setShowFeedback(false)}
                analysisData={analysisData}
                showAnalysisReport={true}
            />
        </div>
    );
}
