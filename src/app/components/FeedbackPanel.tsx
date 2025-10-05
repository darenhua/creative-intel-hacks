import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { AnalysisData } from "@/app/actions/analysis";

interface ConversationMessage {
    role: string;
    content: string;
}

interface PersonaResponse {
    id: string;
    job_id: string | null;
    persona_id: string | null;
    conversation: ConversationMessage[] | null;
    created_at: string;
    persona: {
        id: string;
        name: string | null;
        location: string | null;
        description: string | null;
    } | null;
}

interface FeedbackPanelProps {
    personaResponses: PersonaResponse[];
    onClose: () => void;
    analysisData?: AnalysisData | null;
}

export function FeedbackPanel({
    personaResponses,
    onClose,
    analysisData = null,
}: FeedbackPanelProps) {
    // Extract conversation data and create simplified stats
    const conversations = personaResponses.map((response) => {
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

    // Create mock stats for now since we don't have reaction/industry data in responses
    const reactionCounts = { interested: conversations.length };
    const topIndustries = { Technology: conversations.length };
    const generations = { Millennial: conversations.length };

    // Reaction color mapping for clean professional look
    const getReactionColor = (reaction: string) => {
        switch (reaction) {
            case "intrigued":
            case "inspired":
                return "#22C55E"; // Green for positive
            case "skeptical":
                return "#F59E0B"; // Orange for neutral
            default:
                return "#EF4444"; // Red for negative
        }
    };

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 text-white z-50 overflow-y-auto"
            style={{
                background: "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)",
                borderLeft: "1px solid #1C1C1C",
                boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.8)",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2
                        className="text-white tracking-wide"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "18px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                        }}
                    >
                        FEEDBACK SUMMARY
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white/50 hover:text-white hover:bg-white/5 border-0 transition-colors duration-200"
                        style={{ width: "32px", height: "32px" }}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <div
                            className="text-white mb-1"
                            style={{
                                fontFamily: "Inter Mono, monospace",
                                fontSize: "32px",
                                fontWeight: "400",
                                lineHeight: "1",
                            }}
                        >
                            {conversations.length}
                        </div>
                        <div
                            className="text-white/60"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "12px",
                                fontWeight: "400",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Total Responses
                        </div>
                    </div>
                    <div>
                        <div
                            className="text-white mb-1"
                            style={{
                                fontFamily: "Inter Mono, monospace",
                                fontSize: "32px",
                                fontWeight: "400",
                                lineHeight: "1",
                            }}
                        >
                            {analysisData
                                ? `${analysisData.sentiment.positive}%`
                                : "94.2%"}
                        </div>
                        <div
                            className="text-white/60"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "12px",
                                fontWeight: "400",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Positive Sentiment
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gray-800 mb-8"></div>

                {/* Reaction Breakdown */}
                <div className="mb-8">
                    <h3
                        className="text-white/90 mb-4"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Reaction Breakdown
                    </h3>

                    <div className="space-y-4">
                        {Object.entries(reactionCounts).map(
                            ([reaction, count]) => {
                                const percentage = (
                                    (count / conversations.length) *
                                    100
                                ).toFixed(1);
                                const color = getReactionColor(reaction);
                                return (
                                    <div key={reaction}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span
                                                className="text-white/80 capitalize"
                                                style={{
                                                    fontFamily:
                                                        "Inter, system-ui, sans-serif",
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {reaction}
                                            </span>
                                            <span
                                                className="text-white/60"
                                                style={{
                                                    fontFamily:
                                                        "Inter Mono, monospace",
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                {count} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-sm overflow-hidden">
                                            <motion.div
                                                className="h-1 rounded-sm"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${percentage}%`,
                                                }}
                                                transition={{
                                                    delay: 0.5,
                                                    duration: 1,
                                                    ease: "easeOut",
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gray-800 mb-8"></div>

                {/* Top Industries */}
                <div className="mb-8">
                    <h3
                        className="text-white/90 mb-4"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Top Industries
                    </h3>

                    <div className="space-y-3">
                        {Object.entries(topIndustries)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([industry, count]) => (
                                <div
                                    key={industry}
                                    className="flex items-center justify-between"
                                >
                                    <span
                                        className="text-white/70"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "13px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {industry}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Inter Mono, monospace",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            color: "#48A9A6",
                                        }}
                                    >
                                        {count}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gray-800 mb-8"></div>

                {/* Generations */}
                <div className="mb-8">
                    <h3
                        className="text-white/90 mb-4"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Generations
                    </h3>

                    <div className="space-y-3">
                        {Object.entries(generations).map(
                            ([generation, count]) => (
                                <div
                                    key={generation}
                                    className="flex items-center justify-between"
                                >
                                    <span
                                        className="text-white/70"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "13px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {generation}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Inter Mono, monospace",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            color: "#F5D76E",
                                        }}
                                    >
                                        {count}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gray-800 mb-8"></div>

                {/* User Responses */}
                <div className="mb-10">
                    <h3
                        className="text-white/90 mb-4"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.05em",
                        }}
                    >
                        User Responses
                    </h3>

                    <div className="space-y-3">
                        {conversations.map((conversation, index) => (
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

                {/* Export Options */}
                <div className="space-y-3">
                    <Button
                        className="w-full text-white border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
                        style={{
                            background: "#1A1A1A",
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "13px",
                            fontWeight: "500",
                            height: "40px",
                            letterSpacing: "0.02em",
                        }}
                    >
                        Export Full Report
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
                        style={{
                            fontFamily: "Inter, system-ui, sans-serif",
                            fontSize: "13px",
                            fontWeight: "500",
                            height: "40px",
                            letterSpacing: "0.02em",
                            background: "transparent",
                        }}
                    >
                        Save to Project
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
