# Responsive Dashboard Panels Implementation Plan

## Overview

Make the side panels (PersonasPanel on dashboard page, FeedbackPanel on simulation page) responsive by creating a custom `useMediaQuery` hook that determines panel visibility based on screen width. Panels will automatically hide on smaller screens (< 1280px) to prevent layout issues.

## Current State Analysis

### Dashboard Page (`src/app/[username]/projects/[projectId]/dashboard/page.tsx`)
- PersonasPanel is always visible (line 170-173)
- Main content has fixed right margin: `mr-[395px]` (line 142)
- No responsive behavior - panels show regardless of screen size

### Simulation Page (`src/app/[username]/projects/[projectId]/simulation/page.tsx`)
- FeedbackPanel is always visible (line 294-299)
- Root div has fixed right margin: `mr-80` (320px) (line 177)
- No responsive behavior - panels show regardless of screen size

### Panel Components
- **PersonasPanel** (`src/app/components/PersonasPanel.tsx`):
  - Fixed width: `w-96` (384px) (line 15)
  - Has motion animations
  - Already accepts `onClose` prop but doesn't use it for conditional rendering

- **FeedbackPanel** (`src/app/components/FeedbackPanel.tsx`):
  - Fixed width: `w-96` (384px) (line 81)
  - Has motion animations with initial/animate/exit (line 77-80)
  - Already has AnimatePresence-ready animations

### Existing Patterns
- `useIsMobile` hook exists at `src/components/ui/use-mobile.ts:1` using `window.matchMedia`
- Uses 768px breakpoint for mobile detection
- Pattern: useState + useEffect with matchMedia event listener

## Desired End State

### Breakpoint Strategy:
- Hide panels when screen width < 1280px (Tailwind `lg` breakpoint)
- Show panels by default on screens >= 1280px

### Expected Behavior:
1. On large screens (>= 1280px): Panels visible by default
2. On smaller screens (< 1280px): Panels hidden automatically
3. Main content margins adjust dynamically based on panel visibility
4. Smooth transitions when panels appear/disappear

## What We're NOT Doing

- Not changing panel content or internal structure
- Not modifying panel animations (already implemented)
- Not creating mobile-specific panel designs
- Not adding drawer/sheet overlays for mobile (panels will slide in/out same way)
- Not changing the network visualization or other page content
- Not adding manual toggle buttons

## Implementation Approach

Follow the existing `useIsMobile` hook pattern but make it flexible to accept any media query string. Create useState for panel visibility that initializes based on screen size. Wrap panels in conditional rendering and adjust parent container margins dynamically.

## Phase 1: Create Custom Media Query Hook

### Overview
Create a reusable `useMediaQuery` hook that accepts any media query string and returns a boolean indicating whether it matches.

### Changes Required:

#### 1. Create Hook File ✅
**File**: `src/hooks/use-media-query.ts`
**Changes**: Create new file with hook implementation

```typescript
import { useEffect, useState } from "react";

/**
 * Custom hook to track media query matches
 * @param query - Media query string (e.g., "(min-width: 1280px)")
 * @returns boolean indicating if media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (use addEventListener for modern browsers)
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
```

**Implementation Note**: This hook follows the same pattern as the existing `useIsMobile` hook but is more flexible, accepting any media query string.

---

## Phase 2: Update Dashboard Page

### Overview
Add responsive behavior to the dashboard page by using the media query hook and conditionally rendering PersonasPanel based on screen size.

### Changes Required:

#### 1. Import New Hook and Update State ✅
**File**: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
**Changes**: Import hook and add panel visibility state

```typescript
// Add to imports at top of file (around line 1-19)
import { useMediaQuery } from "@/hooks/use-media-query";

// Add after existing useState declarations (after line 26)
const isLargeScreen = useMediaQuery("(min-width: 1280px)");
const [isPanelVisible, setIsPanelVisible] = useState(false);

// Initialize panel visibility based on screen size (add useEffect)
useEffect(() => {
  setIsPanelVisible(isLargeScreen);
}, [isLargeScreen]);
```

#### 2. Make Main Content Margin Dynamic ✅
**File**: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
**Changes**: Update the main content container to conditionally apply right margin

**Current** (line 142):
```typescript
<div className="flex h-[calc(100vh-73px)] relative mr-[395px]">
```

**New**:
```typescript
<div className={`flex h-[calc(100vh-73px)] relative transition-all duration-300 ${isPanelVisible ? 'mr-[395px]' : 'mr-0'}`}>
```

#### 3. Conditionally Render PersonasPanel ✅
**File**: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
**Changes**: Wrap PersonasPanel in AnimatePresence and conditional

**Current** (lines 170-173):
```typescript
<PersonasPanel
    people={personas}
    onClose={() => setShowFeedback(false)}
/>
```

**New**:
```typescript
<AnimatePresence>
    {isPanelVisible && (
        <PersonasPanel
            people={personas}
            onClose={() => setIsPanelVisible(false)}
        />
    )}
</AnimatePresence>
```

**Implementation Note**: AnimatePresence is already imported from motion/react. The onClose handler now properly toggles panel visibility.

---

## Phase 3: Update Simulation Page

### Overview
Apply the same responsive behavior to the simulation page for the FeedbackPanel.

### Changes Required:

#### 1. Import Hook and Add State ✅
**File**: `src/app/[username]/projects/[projectId]/simulation/page.tsx`
**Changes**: Import hook and add panel visibility state

```typescript
// Add to imports at top of file (around line 1-22)
import { useMediaQuery } from "@/hooks/use-media-query";

// Add after existing useState declarations (after line 41)
const isLargeScreen = useMediaQuery("(min-width: 1280px)");
const [isPanelVisible, setIsPanelVisible] = useState(false);

// Initialize panel visibility based on screen size (add useEffect)
useEffect(() => {
  setIsPanelVisible(isLargeScreen);
}, [isLargeScreen]);
```

#### 2. Make Root Div Margin Dynamic ✅
**File**: `src/app/[username]/projects/[projectId]/simulation/page.tsx`
**Changes**: Update root div to conditionally apply right margin

**Current** (line 177):
```typescript
<div className="h-screen bg-black text-white overflow-hidden relative mr-80">
```

**New**:
```typescript
<div className={`h-screen bg-black text-white overflow-hidden relative transition-all duration-300 ${isPanelVisible ? 'mr-80' : 'mr-0'}`}>
```

#### 3. Conditionally Render FeedbackPanel ✅
**File**: `src/app/[username]/projects/[projectId]/simulation/page.tsx`
**Changes**: Wrap FeedbackPanel in conditional (already has AnimatePresence animations)

**Current** (lines 294-299):
```typescript
<FeedbackPanel
    personaResponses={personaResponses || []}
    onClose={() => setShowFeedback(false)}
    analysisData={analysisData}
    showAnalysisReport={true}
/>
```

**New**:
```typescript
{isPanelVisible && (
    <FeedbackPanel
        personaResponses={personaResponses || []}
        onClose={() => setIsPanelVisible(false)}
        analysisData={analysisData}
        showAnalysisReport={true}
    />
)}
```

**Implementation Note**: FeedbackPanel already has motion animations with initial/animate/exit, so it will animate properly when conditionally rendered.

---

## Performance Considerations

- Media query event listener has minimal performance impact
- Transition animations are CSS-based (hardware accelerated)
- useState updates are batched by React
- No performance concerns expected

## Migration Notes

Not applicable - this is a new feature addition, no data migration needed.

## References

- Existing hook pattern: `src/components/ui/use-mobile.ts:1`
- Dashboard page: `src/app/[username]/projects/[projectId]/dashboard/page.tsx`
- Simulation page: `src/app/[username]/projects/[projectId]/simulation/page.tsx`
- PersonasPanel: `src/app/components/PersonasPanel.tsx:11`
- FeedbackPanel: `src/app/components/FeedbackPanel.tsx:33`
- Tailwind breakpoints: https://tailwindcss.com/docs/responsive-design
- Window.matchMedia API: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
