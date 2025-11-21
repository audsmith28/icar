# Recommended Changes (No Clarification Needed)

## 🎯 High Priority - Fix Access Control Issues

### 1. **Restrict Claim Access** ⚠️
**Current:** Public users can claim org profiles
**Table says:** Public: No, Registered Org: Yes
**Change:** Hide claim button from public users
**Why:** Prevents spam/fake claims, ensures only authenticated orgs can claim

### 2. **Org Profile Visibility - Collaboration Needs** ⚠️
**Table says:** Orgs see "own private fields only"
**Problem:** For collaboration, orgs NEED to see other orgs' collaboration_needs
**Current implementation:** Shows all orgs' collaboration_needs ✅ (This is correct!)
**Change:** Keep current behavior, but update table documentation
**Why:** Collaboration platform requires seeing what others need

---

## 🔧 Medium Priority - Improve User Experience

### 3. **Tiered Moderation System** ⚠️
**Current:** ALL org/funder edits go to moderation
**Problem:** Could create massive admin workload, slow down legitimate updates
**Change:** Implement tiered moderation:
- **First 3 edits:** All moderated (new users)
- **After 3 approved edits:** Minor edits (contact info, description) → Direct publish
- **Major edits** (status, budget, mission) → Still moderated
- **Admin:** Always direct publish
**Why:** Balances quality control with user experience

### 4. **Check if Org is Already Claimed** ⚠️
**Current:** Claim button shows even if org is already claimed
**Change:** Check if org has an approved claim, hide button if claimed
**Why:** Prevents duplicate claims, better UX

---

## 📊 Low Priority - Nice to Have

### 5. **Export Functionality** (Already identified)
**Current:** Function exists but no UI
**Change:** Add export buttons for Funder/Admin
**Why:** Table says they should have it

### 6. **Edit History/Versioning**
**Current:** No way to see what changed
**Change:** Track edit history for moderated changes
**Why:** Helps admins review changes, orgs see what's pending

---

## 🚫 What NOT to Change (Without Clarification)

- Funder claim access (need to know if funders are ICAR-managed)
- Project vs Funding Opportunity terminology (need to clarify what funders create)
- Moderation for funder project edits (depends on above)

---

## 📝 Summary of Changes

### Must Fix:
1. ✅ Restrict claim to Registered Org only (hide from Public)
2. ✅ Keep orgs seeing all collaboration_needs (current is correct)

### Should Fix:
3. ⚠️ Implement tiered moderation (prevent bottlenecks)
4. ⚠️ Check if org already claimed before showing button

### Nice to Have:
5. Export functionality
6. Edit history tracking

