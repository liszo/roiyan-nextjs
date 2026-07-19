-- CORRECTED postmeta for Tools CPT (IDs 150-164, all 15 real tools)
-- Field names match EXACTLY what app/lib/wordpress.ts expects at the ROOT
-- of the WordPress REST API response (via register_rest_field).
--
-- IMPORTANT: Run this ONLY AFTER adding wordpress-custom-fields-fix.php
-- code to functions.php (so the fields are registered and exposed via REST).
--
-- NOTE: ID 180 "Professional Sport Supplement AI Advisor" is NOT included here.
-- It appears to be a junk/test post (garbled placeholder content like
-- "fgadfbdfbnsfgng"). Recommend moving it to Trash in WordPress admin.

-- ===== Tool 150: Team Task Automator =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(150, 'tool_tagline', 'Automate task assignments and updates — boost team efficiency.'),
(150, 'tool_type', 'automation'),
(150, 'technology_stack', 'Trello, Asana, ClickUp, Slack'),
(150, 'demo_available', '1'),
(150, 'demo_link', ''),
(150, 'support_included', 'Email & chat support included, onboarding call available'),
(150, 'tool_features', 'fas fa-tasks|Auto Task Creation|Automatically creates tasks from leads, tickets, or milestones\r\nfas fa-users|Smart Assignment|Assigns tasks to the right team member automatically\r\nfas fa-bell|Daily Summaries|Sends daily progress summaries to keep everyone aligned\r\nfas fa-plug|Platform Integration|Connects directly to Trello, Asana, and ClickUp'),
(150, 'pricing_model', 'monthly'),
(150, 'base_price', '49'),
(150, 'setup_fee', '0'),
(150, 'monthly_fee', '49'),
(150, 'setup_time', '2-3 days');

-- ===== Tool 151: Customer Churn Predictor =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(151, 'tool_tagline', 'Predict cancellations before they happen — and prevent them.'),
(151, 'tool_type', 'ai'),
(151, 'technology_stack', 'Stripe, Recurly, Chargebee, Intercom'),
(151, 'demo_available', '1'),
(151, 'demo_link', ''),
(151, 'support_included', 'Dedicated success manager, priority support'),
(151, 'tool_features', 'fas fa-chart-line|AI Churn Prediction|Analyzes billing, usage, and support patterns to flag at-risk customers\r\nfas fa-bell|Proactive Alerts|Sends alerts before a customer is likely to cancel\r\nfas fa-heart|Retention Campaigns|Trigger targeted offers and outreach automatically\r\nfas fa-chart-bar|Health Scores|Track customer health scores over time'),
(151, 'pricing_model', 'monthly'),
(151, 'base_price', '99'),
(151, 'setup_fee', '0'),
(151, 'monthly_fee', '99'),
(151, 'setup_time', '3-5 days');

-- ===== Tool 152: Sales KPI Dashboard =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(152, 'tool_tagline', 'Your sales health in one beautiful dashboard.'),
(152, 'tool_type', 'dashboard'),
(152, 'technology_stack', 'Salesforce, HubSpot, Pipedrive, Google Analytics'),
(152, 'demo_available', '1'),
(152, 'demo_link', ''),
(152, 'support_included', 'Live chat support, dashboard setup assistance'),
(152, 'tool_features', 'fas fa-chart-pie|Real-Time KPIs|Track leads, conversion rates, and revenue live\r\nfas fa-funnel-dollar|Pipeline Visibility|See pipeline status and forecasting at a glance\r\nfas fa-bullseye|CAC Tracking|Monitor customer acquisition cost automatically\r\nfas fa-plug|Multi-Source Data|Pulls from your CRM, Analytics, and ad platforms'),
(152, 'pricing_model', 'monthly'),
(152, 'base_price', '59'),
(152, 'setup_fee', '0'),
(152, 'monthly_fee', '59'),
(152, 'setup_time', '2-3 days');

-- ===== Tool 153: Affiliate Program Manager =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(153, 'tool_tagline', 'Grow your reach with a sales force you only pay for when they deliver.'),
(153, 'tool_type', 'automation'),
(153, 'technology_stack', 'Shopify, WooCommerce, Stripe, PayPal'),
(153, 'demo_available', '1'),
(153, 'demo_link', ''),
(153, 'support_included', 'Setup assistance and ongoing email support'),
(153, 'tool_features', 'fas fa-user-plus|Affiliate Recruitment|Recruit and manage affiliates from one dashboard\r\nfas fa-link|Referral Tracking|Issue unique referral links and track every sale\r\nfas fa-money-bill|Automatic Payouts|Pay commissions automatically on schedule\r\nfas fa-chart-line|Affiliate Portal|Give partners access to stats and marketing assets'),
(153, 'pricing_model', 'freemium'),
(153, 'base_price', '79'),
(153, 'setup_fee', '0'),
(153, 'monthly_fee', '79'),
(153, 'setup_time', '1 week');

-- ===== Tool 154: Social Proof Widget =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(154, 'tool_tagline', 'Boost conversions with real-time sales & activity notifications.'),
(154, 'tool_type', 'widget'),
(154, 'technology_stack', 'Shopify, WooCommerce, Stripe, Zapier'),
(154, 'demo_available', '1'),
(154, 'demo_link', ''),
(154, 'support_included', 'Email support, custom styling assistance'),
(154, 'tool_features', 'fas fa-bolt|Live Activity Popups|Show real-time purchases, signups, and engagement\r\nfas fa-eye|Live Viewer Counts|Display how many people are viewing a page right now\r\nfas fa-fire|Trending Products|Highlight trending items and recent testimonials\r\nfas fa-palette|Fully Customizable|Match your site''s brand and style'),
(154, 'pricing_model', 'freemium'),
(154, 'base_price', '19'),
(154, 'setup_fee', '0'),
(154, 'monthly_fee', '19'),
(154, 'setup_time', '1 day');

-- ===== Tool 155: Automated Contract Signer =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(155, 'tool_tagline', 'Seal deals faster with e-signatures that work anywhere.'),
(155, 'tool_type', 'automation'),
(155, 'technology_stack', 'DocuSign, HelloSign, Google Drive, Dropbox'),
(155, 'demo_available', '1'),
(155, 'demo_link', ''),
(155, 'support_included', 'Email support, template setup assistance'),
(155, 'tool_features', 'fas fa-file-signature|Custom Agreements|Create contracts automatically from templates\r\nfas fa-paper-plane|Secure Sending|Send contracts securely for signature\r\nfas fa-signature|E-Signatures|Collect legally binding signatures via DocuSign or HelloSign\r\nfas fa-cloud|Auto Cloud Storage|Signed contracts are stored in your cloud automatically'),
(155, 'pricing_model', 'monthly'),
(155, 'base_price', '39'),
(155, 'setup_fee', '0'),
(155, 'monthly_fee', '39'),
(155, 'setup_time', '1-2 days');

-- ===== Tool 156: Webinar Funnel Automation =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(156, 'tool_tagline', 'Your webinars, fully automated from sign-up to sale.'),
(156, 'tool_type', 'automation'),
(156, 'technology_stack', 'Zoom, Google Meet, Email, CRM'),
(156, 'demo_available', '1'),
(156, 'demo_link', ''),
(156, 'support_included', 'Setup support for your first webinar funnel'),
(156, 'tool_features', 'fas fa-video|Registration & Reminders|Automate signups and reminder emails\r\nfas fa-comments|Live Engagement|Boost engagement during the live session\r\nfas fa-play-circle|Replay Delivery|Automatically deliver replays to registrants\r\nfas fa-shopping-cart|Post-Event Sales|Trigger sales campaigns after the webinar ends'),
(156, 'pricing_model', 'monthly'),
(156, 'base_price', '69'),
(156, 'setup_fee', '0'),
(156, 'monthly_fee', '69'),
(156, 'setup_time', '3-5 days');

-- ===== Tool 157: AI Content Calendar =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(157, 'tool_tagline', 'Plan, write, and schedule a month of content in hours, not weeks.'),
(157, 'tool_type', 'ai'),
(157, 'technology_stack', 'Instagram, Facebook, LinkedIn, Buffer'),
(157, 'demo_available', '1'),
(157, 'demo_link', ''),
(157, 'support_included', 'Onboarding session plus email support'),
(157, 'tool_features', 'fas fa-calendar-alt|AI Content Planning|Plans a full month of posts automatically\r\nfas fa-pen|AI Captions|Writes captions and suggests hashtags\r\nfas fa-image|Image Ideas|Provides image ideas for every post\r\nfas fa-clock|Auto Scheduling|Schedules everything straight to your social platforms'),
(157, 'pricing_model', 'monthly'),
(157, 'base_price', '45'),
(157, 'setup_fee', '0'),
(157, 'monthly_fee', '45'),
(157, 'setup_time', '1-2 days');

-- ===== Tool 158: Instant Proposal Generator =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(158, 'tool_tagline', 'Send professional, branded proposals within minutes — not days.'),
(158, 'tool_type', 'template'),
(158, 'technology_stack', 'CRM, DocuSign, PDF, Stripe'),
(158, 'demo_available', '1'),
(158, 'demo_link', ''),
(158, 'support_included', 'Template customization support included'),
(158, 'tool_features', 'fas fa-file-alt|Custom Templates|Pre-designed, customizable proposal templates\r\nfas fa-magic|CRM Auto-Fill|Auto-fills client details from your CRM\r\nfas fa-file-pdf|Instant PDFs|Produces ready-to-send PDF proposals\r\nfas fa-signature|E-Signature Ready|Includes pricing tables and e-signature links'),
(158, 'pricing_model', 'one_time'),
(158, 'base_price', '199'),
(158, 'setup_fee', '0'),
(158, 'monthly_fee', ''),
(158, 'setup_time', '1 day');

-- ===== Tool 159: Smart Review Booster =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(159, 'tool_tagline', 'Turn satisfied customers into an army of five-star reviews.'),
(159, 'tool_type', 'automation'),
(159, 'technology_stack', 'CRM, Email, SMS, Google Reviews'),
(159, 'demo_available', '1'),
(159, 'demo_link', ''),
(159, 'support_included', 'Email support and campaign setup assistance'),
(159, 'tool_features', 'fas fa-star|Smart Timing|Requests feedback at exactly the right moment\r\nfas fa-filter|Negative Filter|Filters out unhappy customers before they post publicly\r\nfas fa-share|Auto-Publish|Publishes positive reviews to your website and social media\r\nfas fa-plug|CRM Integration|Triggers requests after purchases or service completions'),
(159, 'pricing_model', 'monthly'),
(159, 'base_price', '39'),
(159, 'setup_fee', '0'),
(159, 'monthly_fee', '39'),
(159, 'setup_time', '2-3 days');

-- ===== Tool 160: Multi-Channel Inventory Sync Pro =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(160, 'tool_tagline', 'Keep stock levels synced on every sales channel — automatically.'),
(160, 'tool_type', 'integration'),
(160, 'technology_stack', 'Shopify, Amazon, eBay, POS Systems'),
(160, 'demo_available', '1'),
(160, 'demo_link', ''),
(160, 'support_included', 'Priority support during multi-channel setup'),
(160, 'tool_features', 'fas fa-sync|Real-Time Sync|Updates inventory instantly across all channels\r\nfas fa-store|Multi-Channel|Works across e-commerce, Amazon, eBay, and POS\r\nfas fa-exclamation-triangle|Overselling Prevention|Never sell what you can''t deliver\r\nfas fa-boxes|Unified Stock View|One accurate view of stock everywhere'),
(160, 'pricing_model', 'monthly'),
(160, 'base_price', '89'),
(160, 'setup_fee', '0'),
(160, 'monthly_fee', '89'),
(160, 'setup_time', '1 week');

-- ===== Tool 161: ROI Calculator Suite =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(161, 'tool_tagline', 'Prove your value instantly with tailored ROI calculators.'),
(161, 'tool_type', 'widget'),
(161, 'technology_stack', 'JavaScript, HTML5, Google Analytics'),
(161, 'demo_available', '1'),
(161, 'demo_link', ''),
(161, 'support_included', 'Embed support and calculator customization included'),
(161, 'tool_features', 'fas fa-calculator|Custom Calculators|Automation savings, marketing ROI, and cost reduction calculators\r\nfas fa-code|Easy Embed|Embeddable directly on your website\r\nfas fa-chart-line|Instant Trust|Give visitors a tangible value projection\r\nfas fa-hourglass-half|Shorter Sales Cycles|Helps prospects decide faster'),
(161, 'pricing_model', 'one_time'),
(161, 'base_price', '149'),
(161, 'setup_fee', '0'),
(161, 'monthly_fee', ''),
(161, 'setup_time', '2-3 days');

-- ===== Tool 162: Client Onboarding Accelerator =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(162, 'tool_tagline', 'Give every new client a five-star welcome without lifting a finger.'),
(162, 'tool_type', 'automation'),
(162, 'technology_stack', 'Email, Forms, Calendly, Client Portal'),
(162, 'demo_available', '1'),
(162, 'demo_link', ''),
(162, 'support_included', 'Full onboarding sequence setup included'),
(162, 'tool_features', 'fas fa-envelope-open|Welcome Automation|Automates welcome emails for every new client\r\nfas fa-file-upload|Document Collection|Collects documents via branded forms\r\nfas fa-calendar-check|Kickoff Scheduling|Schedules kickoff calls automatically\r\nfas fa-user-shield|Client Portals|Secure portals for tracking project progress'),
(162, 'pricing_model', 'monthly'),
(162, 'base_price', '49'),
(162, 'setup_fee', '0'),
(162, 'monthly_fee', '49'),
(162, 'setup_time', '3-5 days');

-- ===== Tool 163: E-commerce Recovery Bot =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(163, 'tool_tagline', 'Plug in our bot and win back customers before they disappear.'),
(163, 'tool_type', 'automation'),
(163, 'technology_stack', 'Shopify, WooCommerce, Email, SMS, WhatsApp'),
(163, 'demo_available', '1'),
(163, 'demo_link', ''),
(163, 'support_included', 'Setup assistance and campaign optimization support'),
(163, 'tool_features', 'fas fa-shopping-cart|Real-Time Detection|Detects cart abandonment as it happens\r\nfas fa-comment-dollar|Multi-Channel Messages|Sends recovery messages via email, SMS, or WhatsApp\r\nfas fa-percent|Smart Offers|Offers discounts or reminders to bring customers back\r\nfas fa-user-check|Personalization|Messages personalized based on cart content and behavior'),
(163, 'pricing_model', 'monthly'),
(163, 'base_price', '59'),
(163, 'setup_fee', '0'),
(163, 'monthly_fee', '59'),
(163, 'setup_time', '3-5 days');

-- ===== Tool 164: Lead Magnet Automation Engine =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(164, 'tool_tagline', 'Capture, nurture, and convert leads automatically — while you focus on your business.'),
(164, 'tool_type', 'automation'),
(164, 'technology_stack', 'CRM, Email, Landing Pages, Forms'),
(164, 'demo_available', '1'),
(164, 'demo_link', ''),
(164, 'support_included', 'Full funnel setup and CRM integration included'),
(164, 'tool_features', 'fas fa-magnet|Lead Capture|Connects forms, landing pages, and content offers\r\nfas fa-envelope|Nurture Sequences|Delivers lead magnets and scheduled emails automatically\r\nfas fa-star-half-alt|Lead Scoring|Scores prospects based on interactions\r\nfas fa-share-square|CRM Handoff|Passes only sales-qualified leads to your CRM'),
(164, 'pricing_model', 'monthly'),
(164, 'base_price', '69'),
(164, 'setup_fee', '0'),
(164, 'monthly_fee', '69'),
(164, 'setup_time', '3-5 days');
