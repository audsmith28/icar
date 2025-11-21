# Feature Access Logic Review

## ✅ LOGIC THAT MAKES SENSE

### 1. **View stakeholder list** - All roles: Yes ✅
**Rationale:** Public directory should be accessible to everyone. Makes perfect sense.

### 2. **View org profile** - Field visibility by role ✅
**Rationale:** 
- Public sees public info only (privacy)
- Orgs see their own private fields (self-management)
- Funders see all fields (need full info for funding decisions)
- Admin sees everything (oversight)
**Makes sense** - Good privacy model.

### 3. **Filter/search** - All roles: Yes ✅
**Rationale:** Everyone should be able to search. Makes sense.

### 4. **View project budgets** - Only Funder/Admin ✅
**Rationale:** Budgets are sensitive financial data. Only funders (who need it for decisions) and admins should see. **Makes sense.**

### 5. **Moderation queue** - Only Admin ✅
**Rationale:** Only admins should moderate. **Makes sense.**

### 6. **Taxonomy tools** - Only Admin ✅
**Rationale:** System-level configuration should be admin-only. **Makes sense.**

### 7. **Export data** - Funder/Admin only ✅
**Rationale:** Funders need data for analysis/reporting. Admins need it for oversight. **Makes sense.**

---

## 🤔 LOGIC THAT COULD BE QUESTIONED

### 1. **Claim org profile** - Funder: No ⚠️
**Table says:** Funders cannot claim org profiles
**Potential issue:**
- What if a funder organization wants to manage their own profile?
- Are funders always added by ICAR directly?
- If a funder org exists in the directory, why can't they claim it?

**Recommendation:** 
- If funders are always ICAR-managed → Makes sense
- If funders might want self-service → Should allow claiming
- **Clarification needed:** How are funder organizations added to the system?

### 2. **Create/edit projects** - Funder: Yes (with moderation) ⚠️
**Table says:** Funders can create/edit projects
**Potential issue:**
- What does "project" mean for a funder?
- Are these funding opportunities/grants?
- Or are funders creating projects they want to fund?
- Could be confusing terminology

**Recommendation:**
- If funders create "funding opportunities" → Should these be a separate entity type?
- If funders create "projects they want to fund" → Makes sense
- **Clarification needed:** What is a "project" from a funder's perspective?

### 3. **Moderation for ALL org/funder edits** - Could be a bottleneck ⚠️
**Table says:** Every org/funder edit goes to moderation
**Potential issue:**
- Could create significant moderation workload
- Might slow down legitimate updates
- Could frustrate users if edits take days to approve

**Recommendation:**
- Consider: Minor edits (typos, contact info) → Direct publish
- Major edits (mission, budget, status) → Moderation
- Or: First-time edits → Moderation, subsequent edits → Direct (trusted users)
- **Alternative:** Auto-approve after X successful edits

### 4. **View org profile** - Org sees "own private fields" ⚠️
**Table says:** Registered Org sees "Public + own private fields"
**Potential issue:**
- What if an org wants to see OTHER orgs' private fields?
- The table implies they can only see their own
- But for collaboration, might want to see other orgs' collaboration_needs

**Current implementation:** Orgs can see collaboration_needs for ALL orgs (not just their own)
**Question:** Should orgs see:
- Option A: Only their own private fields (table says this)
- Option B: All orgs' collaboration_needs (current implementation)

**Recommendation:** Option B makes more sense for a collaboration platform - orgs need to see what others need to collaborate.

---

## 🎯 RECOMMENDED CLARIFICATIONS

### High Priority Questions:

1. **Funder role definition:**
   - Are funders always ICAR-managed organizations?
   - Or can funder organizations self-register?
   - This affects the "claim" logic

2. **Project vs Funding Opportunity:**
   - When a funder creates a "project", what is it?
   - Is it a funding opportunity they're offering?
   - Or a project they want to fund?
   - Consider separate entity types if different

3. **Moderation scope:**
   - Should ALL edits be moderated, or just major changes?
   - Could create workflow bottlenecks
   - Consider tiered moderation (trusted users get direct publish)

4. **Org profile visibility:**
   - Should orgs see other orgs' collaboration_needs?
   - Table implies "own private fields only"
   - But collaboration requires seeing others' needs

---

## 💡 SUGGESTED IMPROVEMENTS

### 1. **Tiered Moderation** (Instead of all-or-nothing)
- **New orgs:** All edits moderated
- **Trusted orgs** (after X approved edits): Minor edits direct, major edits moderated
- **Admin:** Always direct

### 2. **Separate "Funding Opportunities" from "Projects"**
- Projects = What orgs are doing
- Funding Opportunities = What funders are offering
- Different entity types, different workflows

### 3. **Allow Funders to Claim** (If they're orgs too)
- If a funder organization exists in the directory
- They should be able to claim and manage their profile
- Unless funders are always ICAR-managed (then current logic is fine)

### 4. **Org Profile Visibility** (Clarify intent)
- Option A (Table): Orgs see only their own private fields
- Option B (Better for collaboration): Orgs see all orgs' collaboration_needs
- Recommend Option B for a collaboration platform

---

## 📊 Overall Assessment

**The table logic is mostly sound**, but a few areas need clarification:

1. ✅ **Access control is well-designed** - Good privacy model
2. ⚠️ **Moderation scope might be too broad** - Could create bottlenecks
3. ⚠️ **Funder role needs clarification** - What can they do and why?
4. ⚠️ **Terminology could be clearer** - "Project" vs "Funding Opportunity"

**Bottom line:** The logic is solid, but consider the moderation workflow carefully - it could become a bottleneck if every small edit requires approval.

