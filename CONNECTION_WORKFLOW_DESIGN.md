# Connection Workflow Design (MVP - No Chat)

## 🎯 **Goal**
Enable organizations to express interest in projects and connect, **without real-time chat functionality**.

---

## 🔄 **Proposed Workflow**

### **Scenario 1: Express Interest in a Project**

**Step 1: User Clicks "Express Interest"**
- User (Org A) views a project owned by Org B
- Clicks "Express Interest" button
- **Action:** Creates a connection record in database

**Step 2: Connection Record Created**
```
Connection:
- id: unique_id
- requester_id: Org A's user ID
- requester_org_id: Org A's organization ID
- requester_org_name: "Org A"
- project_id: project_id
- project_title: "Project Name"
- owner_org_id: Org B's organization ID
- owner_org_name: "Org B"
- status: "pending"
- message: (optional) "We'd like to contribute volunteers..."
- created_at: timestamp
- responded_at: null
```

**Step 3: Notification Sent**
- Email sent to project owner (Org B)
- Subject: "New Interest in Your Project: [Project Name]"
- Body includes:
  - Who expressed interest (Org A)
  - Project details
  - Optional message from requester
  - Link to view connection in dashboard

**Step 4: Project Owner Reviews**
- Org B sees connection in their dashboard
- "My Projects" → Project → "Connection Requests" tab
- Shows: Pending requests with requester info
- Actions: "Accept" or "Decline"

**Step 5: Owner Accepts/Declines**
- **If Accepted:**
  - Status changes to "accepted"
  - Connection record updated
  - **Contact info shared:**
    - Org A can see Org B's contact info (if org allows)
    - Org B can see Org A's contact info
  - Email notification sent to requester (Org A)
  - Email subject: "Your Interest in [Project] Has Been Accepted"
  
- **If Declined:**
  - Status changes to "declined"
  - Email notification sent to requester
  - No contact info shared

**Step 6: Connection Established**
- Both parties can see connection status in "My Connections"
- They can see each other's contact info (if accepted)
- **They connect outside the platform** (email, phone, etc.)

---

### **Scenario 2: Contact Organization Directly**

**Step 1: User Clicks "Contact Organization"**
- User views an organization profile
- Clicks "Contact Organization" button
- **Action:** Creates a connection record (different type)

**Step 2: Connection Record Created**
```
Connection:
- id: unique_id
- requester_id: User ID
- requester_org_id: Org A's organization ID
- requester_org_name: "Org A"
- organization_id: Org B's organization ID (target org)
- organization_name: "Org B"
- connection_type: "organization_contact" (vs "project_interest")
- status: "pending"
- message: (optional) "We'd like to discuss partnership..."
- created_at: timestamp
```

**Step 3: Notification Sent**
- Email sent to organization (Org B)
- Subject: "Contact Request from [Org A]"
- Body includes requester info and message

**Step 4: Organization Reviews**
- Org B sees connection in dashboard
- "My Organization" → "Contact Requests" section
- Actions: "Accept" or "Decline"

**Step 5: Accept/Decline**
- Same as project workflow
- Contact info shared if accepted

---

## 📊 **Database Schema**

```sql
CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    
    -- Requester (who initiated)
    requester_id TEXT NOT NULL, -- User ID
    requester_org_id TEXT NOT NULL, -- Organization ID
    requester_org_name TEXT NOT NULL,
    requester_email TEXT, -- For notifications
    
    -- Target (what they're interested in)
    connection_type TEXT NOT NULL, -- 'project_interest' or 'organization_contact'
    project_id TEXT, -- If project_interest
    project_title TEXT, -- Denormalized
    organization_id TEXT, -- If organization_contact or project owner
    organization_name TEXT, -- Denormalized
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'withdrawn'
    
    -- Communication
    message TEXT, -- Optional message from requester
    response_message TEXT, -- Optional response from owner
    
    -- Timestamps
    created_at TEXT NOT NULL,
    responded_at TEXT, -- When owner accepted/declined
    responded_by TEXT, -- User ID who responded
    
    -- Metadata
    notification_sent INTEGER DEFAULT 0, -- Boolean: email sent?
    last_notified_at TEXT -- When last notification sent
);
```

---

## 🎨 **UI Components Needed**

### **1. Updated "Express Interest" Button**
- Current: Opens email client
- New: Creates connection record, shows confirmation
- After click: "Your interest has been submitted. The project owner will be notified."

### **2. "My Connections" Page** (`/dashboard/connections`)
- Shows all connections user has initiated or received
- Tabs:
  - **Sent** (connections I initiated)
  - **Received** (connections others initiated with me)
  - **Active** (accepted connections)
- Each connection shows:
  - Project/Organization name
  - Status badge (Pending, Accepted, Declined)
  - Date
  - Actions (Accept/Decline for received, View for sent)

### **3. Project Detail Page - Connection Requests Tab**
- For project owners only
- Shows pending connection requests for that project
- Quick Accept/Decline actions

### **4. Organization Dashboard - Contact Requests Section**
- Shows pending contact requests
- Quick Accept/Decline actions

### **5. Connection Status Badge**
- On project cards: "X organizations interested"
- On organization cards: "X contact requests"
- Visual indicators of activity

---

## 📧 **Email Notifications**

### **1. New Connection Request (to Project Owner)**
```
Subject: New Interest in Your Project: [Project Name]

Hi [Org B],

[Org A] has expressed interest in your project "[Project Name]".

[Optional message from requester]

View and respond to this connection request:
[Link to dashboard/connections]

Best regards,
ICAR Platform
```

### **2. Connection Accepted (to Requester)**
```
Subject: Your Interest in [Project] Has Been Accepted

Hi [Org A],

Great news! [Org B] has accepted your interest in "[Project Name]".

You can now contact them directly:
- Email: [email] (if contact_setting allows)
- Organization Profile: [link]

View this connection:
[Link to dashboard/connections]

Best regards,
ICAR Platform
```

### **3. Connection Declined (to Requester)**
```
Subject: Update on Your Interest in [Project]

Hi [Org A],

[Org B] has declined your interest in "[Project Name]".

You can explore other collaboration opportunities on ICAR:
[Link to projects]

Best regards,
ICAR Platform
```

---

## 🔐 **Privacy & Contact Settings**

### **Contact Info Sharing Rules:**
1. **If organization has `contact_setting = 'open'`:**
   - Contact info shared immediately upon acceptance
   - Email, phone visible to accepted connections

2. **If organization has `contact_setting = 'via_icar'`:**
   - ICAR forwards the connection request
   - Organization decides whether to share contact info
   - May require manual approval

3. **If organization has `contact_setting = 'closed'`:**
   - No "Contact Organization" button shown
   - Can still express interest in projects (but contact via ICAR)

---

## 📱 **User Experience Flow**

### **For Requester (Org A):**
1. Browse projects → Find interesting one
2. Click "Express Interest"
3. Optional: Add message
4. See confirmation: "Interest submitted!"
5. Receive email when accepted/declined
6. View in "My Connections" → See status
7. If accepted: See contact info, connect outside platform

### **For Project Owner (Org B):**
1. Receive email notification
2. View in dashboard → "My Projects" → Project → "Connections"
3. See pending requests with requester info
4. Accept or Decline
5. If accepted: Connection established, contact info shared
6. View in "My Connections" → "Received" tab

---

## 🎯 **Key Features**

### **What This Provides:**
✅ Connection tracking (who's interested in what)
✅ Status management (pending, accepted, declined)
✅ Email notifications
✅ Contact info sharing (with privacy controls)
✅ "My Connections" dashboard
✅ Activity indicators (X interested, X requests)

### **What This Doesn't Provide:**
❌ Real-time chat
❌ In-app messaging
❌ File sharing
❌ Video calls
❌ Collaboration tools

### **The Handoff:**
- Platform facilitates the connection
- Actual collaboration happens outside the platform
- Platform tracks the relationship status

---

## 🔄 **Alternative: Simpler MVP Version**

If the above is too complex for MVP, here's a simpler version:

### **Simplified Workflow:**
1. User clicks "Express Interest"
2. Connection record created
3. Email sent to owner with requester's contact info
4. Owner contacts requester directly (outside platform)
5. No status tracking (just notification)

**Pros:** Simpler, faster to build
**Cons:** No tracking, no "My Connections" page, less structured

---

## ❓ **Questions to Decide:**

1. **Do we want status tracking?** (Pending/Accepted/Declined)
   - **Yes:** More structured, better UX, more work
   - **No:** Simpler, just notifications

2. **Do we want "My Connections" page?**
   - **Yes:** Users can see all their connections
   - **No:** Just email notifications

3. **Contact info sharing:**
   - **Automatic on accept:** Requester gets owner's contact info
   - **Manual:** Owner decides whether to share
   - **Via ICAR only:** Always goes through ICAR team

4. **Connection types:**
   - **Just projects:** Only express interest in projects
   - **Projects + Organizations:** Can also contact orgs directly
   - **Just organizations:** Only org-to-org contact

---

## 💡 **My Recommendation for MVP:**

**Go with the full workflow** (with status tracking) because:
1. It's not much more complex than the simple version
2. Provides real value (connection management)
3. Sets foundation for future features
4. Better user experience
5. Makes the platform feel "complete"

**But simplify:**
- Start with **project connections only** (not org-to-org)
- Skip the "response_message" field initially
- Basic email notifications (can enhance later)

**MVP Scope:**
- Express Interest → Connection record
- Status tracking (Pending/Accepted/Declined)
- Email notifications
- "My Connections" page
- Contact info sharing on accept

This gives users a complete connection workflow without chat, and they can take conversations offline once connected.

---

## 🚀 **Implementation Priority:**

1. **Database table** (connections)
2. **API endpoints** (create, list, accept/decline)
3. **Update "Express Interest" button** (create connection instead of email)
4. **"My Connections" page**
5. **Email notifications**
6. **Project detail page** (show connection requests for owners)

---

What do you think? Does this workflow make sense for MVP without chat?

