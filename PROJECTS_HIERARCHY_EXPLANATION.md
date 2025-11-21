# Projects Hierarchy: Where Do They Sit?

## 📋 **Based on the Transcription**

### **The Decision:**
> "projects sort of became an underling of organizations at that point. Is that still true? I would say. Does that have a Yes, I would say, yes, like it hasn't changed."

**Projects are SUBORDINATE to Organizations** (not equal)

### **But Also:**
> "and then it opens into its own independent, like, larger profile"
> "But with projects, you see a filter and it will output based on what you're asking it"

**Projects have their own discovery/search mechanism**

---

## 🎯 **Current Implementation**

### **Data Model:**
```
Organizations (top level)
  └─ Projects (belong to organizations)
      └─ Each project has organization_id
```

### **Navigation:**
```
Navbar:
- Organizations (top level)
- Projects (top level) ← Currently here
```

### **Display:**
- ✅ Projects show on organization profile pages
- ✅ Projects have their own detail pages
- ✅ Projects have their own search/discovery page

---

## 🤔 **The Question: Should Projects Be Under Organizations in Nav?**

### **Option A: Projects Under Organizations (Nested)**
```
Navbar:
- Organizations
  └─ Projects (submenu)
```

**Pros:**
- ✅ Matches data hierarchy (projects belong to orgs)
- ✅ Clear relationship

**Cons:**
- ❌ Harder to discover projects
- ❌ Users might not find the search page
- ❌ Navigation becomes more complex

### **Option B: Projects at Same Level (Current)**
```
Navbar:
- Organizations
- Projects (separate, but related)
```

**Pros:**
- ✅ Easy to discover projects
- ✅ Matches the transcript: "you see a filter and it will output"
- ✅ Users can search projects independently
- ✅ Simple navigation

**Cons:**
- ⚠️ Doesn't visually show hierarchy (but data model does)

---

## 💡 **My Interpretation of the Transcript**

The transcript says:
1. **Data hierarchy:** Projects are under organizations ✅
2. **Display:** Projects show on org profiles ✅
3. **Discovery:** Projects have their own search/filter page ✅

**Key quote:**
> "But with projects, you see a filter and it will output based on what you're asking it"

This suggests projects need their **own entry point** for discovery, even though they belong to organizations.

---

## ✅ **Recommendation: Keep Current (Projects at Top Level)**

**Why:**
1. **Discovery needs:** Users need to find projects independently
2. **Filter-first approach:** The transcript emphasizes the filter/search page
3. **Data relationship is clear:** Projects show on org profiles, have `organization_id`
4. **User goals differ:**
   - "I want to find an organization" → Organizations
   - "I want to find a project" → Projects
   - "I want to see what an org does" → Org profile → See their projects

**The hierarchy is in the DATA, not necessarily the NAVIGATION.**

---

## 🎯 **What Makes Sense**

**Current structure is correct:**
- Projects have their own nav item (for discovery)
- Projects show on org profiles (shows relationship)
- Projects link back to their org (shows ownership)
- Data model: Projects belong to organizations ✅

**It's like:**
- "Products" might be under "Companies" in data
- But you still have a "Products" page to browse all products
- Products show on company pages
- Products link back to their company

**Same concept here!**

---

## 📊 **Visual Representation**

```
Navigation (for discovery):
├─ Organizations (browse all orgs)
├─ Projects (browse all projects) ← Top level for discovery
└─ Map

Data Model (hierarchy):
Organizations
  └─ Projects (organization_id links them)

Display:
Org Profile Page
  └─ Shows: "Projects (3)" section
      └─ Each project links to /projects/[id]

Project Detail Page
  └─ Shows: "Project Owner: [Org Name]"
      └─ Links back to /organizations/[id]
```

---

## ✅ **Bottom Line**

**Keep Projects at top level in navigation** because:
1. Users need to discover projects independently
2. Transcript emphasizes filter-first search for projects
3. The relationship is clear in the data and on pages
4. Navigation should match user goals, not just data hierarchy

**The hierarchy is shown through:**
- Projects appearing on org profiles
- Projects linking to their owner org
- Data model (organization_id)

**Not through navigation nesting.**

