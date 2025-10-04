# Design Guidelines: Expense Management Web App

## Design Approach: Productivity-Focused System Design

**Selected Approach**: Modern productivity tool aesthetic inspired by Linear, Notion, and enterprise dashboards  
**Rationale**: This is a utility-focused, data-intensive application requiring clarity, efficiency, and professional presentation. Users need to process expense data quickly and accurately.

**Core Design Principles**:
- **Clarity over decoration**: Every element serves a functional purpose
- **Efficiency in workflows**: Minimize cognitive load for repetitive tasks
- **Role-based visual hierarchy**: Clear distinction between employee, manager, and admin views
- **Data readability**: Tables and forms optimized for scanning and input

---

## Color Palette

### Light Mode
- **Background**: 0 0% 98% (near-white, reduces eye strain)
- **Surface**: 0 0% 100% (cards, modals, elevated elements)
- **Border**: 220 13% 91% (subtle separation)
- **Primary**: 221 83% 53% (professional blue for actions)
- **Primary Hover**: 221 83% 45%
- **Success**: 142 76% 36% (approvals, positive status)
- **Warning**: 38 92% 50% (pending status)
- **Danger**: 0 84% 60% (rejections, delete actions)
- **Text Primary**: 222 47% 11% (high contrast)
- **Text Secondary**: 215 16% 47% (metadata, labels)

### Dark Mode
- **Background**: 222 47% 11%
- **Surface**: 217 33% 17%
- **Border**: 217 33% 23%
- **Primary**: 217 91% 60%
- **Primary Hover**: 217 91% 50%
- **Success**: 142 71% 45%
- **Warning**: 38 92% 60%
- **Danger**: 0 72% 51%
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 215 20% 65%

---

## Typography

**Font Stack**:
- **Primary**: 'Inter' (Google Fonts) - body text, forms, data tables
- **Headings**: 'Inter' with tighter letter-spacing and increased weight
- **Monospace**: 'JetBrains Mono' (for amounts, IDs, reference numbers)

**Type Scale**:
- **H1**: text-3xl font-bold (page titles)
- **H2**: text-2xl font-semibold (section headers)
- **H3**: text-lg font-semibold (card headers, table headers)
- **Body**: text-base (forms, content)
- **Small**: text-sm (metadata, captions)
- **Tiny**: text-xs (badges, timestamps)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** consistently
- Component padding: p-6 (cards), p-4 (compact elements)
- Section spacing: mb-8, mt-12
- Form field gaps: gap-6
- Grid gaps: gap-4

**Container Widths**:
- Dashboard containers: max-w-7xl mx-auto px-6
- Form containers: max-w-2xl
- Full-width tables: w-full with overflow-x-auto wrapper

**Grid Patterns**:
- Stats cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Expense cards: grid-cols-1 lg:grid-cols-2
- Form layouts: Single column for simplicity

---

## Component Library

### Navigation
- **Navbar**: Fixed top, backdrop-blur-sm bg-white/80 dark:bg-gray-900/80, shadow-sm
- **Sidebar** (optional desktop): w-64, bg-surface, with role-based menu items
- **Mobile Nav**: Hamburger menu with slide-out drawer

### Cards & Surfaces
- **Dashboard Cards**: bg-surface rounded-xl p-6 shadow-sm hover:shadow-md transition
- **Expense Cards**: border border-border rounded-lg p-4 with status indicator on left edge (4px colored strip)

### Forms
- **Input Fields**: bg-background border border-border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary
- **Labels**: text-sm font-medium mb-2 text-secondary
- **Select Dropdowns**: Custom styled with chevron icon
- **File Upload**: Drag-and-drop zone with dashed border, hover state

### Tables
- **Header**: bg-gray-50 dark:bg-gray-800 border-b border-border font-semibold text-sm
- **Rows**: hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-border
- **Cell Padding**: px-6 py-4
- **Responsive**: Wrap table in overflow-x-auto, stack on mobile

### Modals
- **Overlay**: bg-black/50 backdrop-blur-sm
- **Content**: bg-surface rounded-2xl max-w-2xl p-6 shadow-2xl
- **Header**: border-b border-border pb-4 mb-6

### Buttons
- **Primary**: bg-primary text-white rounded-lg px-4 py-2.5 font-medium hover:bg-primary-hover
- **Secondary**: bg-transparent border-2 border-border hover:bg-gray-50 dark:hover:bg-gray-800
- **Danger**: bg-danger text-white hover:bg-danger-hover
- **Ghost**: hover:bg-gray-100 dark:hover:bg-gray-800 text-secondary

### Status Badges
- **Approved**: bg-success/10 text-success border border-success/20 rounded-full px-3 py-1 text-xs font-semibold
- **Rejected**: bg-danger/10 text-danger border border-danger/20
- **Pending**: bg-warning/10 text-warning border border-warning/20
- **Draft**: bg-gray-500/10 text-gray-500 border border-gray-500/20

### Data Display
- **Currency Amounts**: Monospace font, larger weight, with currency symbol
- **Date/Time**: text-sm text-secondary with relative time (e.g., "2 days ago")
- **Multi-currency Indicator**: Small badge showing "Converted from USD" in gray

---

## Page-Specific Guidelines

### Login Page (/login)
- Centered card max-w-md with logo at top
- Clean form with email/password fields
- Toggle between Login/Signup modes
- No distracting backgrounds, focus on form

### Dashboard (/dashboard)
- Stats cards at top (Total Expenses, Pending Approvals, etc.) in 4-column grid
- Quick action buttons below stats
- Recent activity feed or expense summary table

### Employee Dashboard (/employee)
- Split layout: Left = Submit Expense form (sticky), Right = Expense history table
- Form includes: Amount (large input), Category (dropdown), Date (date picker), Description (textarea), Receipt upload zone
- Table shows: Date, Category, Amount, Status badge, Actions (View/Edit)

### Manager Dashboard (/manager)
- List/card view of pending expenses with employee name, amount, category
- Each item has Approve/Reject buttons with comment field that expands on interaction
- Filters at top: By employee, by date range, by amount threshold

### Rules Page (/rules)
- Tab interface for: Percentage Rules, Specific Approver, Hybrid Rules
- Each rule displayed as card with Edit/Delete actions
- Add Rule button opens modal with rule configuration form

### OCR Page (/ocr)
- Left: Large upload zone (50% width) with drag-and-drop
- Right: Auto-filled form fields that populate after "upload"
- Visual connection (arrow/line) showing data flow from receipt to fields

---

## Animations
**Minimal, purposeful motion only**:
- Page transitions: None
- Modal entrance: Fade + slight scale (200ms)
- Button hover: Background color transition (150ms)
- Dropdown menus: Slide down (200ms)
- Status badge changes: Color transition (300ms)
- NO parallax, NO scroll-triggered animations, NO decorative motion

---

## Accessibility
- Form inputs have visible labels and proper focus states
- Status conveyed through color AND text (not color alone)
- Keyboard navigation supported throughout
- ARIA labels on icon-only buttons
- Dark mode maintains WCAG AA contrast ratios (4.5:1 minimum)
- All interactive elements have min-height of 44px (touch targets)