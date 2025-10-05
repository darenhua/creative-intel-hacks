export interface paths {
    "/vapi/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Root
         * @description Root endpoint with API information
         */
        get: operations["root_vapi__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Call
         * @description Create a new voice call using Vapi
         *
         *     All parameters are optional and will use defaults if not provided:
         *     - **assistant_id**: The Vapi assistant ID to use (default: 1b857043-1959-4261-be2f-cddae4e2edf1)
         *     - **phone_number_id**: The Vapi phone number ID to use (default: ac8d98e7-ac31-4026-86ec-e83b2bfe1681)
         *     - **customer_number**: The phone number to call (default: +19178556130)
         *     - **customer_name**: Optional name for the customer
         */
        post: operations["create_call_vapi_calls_create_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls/{call_id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Call Status
         * @description Get the status of a specific call
         *
         *     - **call_id**: The ID of the call to check
         */
        get: operations["get_call_status_vapi_calls__call_id__status_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Default Call
         * @description Create a call using all default values (no parameters required)
         *     This is the simplest way to make a call - just like simplecall.py
         */
        post: operations["create_default_call_vapi_calls_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls/male": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Male Voice Call
         * @description Create a call with male voice assistant
         *     Uses the male voice assistant ID: ceeb53b3-2ea0-4ba4-b33c-89532fbac19e
         */
        post: operations["create_male_voice_call_vapi_calls_male_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls/female": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Female Voice Call
         * @description Create a call with female voice assistant
         *     Uses the female voice assistant ID: e629da51-16d2-4704-937c-32d891c15ef9
         */
        post: operations["create_female_voice_call_vapi_calls_female_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/calls/simple": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Simple Call
         * @description Create a call using the default configuration from simplecall.py
         *     This endpoint uses the hardcoded values for quick testing
         */
        post: operations["create_simple_call_vapi_calls_simple_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vapi/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Health Check
         * @description Health check endpoint
         */
        get: operations["health_check_vapi_health_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Root */
        get: operations["read_root__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Health Check */
        get: operations["health_check_health_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{job_id}/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Search
         * @description Take a normal sentence and use it to search with Exa websets
         */
        post: operations["search__job_id__search_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{job_id}/video-dummy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Video Understanding Dummy */
        post: operations["video_understanding_dummy__job_id__video_dummy_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{job_id}/video": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Video Understanding
         * @description Complete video analysis endpoint:
         *     1. Get video URL from Supabase or request
         *     2. Upload/reference video in TwelveLabs
         *     3. Analyze video with structured JSON schema
         *     4. Store results in Supabase ads.description
         *     5. Return analysis summary
         */
        post: operations["video_understanding__job_id__video_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{job_id}/responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Persona Responses
         * @description Generate AI responses for all personas associated with a job_id
         */
        post: operations["persona_responses__job_id__responses_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** CallRequest */
        CallRequest: {
            /**
             * Assistant Id
             * @default 1b857043-1959-4261-be2f-cddae4e2edf1
             */
            assistant_id: string | null;
            /**
             * Phone Number Id
             * @default ac8d98e7-ac31-4026-86ec-e83b2bfe1681
             */
            phone_number_id: string | null;
            /**
             * Customer Number
             * @default +19178556130
             */
            customer_number: string | null;
            /** Customer Name */
            customer_name?: string | null;
        };
        /** CallResponse */
        CallResponse: {
            /** Call Id */
            call_id: string;
            /** Status */
            status: string;
            /** Message */
            message: string;
        };
        /** CallStatusResponse */
        CallStatusResponse: {
            /** Call Id */
            call_id: string;
            /** Status */
            status: string;
            /** Details */
            details?: {
                [key: string]: unknown;
            } | null;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** SearchRequest */
        SearchRequest: {
            /** Sentence */
            sentence: string;
        };
        /** SearchResponse */
        SearchResponse: {
            /** Success */
            success: boolean;
            /** Webset Id */
            webset_id?: string | null;
            /** Items */
            items?: {
                [key: string]: unknown;
            }[] | null;
            /** Saved Personas Count */
            saved_personas_count?: number | null;
            /** Error */
            error?: string | null;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /**
         * VideoAnalysisRequest
         * @description Model for video analysis request.
         */
        VideoAnalysisRequest: {
            /**
             * Video Url
             * @description URL or path to video file
             */
            video_url?: string | null;
            /**
             * Use Existing Video
             * @description Whether to use video already in ads table
             * @default false
             */
            use_existing_video: boolean;
        };
        /**
         * VideoAnalysisResponse
         * @description Model for video analysis response.
         */
        VideoAnalysisResponse: {
            /** Success */
            success: boolean;
            /** Job Id */
            job_id: string;
            /** Ads Id */
            ads_id: string;
            /** Video Id */
            video_id?: string | null;
            /** Analysis */
            analysis?: {
                [key: string]: unknown;
            } | null;
            /** Error */
            error?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    root_vapi__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    create_call_vapi_calls_create_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CallRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CallResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_call_status_vapi_calls__call_id__status_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                call_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CallStatusResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_default_call_vapi_calls_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    create_male_voice_call_vapi_calls_male_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    create_female_voice_call_vapi_calls_female_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    create_simple_call_vapi_calls_simple_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    health_check_vapi_health_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    read_root__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    health_check_health_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    search__job_id__search_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SearchRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SearchResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    video_understanding_dummy__job_id__video_dummy_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    video_understanding__job_id__video_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["VideoAnalysisRequest"] | null;
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoAnalysisResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    persona_responses__job_id__responses_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                job_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
