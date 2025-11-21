# Projects Discussion from Transcription - Key Points

## 🎯 **Main Decisions About Projects**

### 1. **Hierarchy: Projects are UNDER Organizations** ✅
**From transcript:**
> "originally our understanding was that in the hierarchy of information, organizations and projects were of equal value, then, as we were talking more and more, we realized organizations as what we were calling data integrity, which means you can control the data, you know what's there, you know it's fully updated, but you didn't have that on the projects. And so projects sort of became an underling of organizations at that point. Is that still true? I would say. Does that have a Yes, I would say, yes, like it hasn't changed."

**Decision:** Projects are subordinate to organizations (not equal hierarchy)

### 2. **Display Strategy: Projects Show on Org Profile** ✅
**From transcript:**
> "They're sort of going to sit if an organization has a project that sits inside their profile, that sits inside their view kind of thing. Is that is that good? We're good? Yes, and then it opens into its own independent, like, larger profile"

**Decision:** 
- Projects appear on organization profile pages
- But each project has its own independent detail page
- Projects are linked to organizations, not standalone

### 3. **Search/Filter Strategy: Filter-First for Projects** ✅
**From transcript:**
> "Yeah, so that's what Shie and I sort of came up with, is that there is no, when you come to organizations, you see everything and then you filter down. But with projects, you see a filter and it will output based on what you're asking it. You're not gonna see, because then if there's only two... Yeah, it's much better. It's much better that way. Don't show what you don't have. Exactly."

**Decision:**
- **Organizations:** Show all, then filter down
- **Projects:** Show filter FIRST, then show results (don't show empty list)
- This is because there are fewer projects (50 vs 400 orgs)

### 4. **Future Flexibility** ✅
**From transcript:**
> "So, if you ever get to a point where the projects becomes something that is your controlling them, there's so many projects and you know that there's gonna be enough information to not look. Schas on the site. Then we can always pull it out and we can give it more hierarchy"

**Decision:** 
- Start with projects as subordinate
- Can elevate them later if they grow in importance/quantity
- Flexible architecture

### 5. **Project Ownership & Partnerships** ✅
**From transcript:**
> "Because you could have more than one organization on a project, now? Or we said, no, one No, no, no. Yes, in the relationships, but in terms of the one is going to own it. One wants to be the primary. Just like what? If you don't own it but you're a part of it, there's a show on your profile page? Yes.. partnership. Yeah."

**Decision:**
- One organization OWNS the project (primary)
- Other organizations can be PARTNERS
- Partnerships show on both org profiles

### 6. **Project Funding Visibility** ✅
**From transcript:**
> "And are we showing how much a project is funded? I We're definitely showing in, like, um, like I said, Guillew the funding, like, for the industry. I don't know if we're going to stay funding for project, because I think that would be very independent if a project themselves or an organization wants to show that. But we can play like more like the annual budget of all the organizations in this industry was this"

**Decision:**
- Individual project funding: Optional (org can choose to show)
- Aggregate funding: Show industry/aggregate budgets
- Funders can see project budgets (role-based access)

### 7. **Project Tags/Needs** ✅
**From transcript:**
> "Are you work. It'll be like. It's a little bit embarrassing. Yeah, no, won't. Okay, are the three of you what we would call the project sponsors? Are the three of you, the people who have the authority to sign off on things to, for us to be working in collaboration with you guys to say, okay, this is a view, go look at it, see if we're missing anything. Like, are you guys it? Are there other people? What does this look like for us? Yes, probably. a good question. I mean, there are definitely things that I would run by other people, like internally, just to. That's fine. Okay. For every large project that we do, it's better not to have too many cooks in this kitchen. So if we keep this group out, let's at least be the final person who says this has been approved by. I'll make sure that whether she will look at any, whether I had El looked at it, whether, you know, and you Johnny to look at whatever it is, I'll take care of them. I'll that responsibility."

**Also:**
> "looking for funding, looking for partners, looking for, you know, something, something like that. And then I think I got a little tied to their project so that it would be like front and center."

**Decision:**
- Projects can have tags: "Looking for funding", "Looking for partners", etc.
- These tags make projects discoverable
- Funders can search: "Show me projects that need funding"

### 8. **Database Structure Question** ⚠️
**From transcript:**
> "So I want to I want to say on that note, Iar didn't get like that far back. I' buy in the. So it's like, we could have been, like, signed up on our website. So it's another issue, because we didn't have a number. Like, there are many NGOs that are working under someone else. And then how we treat that type of situation. But for the purposes of the website, I don't understand why that matters, okay? So you're saying, okay, there's a couple of things that you're saying from what I understand. One, it's difficult to disconnect projects and stake culters, right? That was number one. Two, not all stakeholders are equal or registered because some are parents and child. Right? Like, I understand, Khal owns autta, and then Asa at the hospital, Mali DC or something like that, right? But there' each one is its own. Right, so I'm wondering, you can have relationships. I don't mind relationships in organizations. There's parents are shot fine, no problem. I do think they would be list equally, but I think you could have some sort of a relationship on it. But I don't know why it matters. Number one, if they're registered, they can still have a profile. I don't know why it matters. And number two, I still don't think we can split easily projects from stakeholders. a projects would have projects would be those who don't have an ind number, and activities, is a project and stakeholders would be those who do have. Okay, that's easy. The thing is should I divided in two different tables. Or it will be only one column that says, you know, do they have any addict number? Okay, so I don't know about the index number thing, but I do think it should be two tables for organizations and projects with the relationship between them. Okay."

**Decision:**
- **Two separate tables:** Organizations and Projects
- **Relationship:** Projects belong to organizations (one primary owner, multiple partners)
- Index number doesn't matter for website purposes
- Parent/child relationships can exist within organizations (separate from projects)

## 📋 **Summary: What Was Decided**

1. ✅ **Projects are subordinate to Organizations** (not equal)
2. ✅ **Projects appear on org profiles** but have own detail pages
3. ✅ **Projects use filter-first search** (don't show empty lists)
4. ✅ **One org owns, multiple can partner**
5. ✅ **Project funding is optional** (org chooses to show)
6. ✅ **Tags for needs:** "Looking for funding", "Looking for partners"
7. ✅ **Two separate database tables** (organizations and projects)
8. ✅ **Can elevate projects later** if they grow in importance

## 🎯 **Key Insight**

**The transcript confirms:**
- Projects are NOT equal to organizations
- Projects are a **subset/feature of organizations**
- But projects have their own search/discovery mechanism
- Projects can have partnerships (multiple orgs)
- The relationship is: **Organizations → Projects** (not Organizations = Projects)

**This aligns with your current implementation!** ✅

