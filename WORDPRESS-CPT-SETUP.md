# WordPress CPT Setup Guide: Solutions & Tools

This guide will help you recreate the missing **Solutions** and **Tools** custom post types (CPTs) on your WordPress installation at CPanal.

## Overview

- **15 Solutions** - Business problems and solutions (IDs 135-149)
- **5 Tools** - Software/automation tools (IDs 150-154)
- **Total: 20 Posts** to be restored

---

## Step 1: Add CPT Registration Code to WordPress

### What to Do:
1. Go to your **CPanal** → **File Manager**
2. Navigate to: `wp-content/themes/hello-elementor-child/`
3. Open or create the `functions.php` file
4. Copy the entire content from **`wordpress-cpt-code.php`** (provided in this repo)
5. Paste it at the END of the functions.php file
6. Save the file

### After Pasting:
1. Go to your WordPress Admin Dashboard
2. Look for a new menu section with:
   - **Solutions**
   - **Tools**
3. If you don't see them, do a hard refresh (Ctrl+F5 or Cmd+Shift+R)

---

## Step 2: Flush Rewrite Rules (IMPORTANT!)

The CPTs won't work properly until rewrite rules are flushed.

### Method 1 - Automatic Flush (Recommended):
1. In the `wordpress-cpt-code.php` code, find this section (around line 65):
   ```php
   // Uncomment below and visit your WordPress admin once, then comment it out again
   // add_action('admin_init', 'flush_cpt_rewrite_rules');
   ```
2. **Uncomment** the last line (remove the `//`)
3. Save the file
4. Visit your WordPress Admin Dashboard once
5. Rewrite rules will flush automatically
6. **Comment it back out** immediately to prevent issues
7. Save again

### Method 2 - Manual Flush:
1. Go to WordPress Admin
2. **Settings** → **Permalinks**
3. Click **Save Changes** (don't change anything, just save)
4. Rewrite rules will flush

---

## Step 3: Import the Data (Two Options)

### Option A: Import via SQL (Recommended for all data at once)

**This is now a two-part process:**

#### Part 1: Import Post Data
1. Go to CPanal → **phpMyAdmin**
2. Select your WordPress database
3. Click **Import** tab
4. Click **Choose File**
5. Select **`solutions-tools-data-FIXED.sql`** from this repo
6. Click **Import**

**Note:** The SQL file has correct IDs (135-154), so no conflicts should occur. If posts already exist, you can run a DELETE query first or skip to Part 2 to just populate missing meta fields.

#### Part 2: Import Custom Field Meta Data (IMPORTANT!)
1. Go to CPanal → **phpMyAdmin**
2. Select your WordPress database
3. Click **Import** tab
4. Click **Choose File**
5. Select **`solutions-tools-postmeta.sql`** from this repo
6. Click **Import**

**This step is CRITICAL** — it populates:
- Solutions: Problem Statement, Key Benefits, CTA Button Text
- Tools: Key Features, Integrations, Pricing Model

---

### Option B: Manual Entry via WordPress Admin

If you prefer to enter data manually:

1. Go to WordPress Admin
2. Click **Solutions** in the left menu
3. Click **Add New Solution**
4. Enter:
   - **Title**: Copy from the data below
   - **Content**: Copy the description
   - **Excerpt**: Copy the excerpt
   - **Featured Image**: Upload an image (optional)
5. Click **Publish**
6. Repeat for all 15 solutions and 5 tools

#### Solutions Data Summary:

| # | Title | Slug |
|---|-------|------|
| 1 | No Online Presence | no-online-presence |
| 2 | Manual Lead Management | manual-lead-management |
| 3 | Time-Consuming Appointment Scheduling | time-consuming-appointment-scheduling |
| 4 | Cart Abandonment | cart-abandonment |
| 5 | Inventory Management Chaos | inventory-management-chaos |
| 6 | Poor Product Reviews Management | poor-product-reviews-management |
| 7 | Project Management Overload | project-management-overload |
| 8 | Inconsistent Client Onboarding | inconsistent-client-onboarding |
| 9 | Manual Invoicing & Payment Chase | manual-invoicing-and-payment-chase |
| 10 | Portfolio Presentation | portfolio-presentation |
| 11 | Time Tracking & Billing | time-tracking-and-billing |
| 12 | Social Media Management | social-media-management |
| 13 | Customer Support Overload | customer-support-overload |
| 14 | Data Entry & Reporting | data-entry-and-reporting |
| 15 | Email Marketing Inefficiency | email-marketing-inefficiency |

#### Tools Data Summary:

| # | Title | Slug |
|---|-------|------|
| 1 | Team Task Automator | team-task-automator |
| 2 | Customer Churn Predictor | customer-churn-predictor |
| 3 | Sales KPI Dashboard | sales-kpi-dashboard |
| 4 | Affiliate Program Manager | affiliate-program-manager |
| 5 | Social Proof Widget | social-proof-widget |

---

## Step 4: Verify Next.js Frontend Can Access Data

Once the CPTs are created, verify your Next.js frontend can access them:

### Test via GraphQL or REST API:

```bash
# REST API Test (in your terminal or browser)
curl "https://your-wordpress-domain/wp-json/wp/v2/solutions"
curl "https://your-wordpress-domain/wp-json/wp/v2/tools"
```

Both should return JSON arrays with your posts.

### In Next.js:

Your existing API calls should automatically work:

```javascript
// Should now return solutions and tools
const solutions = await fetchFromAPI('/solutions');
const tools = await fetchFromAPI('/tools');
```

---

## Troubleshooting

### CPTs Don't Appear in Admin Menu
- Check that you added the code to `functions.php` correctly
- Flush rewrite rules (Settings → Permalinks → Save)
- Hard refresh your browser (Ctrl+F5)
- Check for PHP errors in CPanal error logs

### Posts Don't Show on Frontend
- Verify the CPT's `show_in_rest` is set to `true` (it is in the provided code)
- Check that Next.js API is calling the correct endpoints: `/wp/v2/solutions` and `/wp/v2/tools`
- Verify posts are **Published** (not Draft)

### SQL Import Fails
- Check that the database tables exist
- Verify the user IDs exist in `wp_users` table
- If ID conflicts occur, manually edit the SQL to use different IDs

### REST API Returns No Data
- In WordPress Admin, go to **Settings** → **Permalinks**
- Ensure it's NOT set to "Plain"
- Click **Save Changes**

### Custom Meta Fields Are Empty (Problem Statement, Benefits, Features, etc.)
- **Most Common Cause:** `solutions-tools-postmeta.sql` was not imported
- **Solution:** Import the postmeta SQL file (see Step 3, Part 2 above)
- If posts exist but fields are empty, the postmeta was not populated
- Double-check in phpMyAdmin by querying `wp_postmeta` table for posts 135-154:
  ```sql
  SELECT * FROM wp_postmeta WHERE post_id BETWEEN 135 AND 154;
  ```
  If no results, import solutions-tools-postmeta.sql

### Frontend Still Shows Incomplete Data
- Ensure both SQL files were imported (posts + postmeta)
- Verify posts are **Published** (not Draft)
- Check Next.js environment variables are pointing to correct WordPress URL
- Rebuild Next.js after database changes: `npm run build`
- Clear browser cache (Ctrl+F5)

---

## File Structure

```
├── wordpress-cpt-code.php             # PHP code to add to WordPress
├── solutions-tools-data-FIXED.sql     # SQL data for posts (15 Solutions + 5 Tools)
├── solutions-tools-postmeta.sql       # SQL data for custom meta fields (REQUIRED!)
├── WORDPRESS-CPT-SETUP.md             # This file
└── CLAUDE.md                          # Project documentation
```

**Key Files:**
- **solutions-tools-data-FIXED.sql** - Contains post titles, content, excerpts (IDs 135-154)
- **solutions-tools-postmeta.sql** - Contains custom field values (_solution_problem, _solution_benefits, _solution_cta, _tool_features, _tool_integrations, _tool_pricing)

---

## Support

If you encounter issues:

1. **Check CPanal Error Logs** - `/wp-admin/` page may show PHP errors
2. **Database Backup** - Always backup before importing SQL
3. **Check File Permissions** - `functions.php` should be readable/writable
4. **PHP Version** - Ensure PHP 7.4+ (WordPress requirement)

---

## Next Steps

After CPTs are created and data is imported:

1. ✅ Verify data appears in WordPress Admin
2. ✅ Test REST API endpoints return data
3. ✅ Update Next.js components to fetch and display Solutions/Tools
4. ✅ Deploy Next.js to Vercel
5. ✅ Test on live website

---

**Created:** 2026-07-19  
**Status:** Ready to implement
