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
    isAnalyzing?: boolean;
    showAnalysisReport: boolean;
}

export function FeedbackPanel({
    personaResponses,
    onClose,
    analysisData = null,
    isAnalyzing = false,
    showAnalysisReport,
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
                        Creative IQ Insights
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white/50 hover:text-white hover:bg-white/5 border-0 transition-colors duration-200"
                        style={{ width: "32px", height: "32px" }}
                    ></Button>
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
                                : "--"}
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

                {/* AI Insights Summary Section */}
                {isAnalyzing ? (
                    <div className="mb-8 text-center py-8">
                        <div
                            className="text-white/70 mb-2"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "13px",
                                fontWeight: "400",
                            }}
                        >
                            Analyzing responses with AI...
                        </div>
                        <div
                            className="text-white/50"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "12px",
                                fontWeight: "400",
                            }}
                        >
                            Generating insights
                        </div>
                    </div>
                ) : showAnalysisReport && analysisData ? (
                    <div className="mb-8">
                        <div className=" rounded-lg mb-6">
                            <div className="space-y-6">
                                {/* Themes Section */}
                                <div>
                                    <h3
                                        className="text-white/90 mb-3"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Themes
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisData.themes.map((tag, i) => (
                                            <motion.div
                                                key={tag}
                                                className="px-2 py-1 rounded-full border border-white/10 text-white/70 cursor-pointer hover:border-white/30 hover:text-white/90 hover:bg-white/10 transition-all duration-300 bg-white/5"
                                                style={{
                                                    fontFamily:
                                                        "Inter, system-ui, sans-serif",
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                }}
                                            >
                                                #{tag}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                {/* Separator */}
                                <div className="w-full h-px bg-gray-800 mb-8"></div>

                                {/* Highlights Section */}
                                <div>
                                    <h3
                                        className="text-white/90 mb-3"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Comment Highlights
                                    </h3>
                                    <div className="space-y-2">
                                        {analysisData.highlights.map(
                                            (highlight, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.3 + i * 0.3,
                                                        duration: 0.6,
                                                        ease: "easeOut",
                                                    }}
                                                    className="text-white/70 flex items-start gap-2"
                                                    style={{
                                                        fontFamily:
                                                            "Inter, system-ui, sans-serif",
                                                        fontSize: "13px",
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    <div className="w-1 h-1 bg-white/40 rounded-full mt-1.5 flex-shrink-0" />
                                                    <span>
                                                        &quot;{highlight}&quot;
                                                    </span>
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                {/* Separator */}
                                <div className="w-full h-px bg-gray-800 mb-8"></div>

                                {/* Sentiment Overview */}
                                <div>
                                    <h3
                                        className="text-white/90 mb-6"
                                        style={{
                                            fontFamily:
                                                "Inter, system-ui, sans-serif",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Sentiment Overview
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                label: "Positive",
                                                value: analysisData.sentiment
                                                    .positive,
                                                color: "#22c55e",
                                            },
                                            {
                                                label: "Neutral",
                                                value: analysisData.sentiment
                                                    .neutral,
                                                color: "#fbbf24",
                                            },
                                            {
                                                label: "Negative",
                                                value: analysisData.sentiment
                                                    .negative,
                                                color: "#ef4444",
                                            },
                                        ].map((sentiment, i) => (
                                            <div key={sentiment.label}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="text-white/70"
                                                        style={{
                                                            fontFamily:
                                                                "Inter, system-ui, sans-serif",
                                                            fontSize: "13px",
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        {sentiment.label}
                                                    </span>
                                                    <span
                                                        className="text-white/80"
                                                        style={{
                                                            fontFamily:
                                                                "Inter Mono, monospace",
                                                            fontSize: "12px",
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        {sentiment.value}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-sm overflow-hidden">
                                                    <motion.div
                                                        className="h-1 rounded-sm"
                                                        style={{
                                                            backgroundColor:
                                                                sentiment.color,
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${sentiment.value}%`,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                1.2 + i * 0.2,
                                                            duration: 0.6,
                                                            ease: "easeOut",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-800 mb-8"></div>

                                {/* Demographic Reactions */}
                                {analysisData.demographics &&
                                    analysisData.demographics.length > 0 && (
                                        <div>
                                            <h3
                                                className="text-white/90 mb-6"
                                                style={{
                                                    fontFamily:
                                                        "Inter, system-ui, sans-serif",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    letterSpacing: "0.05em",
                                                }}
                                            >
                                                Demographic Engagement %
                                            </h3>
                                            <div className="space-y-3">
                                                {analysisData.demographics.map(
                                                    (demo, i) => (
                                                        <div key={demo.label}>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span
                                                                    className="text-white/70"
                                                                    style={{
                                                                        fontFamily:
                                                                            "Inter, system-ui, sans-serif",
                                                                        fontSize:
                                                                            "13px",
                                                                        fontWeight:
                                                                            "400",
                                                                    }}
                                                                >
                                                                    {demo.label}
                                                                </span>
                                                                <span
                                                                    className="text-white/80"
                                                                    style={{
                                                                        fontFamily:
                                                                            "Inter Mono, monospace",
                                                                        fontSize:
                                                                            "12px",
                                                                        fontWeight:
                                                                            "400",
                                                                    }}
                                                                >
                                                                    {demo.value}
                                                                    %
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-1 bg-white/5 rounded-sm overflow-hidden">
                                                                <motion.div
                                                                    className="h-1 rounded-sm"
                                                                    style={{
                                                                        backgroundColor:
                                                                            "#22c55e",
                                                                    }}
                                                                    initial={{
                                                                        width: 0,
                                                                    }}
                                                                    animate={{
                                                                        width: `${demo.value}%`,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            1.8 +
                                                                            i *
                                                                                0.2,
                                                                        duration: 0.6,
                                                                        ease: "easeOut",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Footer Attribution Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 2.8,
                                duration: 0.6,
                            }}
                            className="text-white/50 mb-8"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "12px",
                                fontWeight: "400",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Generated by AI personas trained on audience
                            profiles.
                        </motion.div>
                    </div>
                ) : (
                    <div className="mb-8 text-center py-8">
                        <div
                            className="text-white/70 mb-2"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "13px",
                                fontWeight: "400",
                            }}
                        >
                            Running simulation...
                        </div>
                        <div
                            className="text-white/50"
                            style={{
                                fontFamily: "Inter, system-ui, sans-serif",
                                fontSize: "12px",
                                fontWeight: "400",
                            }}
                        >
                            Analyzing persona reactions
                        </div>
                    </div>
                )}

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
                            },
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
