import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'icar.db');
const db = new Database(dbPath);

// Helper function to get the database instance
export function getDb() {
  return db;
}

export function initDb() {
  const db = getDb();

  // Organizations Table (formerly stakeholders)
  db.exec(`
    CREATE TABLE IF NOT EXISTS stakeholders (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      focus TEXT, -- JSON array
      location TEXT,
      lat REAL,
      lng REAL,
      status TEXT,
      description TEXT,
      contact TEXT,
      email TEXT,
      budget REAL, -- Funder/Admin only
      collaboration_needs TEXT -- Org/Funder/Admin only
    )
  `);

  // Opportunities Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      organization_id TEXT,
      organization_name TEXT, -- Denormalized for prototype
      type TEXT,
      location TEXT,
      lat REAL,
      lng REAL,
      date TEXT,
      status TEXT,
      description TEXT
    )
  `);

  // Resources Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT,
      author TEXT,
      url TEXT,
      description TEXT
    )
  `);

  // Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      organization_id TEXT,
      organization_name TEXT,
      description TEXT,
      status TEXT,
      focus_areas TEXT, -- JSON array
      location TEXT,
      lat REAL,
      lng REAL,
      start_date TEXT,
      end_date TEXT,
      collaboration_needs TEXT, -- Org/Funder/Admin only
      budget REAL, -- Funder/Admin only
      kpis TEXT, -- JSON, Funder/Admin only
      featured INTEGER DEFAULT 0, -- Boolean: 0 = false, 1 = true
      expiry_date TEXT -- Optional expiry date for opportunities
    )
  `);

  // Seed Data if empty
  const stmt = db.prepare('SELECT count(*) as count FROM stakeholders');
  const result = stmt.get() as { count: number };

  if (result.count === 0) {
    console.log('Seeding database...');

    const insertStakeholder = db.prepare(`
      INSERT INTO stakeholders (id, name, type, focus, location, lat, lng, status, description, contact, email, budget, collaboration_needs)
      VALUES (@id, @name, @type, @focus, @location, @lat, @lng, @status, @description, @contact, @email, @budget, @collaboration_needs)
    `);

    const insertOpportunity = db.prepare(`
      INSERT INTO opportunities (id, title, organization_id, organization_name, type, location, lat, lng, date, status, description)
      VALUES (@id, @title, @organization_id, @organization_name, @type, @location, @lat, @lng, @date, @status, @description)
    `);

    const insertResource = db.prepare(`
      INSERT INTO resources (id, title, type, author, url, description)
      VALUES (@id, @title, @type, @author, @url, @description)
    `);

    const insertProject = db.prepare(`
      INSERT INTO projects (id, title, organization_id, organization_name, description, status, focus_areas, location, lat, lng, start_date, end_date, collaboration_needs, budget, kpis)
      VALUES (@id, @title, @organization_id, @organization_name, @description, @status, @focus_areas, @location, @lat, @lng, @start_date, @end_date, @collaboration_needs, @budget, @kpis)
    `);

    // Organizations with role-specific fields
    const stakeholders = [
      {
        id: 's1', name: 'Lev Echad', type: 'NGO', focus: JSON.stringify(['Mental Health', 'Emergency Response']),
        location: 'Tel Aviv', lat: 32.0853, lng: 34.7818, status: 'Active',
        description: 'Providing mental health support during crises.', contact: 'contact@levechad.org', email: 'contact@levechad.org',
        budget: 750000, collaboration_needs: 'Seeking volunteer therapists, translators, and logistics partners'
      },
      {
        id: 's2', name: 'Food for All', type: 'Volunteer Group', focus: JSON.stringify(['Food Security']),
        location: 'Haifa', lat: 32.7940, lng: 34.9896, status: 'Active',
        description: 'Distributing food packages to elderly citizens.', contact: 'info@foodforall.il', email: 'info@foodforall.il',
        budget: 380000, collaboration_needs: 'Need warehouse space, volunteer drivers, and local farm partnerships'
      },
      {
        id: 's3', name: 'Tech Rescue', type: 'Private Sector', focus: JSON.stringify(['Logistics', 'Technology']),
        location: 'Remote', lat: 32.0853, lng: 34.7818, status: 'Pending',
        description: 'Developing logistics software for aid distribution.', contact: 'support@techrescue.io', email: 'support@techrescue.io',
        budget: 180000, collaboration_needs: 'Looking for UX designers, backend developers, and NGO pilot partners'
      }
    ];

    const opportunities = [
      {
        id: 'o1', title: 'Emergency Drivers Needed', organization_id: 's1', organization_name: 'Lev Echad',
        type: 'Volunteering', location: 'South District', lat: 31.2518, lng: 34.7913, date: '2025-11-25', status: 'Open',
        description: 'Drivers needed to transport medical supplies to the south.'
      },
      {
        id: 'o2', title: 'Web Developer for NGO Site', organization_id: 's2', organization_name: 'Food for All',
        type: 'Pro Bono', location: 'Remote', lat: 32.0853, lng: 34.7818, date: '2025-12-01', status: 'Open',
        description: 'Looking for a React developer to update our donation portal.'
      },
      {
        id: 'o3', title: 'Winter Gear Collection', organization_id: 'org_city', organization_name: 'City Community Center',
        type: 'Donation', location: 'Jerusalem', lat: 31.7683, lng: 35.2137, date: '2025-11-30', status: 'Closed',
        description: 'Collecting coats and blankets for winter.'
      }
    ];

    const resources = [
      { id: 'r1', title: 'Mental Health First Aid Kit', type: 'Guide', author: 'Ministry of Health', url: '#', description: 'Comprehensive guide.' },
      { id: 'r2', title: 'Volunteer Management Best Practices', type: 'Document', author: 'ICAR Core Team', url: '#', description: 'Standard operating procedures.' },
      { id: 'r3', title: 'Funding Opportunities Database', type: 'Database', author: 'Philanthropy IL', url: '#', description: 'List of active grants.' }
    ];

    // Projects from mock data
    const projects = [
      {
        id: 'p1', title: 'Mental Health Support for Displaced Families', organization_id: 's1', organization_name: 'Lev Echad',
        description: 'Providing trauma-informed mental health services to families displaced by conflict in the South District.',
        status: 'Active', focus_areas: JSON.stringify(['Mental Health', 'Emergency Response', 'Family Support']),
        location: 'South District', lat: 31.2518, lng: 34.7913, start_date: '2024-10-01', end_date: '2025-03-31',
        collaboration_needs: 'Looking for volunteer therapists, translators (Arabic/Hebrew), and logistics support for mobile clinics.',
        budget: 450000, kpis: JSON.stringify({ beneficiaries: 850, sessions: 3200, satisfaction: '92%' })
      },
      {
        id: 'p2', title: 'Food Security Initiative - Northern Communities', organization_id: 's2', organization_name: 'Food for All',
        description: 'Establishing community food hubs and distribution networks for vulnerable populations in Haifa and surrounding areas.',
        status: 'Active', focus_areas: JSON.stringify(['Food Security', 'Community Development']),
        location: 'Haifa', lat: 32.7940, lng: 34.9896, start_date: '2024-06-15', end_date: '2025-12-31',
        collaboration_needs: 'Seeking partnerships with local farms, warehouse space, and volunteer drivers for weekly distributions.',
        budget: 280000, kpis: JSON.stringify({ familiesServed: 620, mealsDistributed: 18500, volunteers: 45 })
      },
      {
        id: 'p3', title: 'Emergency Logistics Platform Development', organization_id: 's3', organization_name: 'Tech Rescue',
        description: 'Building an open-source platform to coordinate aid distribution, volunteer deployment, and resource tracking during emergencies.',
        status: 'Planning', focus_areas: JSON.stringify(['Technology', 'Logistics', 'Emergency Response']),
        location: 'Remote', lat: 32.0853, lng: 34.7818, start_date: '2025-01-15', end_date: '2025-06-30',
        collaboration_needs: 'Need UX designers, backend developers (Node.js), and NGO partners for pilot testing.',
        budget: 180000, kpis: JSON.stringify({ platformUsers: 0, ngoPartners: 3, developmentProgress: '35%' })
      }
    ];

    stakeholders.forEach(s => insertStakeholder.run(s));
    opportunities.forEach(o => insertOpportunity.run(o));
    resources.forEach(r => insertResource.run(r));
    projects.forEach(p => insertProject.run(p));

    console.log('Database seeded successfully.');
  }
}

// Initialize on first import (in dev this might run multiple times but CREATE IF NOT EXISTS handles it)
try {
  initDb();
} catch (error) {
  console.error("Database initialization failed:", error);
}

export default db;
