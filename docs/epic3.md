# Epic 3: UI

## 🎯 Goal  
Develop a robust and intuitive user interface for managing series, episodes, subtitles, and file movements.

## ✅ Tasks  
### **Task 1 – Create Design System with Theme**
- **1.1** Create a theme system with light/dark mode support  
    - Define primary, secondary, and background colors  
    - Create typography rules (font sizes, weights, line height)  
    - Define spacing rules (padding, margin, etc.)  

- **1.2** Build reusable components  
    - Button  
    - Modal  
    - Card  

- **1.3** Ensure consistent styling with Tailwind  
    - Create `tailwind.config.js`  
    - Define color tokens and spacing rules  
    - Test with reusable components  

---

### **Task 2 – Create High-Level Pages**
- **2.1** Create Dashboard Page  
    - Show watching status  
    - Highlight missing episodes  
    - Reflect subtitle status  

- **2.2** Create Series Page  
    - List all tracked series  
    - Add filtering by status, subtitles, and Plex sync  

- **2.3** Create Episode Page  
    - Display episode details  
    - Reflect subtitle and status info  

- **2.4** Create Settings Page  
    - Add form for Plex/OpenSubtitles token management  
    - Add sync toggle  

- **2.5** Create Manage Paths Page  
    - Allow user to add/edit/remove paths  
    - Display path status  

- **2.6** Create Scanner Page  
    - Trigger filesystem scan  
    - Show scan status and detected series  

---

### **Task 3 – Implement State Management**
- **3.1** Set up React Context  
    - Create state provider  
    - Handle state updates  

- **3.2** Use SWR for real-time state updates  
    - Create fetchers for state updates  
    - Handle revalidation logic  

- **3.3** Sync state with backend  
    - Trigger revalidation on changes  
    - Handle caching  

---

### **Task 4 – Create Global Error Boundary**
- **4.1** Create ErrorBoundary component  
    - Catch and handle UI-level errors  
    - Display fallback UI  

- **4.2** Log errors for debugging  
    - Use `console.error` or `Sentry`  
    - Provide readable error messages  

---

### **Task 5 – Store Dark/Light Mode in Local Storage**
- **5.1** Store user preference in local storage  
    - Save current mode to `localStorage`  

- **5.2** Ensure persistence across sessions  
    - Restore mode on app reload  

- **5.3** Reflect mode changes dynamically  
    - Update UI on mode change  

---

### **Task 6 – Define Component Structure**
- **6.1** Create `components/` directory  
    - Create `/components`  
    - Create `/hooks`  

- **6.2** Organize UI components logically  
    - Group components by feature  
    - Create shared directory for common components  

- **6.3** Create hooks for shared logic  
    - Create `useFetch` hook  
    - Create `useStateManager` hook  

---

### **Task 7 – Ensure Accessibility (a11y) Compliance**
- **7.1** Follow WCAG color contrast guidelines  
    - Test contrast levels using an accessibility tool  

- **7.2** Add ARIA roles for dynamic content  
    - Add `role="button"` and `aria-label` where needed  

- **7.3** Implement focus state handling  
    - Ensure focus is visible on keyboard navigation  

---

### **Task 8 – Add Metadata & SEO Handling**
- **8.1** Create `next/head` defaults  
    - Add title, description, and canonical URL  

- **8.2** Add OpenGraph metadata  
    - Add image, title, and description for social sharing  

- **8.3** Ensure dynamic metadata updates  
    - Reflect dynamic titles and descriptions based on series data  

## 🏆 Status  
⏳ Planned  

## 📝 Notes  
This epic focuses on ensuring the frontend is modular, consistent, and scalable.