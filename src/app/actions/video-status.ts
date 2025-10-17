"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function getVideoAnalysisStatus(jobId: string): Promise<{
    isAnalyzing: boolean;
    description: string | null;
}> {
    const supabase = await createServerClient();

    // Get job with associated ad
    const { data: job, error } = await supabase
        .from("jobs")
        .select("ads_id, ads(description)")
        .eq("id", jobId)
        .single();

    if (error || !job) {
        console.error("Error fetching job:", error);
        return { isAnalyzing: false, description: null };
    }

    // If no ads_id, analysis hasn't started
    if (!job.ads_id) {
        return { isAnalyzing: false, description: null };
    }

    // Check if description is null (still analyzing)
    const description = (job.ads as any)?.description ?? null;
    const isAnalyzing = description === null;

    return { isAnalyzing, description };
}
