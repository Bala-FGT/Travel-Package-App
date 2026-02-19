# User Stories - Travel Package App MVP

## Epic 1: Destination Browsing

### US 1.1: Homepage Destination Display
**As a** visitor  
**I want to** see all available destinations on the homepage  
**So that** I can quickly browse and choose a destination to explore  

**Acceptance Criteria:**
- Homepage displays 4 destinations: Ooty, Munnar, Kodaikanal, Coorg
- Each destination shows an image and name
- Clicking a destination navigates to its detail page

### US 1.2: Destination Detail View
**As a** visitor  
**I want to** view details about a specific destination  
**So that** I can learn about the place before choosing a package  

**Acceptance Criteria:**
- Destination page shows name, description, and image
- Page displays list of available packages for that destination

---

## Epic 2: Package Information

### US 2.1: Package Listing
**As a** visitor  
**I want to** see all packages available for a destination  
**So that** I can compare options  

**Acceptance Criteria:**
- Each package shows: title, duration, highlights, price
- Packages are displayed in a card or list format
- Clicking a package shows full details

### US 2.2: Package Details View
**As a** visitor  
**I want to** view complete package information  
**So that** I can decide if this package suits my needs  

**Acceptance Criteria:**
- Package details page shows: title, duration, highlights, price
- "Show Interest" button is prominently displayed
- Navigation back to destination is available

---

## Epic 3: Lead Capture

### US 3.1: Access Lead Form
**As a** interested visitor  
**I want to** access the lead capture form from any package  
**So that** I can submit my interest  

**Acceptance Criteria:**
- "Show Interest" button is visible on each package
- Clicking button navigates to lead capture form
- Form pre-fills package context if applicable

### US 3.2: Fill Lead Form
**As a** potential customer  
**I want to** enter my contact information in the form  
**So that** the travel agency can reach me  

**Acceptance Criteria:**
- Form includes: Name (required), Phone (required, 10-digit), Travel Date (optional), Number of Travelers (optional)
- Phone field validates 10-digit format
- All required fields must be filled before submission

### US 3.3: Form Validation
**As a** system  
**I want to** validate user input before submission  
**So that** invalid leads are not captured  

**Acceptance Criteria:**
- Name: Required, minimum 2 characters
- Phone: Required, exactly 10 digits, numbers only
- Travel Date: Optional, date picker or text input
- Travelers: Optional, number input (1-20)
- Error messages display below invalid fields

### US 3.4: Form Submission
**As a** potential customer  
**I want to** submit my interest  
**So that** the agency can contact me  

**Acceptance Criteria:**
- Submit button is disabled until form is valid
- On submit: data is saved to local storage
- On success: confirmation popup appears
- On failure: error message displayed

---

## Epic 4: Confirmation & Feedback

### US 4.1: Success Confirmation
**As a** lead submitter  
**I want to** see a confirmation after submitting  
**So that** I know my enquiry was received  

**Acceptance Criteria:**
- Modal popup appears after successful submission
- Popup shows: "Thank you! We'll contact you soon"
- Popup has "OK" button to close
- After closing, user can continue browsing or leave

### US 4.2: Error Handling
**As a** visitor  
**I want to** see error messages if submission fails  
**So that** I know what went wrong  

**Acceptance Criteria:**
- Network/server errors display a message
- User can retry submission
- Form data is preserved after error

---

## Epic 5: Data Management

### US 5.1: Lead Storage
**As a** system  
**I want to** store submitted leads  
**So that** the agency can access them  

**Acceptance Criteria:**
- Leads are stored in local storage
- Each lead contains: name, phone, date, travelers, timestamp, package/destination
- Data persists across browser sessions

---

## Epic 6: Responsive Experience

### US 6.1: Mobile Responsive Design
**As a** mobile user  
**I want to** use the app on my phone  
**So that** I can browse and submit interest easily  

**Acceptance Criteria:**
- Layout adapts to mobile screens (320px+)
- Touch targets are minimum 44x44px
- Forms are usable on mobile keyboards
- Images and text are readable without zooming
