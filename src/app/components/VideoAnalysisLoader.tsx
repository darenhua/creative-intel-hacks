"use client";

import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function VideoAnalysisLoader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50"
        >
            <div
                className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-xl"
                style={{
                    boxShadow: "0 0 40px rgba(110, 231, 183, 0.1)",
                }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <Loader2 className="w-5 h-5 text-white/70" />
                    </motion.div>
                    <div>
                        <p className="text-sm font-medium text-white">
                            Analyzing video...
                        </p>
                        <p className="text-xs text-white/60">
                            This may take a few moments
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
