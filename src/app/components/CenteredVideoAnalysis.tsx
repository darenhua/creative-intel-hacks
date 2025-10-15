import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

interface CenteredVideoAnalysisProps {
    jobId: string;
    prompt: string;
    onPromptChange: (value: string) => void;
    onSimulate: () => void;
    isSimulating: boolean;
    showAnalysisReport?: boolean;
}

export function CenteredVideoAnalysis({
    jobId,
    prompt,
    onPromptChange,
    onSimulate,
    isSimulating,
    showAnalysisReport = false,
}: CenteredVideoAnalysisProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Fetch video URL from Supabase
    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const supabase = createBrowserClient();

                // First get the ads_id from the job
                const { data: job, error: jobError } = await supabase
                    .from("jobs")
                    .select("ads_id")
                    .eq("id", jobId)
                    .single();

                if (jobError) {
                    console.error("Error fetching job:", jobError);
                    setIsLoadingVideo(false);
                    return;
                }

                if (!job?.ads_id) {
                    console.error("No ads_id found for job:", jobId);
                    setIsLoadingVideo(false);
                    return;
                }

                // Then get the video_url from ads table
                const { data: ad, error: adError } = await supabase
                    .from("ads")
                    .select("video_url")
                    .eq("id", job.ads_id)
                    .single();

                if (adError) {
                    console.error("Error fetching ad:", adError);
                    setIsLoadingVideo(false);
                    return;
                }

                setVideoUrl(ad?.video_url || null);
                setIsLoadingVideo(false);
            } catch (error) {
                console.error("Error fetching video URL:", error);
                setIsLoadingVideo(false);
            }
        };

        if (jobId) {
            fetchVideoUrl();
        }
    }, [jobId]);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-8 py-12 relative  overflow-hidden">
            {/* Orbit Ring Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div
                    className="w-[800px] h-[800px] border border-white/5 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute w-[600px] h-[600px] border border-white/3 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 80,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Main Video Analysis Card */}
            <motion.div
                className="w-full max-w-2xl relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Video Player */}
                <div
                    className="relative mb-8 rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(11, 17, 32, 0.4)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(110, 231, 183, 0.2)",
                        boxShadow: `
              0 0 40px rgba(110, 231, 183, 0.1),
              0 0 80px rgba(37, 99, 235, 0.05),
              0 0 120px rgba(168, 85, 247, 0.03)
            `,
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isLoadingVideo ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="aspect-video flex items-center justify-center bg-gray-900/30"
                            >
                                <motion.div
                                    className="w-16 h-16 border-4 border-transparent border-t-white/30 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    style={{
                                        borderImage:
                                            "linear-gradient(45deg, #6EE7B7, #2563EB, #A855F7) 1",
                                    }}
                                />
                            </motion.div>
                        ) : videoUrl ? (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="relative aspect-video cursor-pointer group"
                                onClick={handleVideoClick}
                            >
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>

                                {/* Video Overlay */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />

                                {/* Play/Pause Control */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div
                                        className="bg-black/60 backdrop-blur-sm rounded-full p-4"
                                        style={{
                                            border: "1px solid rgba(110, 231, 183, 0.3)",
                                        }}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-8 h-8 text-white" />
                                        )}
                                    </div>
                                </motion.div>

                                {/* Video Title Overlay */}
                                <div className="absolute top-6 left-6">
                                    <motion.h2
                                        className="text-2xl text-white"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        User video
                                    </motion.h2>
                                </div>

                                {/* Analyzing Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute top-6 right-6"
                                >
                                    {isSimulating && (
                                        <motion.div
                                            className="px-4 py-2 backdrop-blur-sm border rounded-full text-sm text-white relative"
                                            style={{
                                                background:
                                                    "rgba(37, 99, 235, 0.2)",
                                                borderColor:
                                                    "rgba(37, 99, 235, 0.4)",
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <motion.div
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"
                                                animate={{
                                                    opacity: [1, 0.3, 1],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                }}
                                            />
                                            <span className="ml-4">
                                                Analyzing…
                                            </span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-video"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="aspect-video flex flex-col items-center justify-center"
                            >
                                <p className="text-white/60">No video found</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
