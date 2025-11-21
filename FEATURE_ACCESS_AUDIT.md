# Feature Access Control Audit

## Comparison: Table vs Implementation

### ✅ MATCHES - What We Have Correctly

1. **View stakeholder list** ✅
   - Table: All roles: Yes
   - Implementation: ✅ All roles can view

2. **Filter/search** ✅
   - Table: All roles: Yes
   - Implementation: ✅ All roles can filter/search

3. **View project budgets** ✅
   - Table: Public: No, Org: No, Funder: Yes, Admin: Yes
   - Implementation: ✅ Correctly restricted to Funder/Admin

4. **Moderation queue** ✅
   - Table: Only Admin
   - Implementation: ✅ Only Admin can access `/dashboard/admin/claims`

5. **Taxonomy tools** ✅
   - Table: Only Admin
   - Implementation: ✅ Only Admin can access `/dashboard/admin/taxonomy`

---

### ⚠️ DIFFERENCES - What's Different

#### 1. **View org profile** - PARTIALLY DIFFERENT
   - **Table says:**
     - Public: Public fields only
     - Registered Org: Public + own private fields
     - Funder: All fields (including funder-only)
     - Admin: All fields
   
   - **We have:**
     - Public: Public fields only ✅
     - Org: Public + collaboration_needs ✅
     - Funder: Public + collaboration_needs + budget ✅
     - Admin: All fields ✅
   
   - **Status:** ✅ **MATCHES** - We correctly show orgs their own private fields, funders see funder-only fields

#### 2. **Claim org profile** - DIFFERENT
   - **Table says:**
     - Public: No
     - Registered Org: Yes (if unclaimed)
     - Funder: No
     - Admin: Can override
   
   - **We have:**
     - Public: ✅ Can claim (via email/API)
     - Registered Org: ✅ Can claim
     - Funder: ✅ Can claim (should be No)
     - Admin: ✅ Can approve/reject claims
   
   - **Issue:** 
     - ❌ Public users can claim (table says No)
     - ❌ Funders can claim (table says No)
     - ✅ Need to check if org is already claimed before showing button

#### 3. **Create/edit own org profile** - MISSING MODERATION
   - **Table says:**
     - Public: No
     - Registered Org: Yes (goes to moderation)
     - Funder: Yes (goes to moderation)
     - Admin: Direct publish
   
   - **We have:**
     - Public: ✅ No
     - Registered Org: ✅ Yes, but **NO MODERATION** - saves directly
     - Funder: ✅ Yes, but **NO MODERATION** - saves directly
     - Admin: ✅ Direct publish
   
   - **Issue:** 
     - ❌ Missing moderation workflow - org/funder edits should go to moderation queue
     - ❌ Admin should be able to approve/reject org profile edits

#### 4. **Create/edit projects** - MISSING MODERATION
   - **Table says:**
     - Public: No
     - Registered Org: Yes (goes to moderation)
     - Funder: Yes (goes to moderation)
     - Admin: Direct publish
   
   - **We have:**
     - Public: ✅ No
     - Registered Org: ✅ Yes, but **NO MODERATION** - saves directly
     - Funder: ✅ Yes, but **NO MODERATION** - saves directly
     - Admin: ✅ Direct publish
   
   - **Issue:** 
     - ❌ Missing moderation workflow - org/funder project edits should go to moderation queue
     - ❌ Admin should be able to approve/reject project edits

#### 5. **Export data** - NOT IMPLEMENTED
   - **Table says:**
     - Public: No
     - Registered Org: No
     - Funder: Yes (Phase 2)
     - Admin: Yes
   
   - **We have:**
     - ✅ `canExportData()` function exists in permissions.ts
     - ❌ **NO EXPORT UI/API** - No actual export functionality
   
   - **Issue:** 
     - ❌ Need to implement export functionality (CSV/JSON) for funders and admins

---

## Summary

### ✅ Correctly Implemented (6/10)
1. View stakeholder list
2. View org profile (field visibility)
3. Filter/search
4. View project budgets
5. Moderation queue (claims)
6. Taxonomy tools

### ⚠️ Needs Fixing (4/10)
1. **Claim org profile** - Wrong access: Public and Funder shouldn't be able to claim
2. **Create/edit own org profile** - Missing moderation workflow
3. **Create/edit projects** - Missing moderation workflow
4. **Export data** - Function exists but no UI/implementation

---

## Recommended Fixes

### Priority 1: Claim Access Control
- Restrict claim button to only Registered Org users
- Hide from Public and Funder users
- Check if org is already claimed before showing button

### Priority 2: Moderation Workflow
- Create moderation queue for org profile edits
- Create moderation queue for project edits
- Admin can approve/reject changes
- Org/Funder edits go to "pending" status until approved

### Priority 3: Export Data
- Add export button for Funder/Admin roles
- Implement CSV/JSON export for stakeholders and projects
- Add export to dashboard and relevant pages

