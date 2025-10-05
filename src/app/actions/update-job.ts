"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function updateJob(
    jobId: string,
    demographic: string,
    adsId: string,
    isDogWalker: boolean = false
) {
    const supabase = await createServerClient();

    const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .update({
            demographic: demographic,
            ads_id: adsId,
            is_dog_walker: isDogWalker,
        })
        .eq("id", jobId)
        .select()
        .single();

    if (jobError) {
        throw new Error(`Failed to update job: ${jobError.message}`);
    }

    return jobData;
}
