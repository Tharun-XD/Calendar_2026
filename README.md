# Events Calendar 2026 – Project Prompt

I want to build a **live, interactive web-based Events Calendar for the year 2026** using **HTML, CSS, and JavaScript** (no heavy frameworks). The calendar should display **India-specific events, worldwide events, and dates that contain both**, with clear visual differentiation and a clean, modern user experience.

---

## Project Goal

Create a **single-page calendar web application** that:

* Displays events for **each date in 2026**
* Allows users to **navigate months easily**
* Shows **event details in a popup/modal** when a date is clicked
* Differentiates **India events**, **World events**, and **Mixed events**
* Is **mobile-friendly**, swipe-enabled, and accessible
* Uses a **pre-prepared JSON dataset** as the source of truth

---

## Data Source & Structure

### 1️ Events Data (JSON)

The calendar data is stored in a `.json` file with the following structure:

```json
{
  "jan": [
    {
      "date": 1,
      "events": [
        {
          "title": "New Year's Day",
          "description": "One paragraph description (4–6 sentences).",
          "category": "Worldwide"
        }
      ]
    }
  ],
  "feb": [...],
  "mar": [...],
  ...
  "dec": [...]
}
```

### Key Notes:

* Each month key (`jan` to `dec`) contains an array of date objects
* Each date object contains:

  * `date` → numeric day of the month
  * `events` → array of event objects
* Each event has:

  * `title`
  * `description` (already populated)
  * `category` → `"India"` or `"Worldwide"`
* Some dates may contain **multiple events**
* Some dates may contain **both India and Worldwide events**

---

## Page Layout Structure

The page should be structured in the following order:

### 1️ Header / Title Section

* Page title: **“Events Calendar 2026”**
* Optional short subtitle or intro text

### 2️ Description Section

* Brief explanation of what the calendar is and how to use it

### 3️ Controls Section

* **Month selector**

  * Buttons or dropdown for months
* **Region filter**

  * Options:

    * India
    * Worldwide
    * Both
  * Filtering should affect event visibility and/or color indicators

### 4️ Calendar Section

* Monthly **calendar table**
* Only **one month visible at a time**
* The calendar should:

  * Open to the **current month by default**
  * Highlight the **current date**
  * Be navigable via:

    * Left/right arrow buttons
    * Swipe gestures (mobile)
    * Month selector buttons
* Dates with events should be visually highlighted

### 5️ Footer

* Simple footer (credits / year / purpose)

---

## Visual Rules & Color Logic

* Date boxes should be color-coded:

  * **India events** → Color A
  * **Worldwide events** → Color B
  * **Both India + Worldwide** → Color C
* Colors should be defined as **CSS variables in `:root`**
* If region filtering is active, color indicators may be hidden or adjusted

---

## Navigation & Interaction Behavior

### Month Navigation

Users can navigate months using:

* Arrow buttons (left/right)
* Swipe gestures (touch devices)
* Month selector buttons

All navigation methods should update the same internal state.

---

### Event Interaction

* Clicking on a date with events opens a **modal/popup**
* The popup should display:

  * Date
  * Event title(s)
  * Description(s)
  * Category (India / Worldwide)
* If multiple events exist on the same date, show all in the popup

---

## Mobile & Accessibility Requirements

* Fully responsive design
* Swipe gestures supported on touch devices
* Keyboard navigation support
* Accessible buttons and labels (`aria` where appropriate)

---

## Technical Constraints

* Use **vanilla HTML, CSS, and JavaScript**
* No backend required (static site)
* JSON file loaded locally
* Modular, readable, and maintainable code
* Designed so features can be added later (search, year switch, etc.)

---

## Security Considerations

* No user input stored
* No authentication
* Data is read-only
* Safe to deploy as a static site

---

## Future Enhancements (Optional)

* Year selector
* Event search
* Print/export calendar
* Dark mode
* PWA support

---

## Expected Outcome

A clean, responsive, interactive **Events Calendar 2026** that:

* Is intuitive to use
* Works well on desktop and mobile
* Clearly distinguishes event types
* Displays rich event descriptions on interaction
