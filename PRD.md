# Product Requirements Document
## Lunchbox.ai — AI-Powered Meal Planner

**Version:** 1.0
**Date:** 2026-03-15
**Platform:** Mobile (iOS / Android)

---

## 1. Product Overview

**Lunchbox.ai** is an AI-powered meal planning mobile application that helps users discover recipes, plan their weekly meals, and generate automated grocery shopping lists. Users describe what food they want, and the AI generates personalized recipes, portions, and a calendar-ready meal schedule.

**Tagline:** _Your AI-powered meal planner_

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Reduce time spent on meal planning | Avg. time from open → scheduled meal < 2 min |
| Increase weekly meal plan completion | ≥ 3 meals scheduled per user per week |
| Drive grocery list usage | ≥ 60% of users open Shopping List weekly |
| User retention | 30-day retention ≥ 40% |

---

## 3. Target Users

- Busy individuals and couples who want structured meal plans without manual recipe searching
- Health-conscious users who need portion control guidance
- Anyone who wants to reduce decision fatigue around daily meals

---

## 4. Navigation Structure

The app uses a **bottom pill-shaped tab bar** with 4 tabs:

| Tab | Icon | Description |
|-----|------|-------------|
| **Home** | Home | Daily meal dashboard |
| **Chef** | Chef / AI | AI meal generation flow |
| **Calendar** | Calendar | Weekly & monthly meal calendar |
| **Profile** | Profile | User account & settings |

---

## 5. Screens & Feature Requirements

### 5.1 Login Screen

**Purpose:** Onboard new users and authenticate returning users.

**UI Elements:**
- Lunchbox.ai circular logo
- Brand name: "Lunchbox.ai"
- Tagline: "Your AI-powered meal planner"
- **Continue with Google** button (OAuth)
- Divider ("or")
- **Continue with Email** button (email/password)
- Terms of Service & Privacy Policy disclaimer text

**Requirements:**
- FR-1.1: Users must be able to sign in via Google OAuth
- FR-1.2: Users must be able to sign in via email and password
- FR-1.3: On first login, redirect user to onboarding or Home
- FR-1.4: Persist authentication session across app restarts

---

### 5.2 Home Screen

**Purpose:** Daily meal overview and quick access to the day's meal plan.

**States:**
- **Collapsed** — compact view, shopping card visible, meals section header
- **Calendar Expanded** — shows today's meals broken out by Breakfast, Lunch, and Dinner cards

**UI Elements:**
- Status bar
- Shopping Card (quick-access card linking to Shopping List)
- Meals section header with expand/collapse toggle
- Meal cards: **Breakfast**, **Lunch**, **Dinner** (each card shows meal name, thumbnail, and metadata)
- Bottom tab bar

**Requirements:**
- FR-2.1: Display today's scheduled meals grouped by Breakfast, Lunch, and Dinner
- FR-2.2: Allow collapsing/expanding the meal section
- FR-2.3: Each meal card taps through to the full recipe preview
- FR-2.4: Shopping Card shows a count of pending items and links to Shopping List
- FR-2.5: Empty state shown if no meals are scheduled for today

#### Meal Card Expansion Rules

| Preparation Type | Expandable | Chevron Icon | Shows Ingredients & Steps |
|-----------------|-----------|--------------|--------------------------|
| **cooking** | ✅ Yes | ✅ Shown (up/down) | ✅ Yes |
| **microwaving** | ❌ No | ❌ Hidden | ❌ No |

- FR-2.6: Meal cards whose subtitle contains "cooking" are expandable — tapping toggles a detail panel showing **Ingredients** and **Steps**
- FR-2.7: Meal cards whose subtitle contains "microwaving" are **not expandable** — the chevron icon is hidden and the card header is non-interactive
- FR-2.8: The expanded panel displays an **Ingredients** section (bulleted list) followed by a **Steps** section (numbered list), separated from the header by a divider line

---

### 5.3 Chef Tab — AI Meal Generation Flow

The Chef tab drives the core AI feature. It is a 5-step flow.

#### Flow – Step 1: Food Input

**Purpose:** Capture the user's food preference via search or suggestion chips.

**UI Elements:**
- Search bar ("What do you feel like eating?")
- "POPULAR SUGGESTIONS" section label
- Suggestion chip rows (e.g., "Pasta", "Salad", "Stir fry", etc.)
- Floating Action Button (FAB) — AI Suggestions shortcut

**Requirements:**
- FR-3.1: User can type a free-form food query into the search bar
- FR-3.2: Popular suggestion chips are tappable and pre-fill the search bar
- FR-3.3: FAB button opens a curated AI suggestions grid (see Flow – After Suggestions)
- FR-3.4: Submitting the search bar triggers Step 2 (Loading)

---

#### Flow – After Pressing Suggestions (FAB)

**Purpose:** Show a grid of AI-curated recipe suggestions for the user to browse and select.

**UI Elements:**
- Recipe grid with multiple recipe cards (image, name, metadata)
- Bottom CTA action button ("Add to Plan" or similar)
- Back navigation in header

**Requirements:**
- FR-3.5: Display at least 6 AI-generated recipe suggestions in a 2-column grid
- FR-3.6: Tapping a recipe card selects it and highlights it
- FR-3.7: CTA button confirms selection and proceeds to Step 3 (Portions)

---

#### Flow – Step 2: Loading

**Purpose:** Communicate that AI is generating the recipe.

**UI Elements:**
- Centered spark/sparkle animated circle icon
- Loading text (e.g., "Generating your recipe…")
- Skeleton placeholder cards

**Requirements:**
- FR-3.8: Show animated loading state while AI processes the request
- FR-3.9: Transition automatically to Step 3 when generation completes
- FR-3.10: Display skeleton cards to set layout expectations

---

#### Flow – Step 3: Portions

**Purpose:** Allow the user to configure serving size / number of portions.

**UI Elements:**
- Header bar with back navigation and step label
- Portion selection UI (stepper or slider)
- FAB button to proceed

**Requirements:**
- FR-3.11: User can select the number of portions (default: 2)
- FR-3.12: Portion count affects ingredient quantities shown in the next step
- FR-3.13: FAB / proceed button navigates to Step 4

---

#### Flow – Step 4: Recipe Preview

**Purpose:** Show the full generated recipe before the user commits to scheduling it.

**UI Elements:**
- Header bar with back + share/save icons
- Recipe Card (hero image, title, cuisine tags, time, difficulty)
- Ingredients list (adjusted for selected portions)
- Shopping List section (items not already owned)
- Recipe / Steps section (numbered cooking instructions)
- FAB button ("Schedule" or "Add to Calendar")

**Requirements:**
- FR-3.14: Display recipe name, estimated cook time, and difficulty
- FR-3.15: Ingredient list scales dynamically with portion count from Step 3
- FR-3.16: Shopping List section highlights ingredients the user needs to buy
- FR-3.17: FAB button navigates to Step 5 (Weekly Calendar) to pick a slot
- FR-3.18: User can share or save the recipe

---

#### Flow – Step 5: Weekly Calendar

**Purpose:** Let the user schedule the generated recipe to a specific day and meal slot.

**UI Elements:**
- Header bar with back navigation
- Week label (e.g., "WEEK 11 · MAR 2026")
- Scrollable day list with time slots (Breakfast / Lunch / Dinner per day)
- FAB button to confirm scheduling

**Requirements:**
- FR-3.19: Display the current week (Mon–Sun) with meal slots per day
- FR-3.20: User taps a slot to assign the recipe to that day/meal
- FR-3.21: Confirming updates the Home screen and Calendar with the new meal
- FR-3.22: Newly scheduled ingredients are merged into the Shopping List

---

### 5.4 Meal Calendar

**Purpose:** View and manage the full meal plan across weeks and months.

**Views:**
- **Weekly View** — 7-day scrollable list with per-day meal slots
- **Monthly View** — Calendar grid with meal indicators per day + meal list below

**UI Elements (both views):**
- Month/week navigation header (back / forward arrows, current period label)
- Calendar grid or day list
- Meals section below the calendar showing scheduled items for the selected day
- Active "Calendar" tab highlighted in bottom nav

**Requirements:**
- FR-4.1: Toggle between weekly and monthly calendar views
- FR-4.2: Tapping a day in the monthly view shows that day's meals in the section below
- FR-4.3: Tapping a meal slot opens the Recipe Preview for that meal
- FR-4.4: Empty slots are clearly indicated and tappable to add a meal (triggers Chef flow)
- FR-4.5: Navigation arrows allow moving to previous/next week or month

---

### 5.5 Shopping List

**Purpose:** Consolidated grocery checklist automatically generated from scheduled meals.

**UI Elements:**
- Header with title "Shopping List" and item count badge (e.g., "8 items")
- Collapse/expand toggle
- List of grocery items, each with:
  - Checkbox (checked = purchased)
  - Item name
  - Quantity / unit
- Visual separator between items

**Requirements:**
- FR-5.1: Shopping list auto-populates from all upcoming scheduled meals
- FR-5.2: User can check off items as purchased; checked items appear struck through
- FR-5.3: Item count in the header reflects unchecked items remaining
- FR-5.4: User can manually add items to the list
- FR-5.5: User can delete individual items from the list
- FR-5.6: List is accessible from the Home screen shopping card shortcut

---

### 5.6 Profile Screen

**Purpose:** User account overview and settings hub.

**UI Elements:**
- Avatar (initials or photo) + username + subtitle
- Settings icon (top right of avatar section)
- **Stats Row** — 3 stat cards (e.g., Meals Planned, Recipes Saved, Streak)
- **Settings Menu Card** — list rows for:
  - Dietary Preferences
  - Notifications
  - Connected Apps (Google)
  - Help & Support
  - About
- **Log Out** button

**Requirements:**
- FR-6.1: Display user's name, avatar, and account info
- FR-6.2: Show key usage stats (meals planned, recipes saved, current streak)
- FR-6.3: Settings rows navigate to their respective sub-screens
- FR-6.4: Log Out button signs the user out and returns to the Login screen
- FR-6.5: User can update dietary preferences (influences AI recipe suggestions)

---

## 6. AI & Backend Requirements

| ID | Requirement |
|----|-------------|
| AI-1 | AI model generates recipes from free-text food queries |
| AI-2 | Recipes include: name, ingredients (with quantities), step-by-step instructions, estimated time, difficulty, and cuisine type |
| AI-3 | Ingredient quantities scale proportionally with selected portion count |
| AI-4 | Suggestion chips and recipe grid are personalized based on user preferences and history |
| AI-5 | Generation latency target: < 5 seconds for recipe output |
| AI-6 | Shopping list merges and deduplicates ingredients across all scheduled meals |

---

## 7. Design System

| Property | Value |
|----------|-------|
| Primary background | `#F7F7F8` (light grey) |
| Card background | `#FFFFFF` |
| Primary text | `#18181B` / `#3F3F46` |
| Secondary text | `#71717A` |
| Disabled / border | `#E4E4E7` |
| Active tab / accent | `#3F3F46` (near-black) |
| Login background | `#F5F5F5` |
| Font family | Inter |
| Corner radius (cards) | 16px |
| Corner radius (tab pill) | 100px |
| Shadow (cards) | 0 1px 3px `#0000000D` + blur 3px |
| Bottom tab bar | Pill-shaped, floating, 62px tall |

---

## 8. Out of Scope (v1.0)

- Social / sharing features (sharing to friends)
- Nutrition tracking / calorie counting
- Grocery delivery integration
- Multi-user household plans
- Offline mode

---

## 9. Open Questions

1. What is the exact list of default popular suggestion chips? Are they static or personalized?
2. Does the app support multiple dietary profiles per account (e.g., family members)?
3. What happens when a user re-generates a recipe for the same meal slot — does it replace or stack?
4. Are recipes stored persistently (user's recipe library) or generated on-demand each time?
5. What are the three stats shown on the Profile stats row?
