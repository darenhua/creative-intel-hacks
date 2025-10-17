# Conditional Simulation Button Implementation Plan

## Overview

Update the "Run Simulation" button on the dashboard page to conditionally navigate directly to the simulation page when persona responses already exist, without triggering the API request. When responses don't exist, the button should trigger the API and then navigate.

## Current State Analysis

The dashboard page (`src/app/[username]/projects/[projectId]/dashboard/page.tsx`) currently:
- Fetches `persona_responses` records via `getPersonaResponses()` at line 29-33
- Has an `isResponsesState` boolean (line 36) that determines if responses exist
- Calls `handleRunSimulation` which **always** triggers the API endpoint `/{job_id}/responses` (line 85)
- Renders `InteractiveNetworkViz` component which displays the "Run Simulation" button (lines 139-146, 589-613)

### Key Discoveries:
- The server action `getPersonaResponses()` already exists in `src/app/actions/personas.ts:124` and queries the `persona_responses` table
- The dashboard already knows if responses exist via `isResponsesState` (line 36)
- The button is rendered in `InteractiveNetworkViz` component at line 589-613
- The API endpoint `POST /{job_id}/responses` generates persona responses and is defined in the schema at `src/types/schema.gen.ts:73-92`

## Desired End State

After this plan is complete:
1. When persona responses exist for a job, clicking the button navigates directly to `/simulation` without calling the API
2. When persona responses don't exist, clicking the button calls the API then navigates to `/simulation`
3. The button text changes based on state:
   - "Go Straight to Simulation" when responses exist
   - "Run Simulation" when responses don't exist

### Verification:
- Manual test: Create a job, run simulation once, return to dashboard - button should say "Go Straight to Simulation" and navigate instantly
- Manual test: Create a new job with no responses - button should say "Run Simulation" and call the API

## What We're NOT Doing

- NOT creating a new server action (we already have `getPersonaResponses`)
- NOT modifying the API endpoint logic
- NOT changing the simulation page behavior
- NOT adding loading states beyond what already exists

## Implementation Approach

Since the dashboard already fetches persona responses and knows if they exist (`isResponsesState`), we only need to:
1. Update the `handleRunSimulation` function to conditionally call the API
2. Pass the response state to the `InteractiveNetworkViz` component
3. Update the button text based on the state

## Phase 1: Update Dashboard Logic

### Overview
Modify the `handleRunSimulation` function to check if responses exist before calling the API.

### Changes Required:

#### 1. Dashboard Page Component
**File**: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
**Changes**: Update `handleRunSimulation` to conditionally call API

```typescript
// Around line 82-92
const handleRunSimulation = async () => {
    try {
        // Check if persona responses already exist
        if (isResponsesState) {
            // Responses already exist, navigate directly without API call
            router.push(`/${username}/projects/${projectId}/simulation`);
        } else {
            // No responses yet, trigger persona response generation
            await createResponses();

            // Navigate to simulation page
            router.push(`/${username}/projects/${projectId}/simulation`);
        }
    } catch (error) {
        console.error("Error generating responses:", error);
    }
};
```

#### 2. Pass State to InteractiveNetworkViz
**File**: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
**Changes**: Add `hasResponses` prop to InteractiveNetworkViz

```typescript
// Around line 139-146
<InteractiveNetworkViz
    creatingResponses={creatingResponses}
    people={personas}
    isRunning={false}
    onRunSimulation={handleRunSimulation}
    showInterest={false}
    projectId={projectId as string}
    hasResponses={isResponsesState}  // Add this prop
/>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation succeeds: `npm run build`
- [ ] No type errors: `npm run typecheck`
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Dashboard page loads without errors
- [ ] `handleRunSimulation` is called when button is clicked
- [ ] When `isResponsesState` is true, API is NOT called and navigation happens immediately
- [ ] When `isResponsesState` is false, API IS called before navigation

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Update Button Component

### Overview
Update the `InteractiveNetworkViz` component to accept the `hasResponses` prop and display the appropriate button text.

### Changes Required:

#### 1. Update InteractiveNetworkViz Interface
**File**: `src/app/components/InteractiveNetworkViz.tsx`
**Changes**: Add `hasResponses` prop to interface

```typescript
// Around line 15-22
interface InteractiveNetworkVizProps {
    creatingResponses: boolean;
    isRunning?: boolean;
    onRunSimulation?: () => void;
    people?: Person[];
    showInterest?: boolean;
    projectId?: string;
    hasResponses?: boolean;  // Add this prop
}
```

#### 2. Destructure the New Prop
**File**: `src/app/components/InteractiveNetworkViz.tsx`
**Changes**: Add `hasResponses` to destructured props

```typescript
// Around line 197-204
export function InteractiveNetworkViz({
    creatingResponses,
    isRunning = false,
    onRunSimulation,
    people,
    showInterest = false,
    projectId,
    hasResponses = false,  // Add this with default value
}: InteractiveNetworkVizProps) {
```

#### 3. Update Button Text
**File**: `src/app/components/InteractiveNetworkViz.tsx`
**Changes**: Conditionally render button text based on `hasResponses`

```typescript
// Around line 607-612
<span className="relative z-10 flex items-center gap-2">
    <Play className="w-5 h-5" />
    {creatingResponses
        ? "Generating Responses..."
        : hasResponses
        ? "Go Straight to Simulation"
        : "Run Simulation"}
</span>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation succeeds: `npm run build`
- [ ] No type errors: `npm run typecheck`
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Button text shows "Run Simulation" when no responses exist
- [ ] Button text shows "Go Straight to Simulation" when responses exist
- [ ] Button text shows "Generating Responses..." when API is in progress
- [ ] Clicking button with existing responses navigates instantly without loading state
- [ ] Clicking button without responses shows loading state then navigates

---

## Performance Considerations

- Skipping the API call when responses exist will significantly improve perceived performance
- No additional database queries needed (already fetching responses)
- Button text change is instant (no re-render issues expected)

## References

- Dashboard page: `src/app/[username]/projects/[projectId]/dashboard/page.tsx:82-92`
- InteractiveNetworkViz component: `src/app/components/InteractiveNetworkViz.tsx:589-613`
- getPersonaResponses action: `src/app/actions/personas.ts:124`
- persona_responses table schema: `src/database.types.ts:114-152`
