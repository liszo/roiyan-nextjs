-- CORRECTED postmeta for Solutions CPT (IDs 135-149)
-- Field names match EXACTLY what app/lib/wordpress.ts expects at the ROOT
-- of the WordPress REST API response (via register_rest_field), NOT the
-- old _solution_problem/_solution_benefits/_solution_cta keys.
--
-- IMPORTANT: Run this ONLY AFTER adding wordpress-custom-fields-fix.php
-- code to functions.php (so the fields are registered and exposed via REST).
--
-- Optional cleanup (old wrong-named meta, safe to remove, harmless if left):
-- DELETE FROM wp_postmeta WHERE post_id BETWEEN 135 AND 154
--   AND meta_key IN ('_solution_problem','_solution_benefits','_solution_cta','_tool_features','_tool_integrations','_tool_pricing');

-- ===== Solution 135: No Online Presence =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(135, 'pain_point_name', 'No Online Presence'),
(135, 'pain_point_subtitle', 'Invisible to 97% of consumers who search online first'),
(135, 'problem_description', 'Without a professional digital presence, your business is invisible to potential customers and irrelevant compared to competitors. Every day without a strong online presence costs you between $150 and $500 in lost opportunities.'),
(135, 'solution_overview', 'We create a professional, high-performance, conversion-focused website built to build trust, attract the right visitors, and turn them into paying customers, with built-in lead forms, mobile optimization, speed enhancements, and foundational SEO.'),
(135, 'key_benefits', 'Increase online visibility and search rankings\r\nConvert website visitors into qualified leads\r\nEstablish trust and credibility with prospects\r\nCapture sales 24/7 without relying on referrals'),
(135, 'cta_button_text', 'Get My Website'),
(135, 'time_saved', '15hrs/week'),
(135, 'revenue_increase', '35%'),
(135, 'cost_reduction', '$300/month'),
(135, 'pricing_range', 'standard'),
(135, 'implementation_time', '2-3 weeks');

-- ===== Solution 136: Manual Lead Management =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(136, 'pain_point_name', 'Manual Lead Management'),
(136, 'pain_point_subtitle', 'Leads scattered across emails, sticky notes, and spreadsheets'),
(136, 'problem_description', 'Unorganized leads kill sales. Follow-ups get forgotten, hot leads turn cold, and your sales process becomes inconsistent, costing you money every day.'),
(136, 'solution_overview', 'A centralized CRM system that automatically captures leads from all your sources (website forms, email, social media), organizes them, assigns follow-ups, and tracks every interaction.'),
(136, 'key_benefits', 'Centralize all leads in one system\r\nAutomate lead capture from all channels\r\nNever forget a follow-up again\r\nIncrease conversion rates with consistent tracking'),
(136, 'cta_button_text', 'Set Up CRM'),
(136, 'time_saved', '8hrs/week'),
(136, 'revenue_increase', '20%'),
(136, 'cost_reduction', '$200/month'),
(136, 'pricing_range', 'standard'),
(136, 'implementation_time', '1-2 weeks');

-- ===== Solution 137: Time-Consuming Appointment Scheduling =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(137, 'pain_point_name', 'Time-Consuming Appointment Scheduling'),
(137, 'pain_point_subtitle', 'Endless back-and-forth messages destroy productivity'),
(137, 'problem_description', 'Prospects lose interest while you exchange scheduling messages back and forth, wasting hours every week just trying to book calls.'),
(137, 'solution_overview', 'A smart, automated scheduling system that allows clients to book meetings instantly based on your live availability, with integrated reminders that cut no-shows by up to 60%.'),
(137, 'key_benefits', 'Reduce scheduling time from hours to seconds\r\nIncrease meeting show-up rates by 60%\r\nSend automatic reminders to reduce no-shows\r\nSync with your calendar automatically'),
(137, 'cta_button_text', 'Enable Auto-Scheduling'),
(137, 'time_saved', '6hrs/week'),
(137, 'revenue_increase', '15%'),
(137, 'cost_reduction', '$150/month'),
(137, 'pricing_range', 'budget'),
(137, 'implementation_time', '3-5 days');

-- ===== Solution 138: Cart Abandonment =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(138, 'pain_point_name', 'Cart Abandonment'),
(138, 'pain_point_subtitle', '$70 out of every $100 in potential sales vanish'),
(138, 'problem_description', 'Cart abandonment is one of the biggest profit leaks in e-commerce, with the majority of potential sales disappearing before checkout completes.'),
(138, 'solution_overview', 'A multi-channel abandoned cart recovery system with automated reminders, special offers, and personalized messages via email, SMS, and WhatsApp to recover up to 35% of that lost revenue.'),
(138, 'key_benefits', 'Recover up to 35% of abandoned cart value\r\nSend automated multi-channel reminders\r\nCreate dynamic discount offers\r\nPersonalize recovery messages per customer'),
(138, 'cta_button_text', 'Recover Lost Sales'),
(138, 'time_saved', '10hrs/week'),
(138, 'revenue_increase', '35%'),
(138, 'cost_reduction', '$400/month'),
(138, 'pricing_range', 'standard'),
(138, 'implementation_time', '1 week');

-- ===== Solution 139: Inventory Management Chaos =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(139, 'pain_point_name', 'Inventory Management Chaos'),
(139, 'pain_point_subtitle', 'Overstocking ties up capital, stockouts lose sales'),
(139, 'problem_description', 'Without real-time inventory sync, you risk overselling, back orders, and unhappy customers, damaging your reputation and revenue.'),
(139, 'solution_overview', 'A smart, multi-channel inventory management system that connects your website, marketplaces, and physical stores, ensuring stock levels are always accurate.'),
(139, 'key_benefits', 'Sync inventory across website, marketplaces, and stores\r\nPrevent costly stockouts and overselling\r\nReduce excess inventory tied-up capital\r\nAutomate low-stock alerts'),
(139, 'cta_button_text', 'Sync Inventory Now'),
(139, 'time_saved', '12hrs/week'),
(139, 'revenue_increase', '18%'),
(139, 'cost_reduction', '$600/month'),
(139, 'pricing_range', 'premium'),
(139, 'implementation_time', '2-4 weeks');

-- ===== Solution 140: Poor Product Reviews Management =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(140, 'pain_point_name', 'Poor Product Reviews Management'),
(140, 'pain_point_subtitle', 'Lack of social proof slashes conversion rates by up to 50%'),
(140, 'problem_description', 'Without a consistent system for requesting reviews, your business often appears unproven to new visitors, hurting conversions.'),
(140, 'solution_overview', 'An automated review generation system that sends targeted review requests to happy customers via email and SMS, nudges them with friendly reminders, and publishes the best feedback to your website and social media.'),
(140, 'key_benefits', 'Automatically request reviews from satisfied customers\r\nSend friendly reminders to increase response rates\r\nPublish positive reviews across website and social media\r\nBuild social proof that drives conversions'),
(140, 'cta_button_text', 'Get More Reviews'),
(140, 'time_saved', '5hrs/week'),
(140, 'revenue_increase', '25%'),
(140, 'cost_reduction', '$150/month'),
(140, 'pricing_range', 'budget'),
(140, 'implementation_time', '1 week');

-- ===== Solution 141: Project Management Overload =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(141, 'pain_point_name', 'Project Management Overload'),
(141, 'pain_point_subtitle', 'Chat threads, emails, and scattered docs cause missed deadlines'),
(141, 'problem_description', 'When projects are juggled across endless chat threads, emails, and scattered docs, deadlines are missed and clients get frustrated.'),
(141, 'solution_overview', 'A fully centralized project management dashboard with task delegation, file sharing, client portals, and progress tracking, all in one easy-to-use platform.'),
(141, 'key_benefits', 'Centralize all projects in one dashboard\r\nDelegate tasks and track progress visually\r\nShare files and collaborate in real-time\r\nProvide clients with self-service portals'),
(141, 'cta_button_text', 'Organize Projects'),
(141, 'time_saved', '10hrs/week'),
(141, 'revenue_increase', '15%'),
(141, 'cost_reduction', '$250/month'),
(141, 'pricing_range', 'standard'),
(141, 'implementation_time', '1-2 weeks');

-- ===== Solution 142: Inconsistent Client Onboarding =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(142, 'pain_point_name', 'Inconsistent Client Onboarding'),
(142, 'pain_point_subtitle', 'A messy start crushes confidence before work even begins'),
(142, 'problem_description', 'A messy onboarding process with missing documents, unclear expectations, or delayed responses crushes confidence and leads to churn before you even start work.'),
(142, 'solution_overview', 'An automated onboarding system that sends a welcome email, collects key information via branded forms, schedules kickoff calls, and delivers a professional onboarding packet instantly after closing a deal.'),
(142, 'key_benefits', 'Create professional, branded onboarding experience\r\nAutomate form collection and documentation\r\nSchedule kickoff calls automatically\r\nSet proper expectations from day one'),
(142, 'cta_button_text', 'Perfect Your Onboarding'),
(142, 'time_saved', '4hrs/week'),
(142, 'revenue_increase', '10%'),
(142, 'cost_reduction', '$100/month'),
(142, 'pricing_range', 'budget'),
(142, 'implementation_time', '3-5 days');

-- ===== Solution 143: Manual Invoicing & Payment Chase =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(143, 'pain_point_name', 'Manual Invoicing & Payment Chase'),
(143, 'pain_point_subtitle', 'Stuck in debt-collector mode instead of doing billable work'),
(143, 'problem_description', 'Late payments keep you chasing clients instead of doing the work you were hired for. Manual follow-ups strain relationships and slow cash flow.'),
(143, 'solution_overview', 'Automated invoicing and payment reminders so you get paid on time without awkward conversations, with integration to Stripe, PayPal, and bank transfer systems.'),
(143, 'key_benefits', 'Automate invoicing and send them on schedule\r\nCreate automatic payment reminders\r\nIntegrate Stripe, PayPal, and bank transfers\r\nGet paid on time without awkward conversations'),
(143, 'cta_button_text', 'Automate Payments'),
(143, 'time_saved', '5hrs/week'),
(143, 'revenue_increase', '12%'),
(143, 'cost_reduction', '$150/month'),
(143, 'pricing_range', 'budget'),
(143, 'implementation_time', '3-5 days');

-- ===== Solution 144: Portfolio Presentation =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(144, 'pain_point_name', 'Portfolio Presentation'),
(144, 'pain_point_subtitle', 'An outdated portfolio causes prospects to doubt your capabilities'),
(144, 'problem_description', 'Your portfolio is often your first impression to potential clients. An outdated, cluttered, or low-quality portfolio causes prospects to doubt your capabilities.'),
(144, 'solution_overview', 'A stunning, interactive portfolio website with structured case studies, compelling visuals, video walkthroughs, testimonials, and results-focused storytelling, optimized for mobile and SEO.'),
(144, 'key_benefits', 'Build stunning interactive portfolio websites\r\nShowcase structured case studies with results\r\nInclude compelling visuals and video walkthroughs\r\nConvert portfolio visitors into qualified leads'),
(144, 'cta_button_text', 'Build Portfolio'),
(144, 'time_saved', '8hrs/week'),
(144, 'revenue_increase', '22%'),
(144, 'cost_reduction', '$200/month'),
(144, 'pricing_range', 'standard'),
(144, 'implementation_time', '2-3 weeks');

-- ===== Solution 145: Time Tracking & Billing =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(145, 'pain_point_name', 'Time Tracking & Billing'),
(145, 'pain_point_subtitle', 'Under-recorded billable hours burn profit margins'),
(145, 'problem_description', 'Tracking billable hours on paper, spreadsheets, or from memory leaves money unbilled and makes cash flow unpredictable.'),
(145, 'solution_overview', 'An automated time tracking and billing system that runs in the background while you work, categorizes tasks by project automatically, and generates invoices with one click.'),
(145, 'key_benefits', 'Track time automatically in the background\r\nCategorize tasks by project automatically\r\nGenerate detailed invoices with one click\r\nCapture 100% of billable hours'),
(145, 'cta_button_text', 'Start Time Tracking'),
(145, 'time_saved', '7hrs/week'),
(145, 'revenue_increase', '18%'),
(145, 'cost_reduction', '$180/month'),
(145, 'pricing_range', 'budget'),
(145, 'implementation_time', '3-5 days');

-- ===== Solution 146: Social Media Management =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(146, 'pain_point_name', 'Social Media Management'),
(146, 'pain_point_subtitle', 'Posting aimlessly wastes hours with no growth in leads'),
(146, 'problem_description', 'Posting content for the sake of staying active on social media is exhausting and often ineffective without a plan, producing no growth in leads or engagement.'),
(146, 'solution_overview', 'An automated, AI-assisted social media management system with a content strategy aligned to your business goals that schedules posts, engages followers, analyzes performance, and optimizes for conversion.'),
(146, 'key_benefits', 'Develop aligned social media strategy\r\nSchedule content across platforms in advance\r\nAutomate engagement and follower interactions\r\nAnalyze performance and optimize for conversions'),
(146, 'cta_button_text', 'Boost Social Strategy'),
(146, 'time_saved', '9hrs/week'),
(146, 'revenue_increase', '15%'),
(146, 'cost_reduction', '$250/month'),
(146, 'pricing_range', 'standard'),
(146, 'implementation_time', '1-2 weeks');

-- ===== Solution 147: Customer Support Overload =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(147, 'pain_point_name', 'Customer Support Overload'),
(147, 'pain_point_subtitle', 'Repetitive tickets waste time your team could spend on complex cases'),
(147, 'problem_description', 'Your support inbox is overflowing, but many tickets are the same simple requests repeated daily, wasting valuable team time.'),
(147, 'solution_overview', 'An AI-powered chatbot and automated help desk routing that resolves common queries instantly, and intelligently routes complex cases to the right team members.'),
(147, 'key_benefits', 'Deploy AI chatbots that resolve common queries instantly\r\nRoute complex cases intelligently to best team members\r\nReduce response time for customer issues\r\nFree up team capacity for high-value support work'),
(147, 'cta_button_text', 'Automate Support'),
(147, 'time_saved', '14hrs/week'),
(147, 'revenue_increase', '10%'),
(147, 'cost_reduction', '$500/month'),
(147, 'pricing_range', 'premium'),
(147, 'implementation_time', '2-3 weeks');

-- ===== Solution 148: Data Entry & Reporting =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(148, 'pain_point_name', 'Data Entry & Reporting'),
(148, 'pain_point_subtitle', 'Hours lost copying data between systems and building reports'),
(148, 'problem_description', 'Hours spent copying data between systems, manually creating reports, and entering the same information repeatedly wastes time that could be spent serving clients.'),
(148, 'solution_overview', 'Automation workflows that connect your systems, sync data instantly, and create reports automatically with zero human intervention.'),
(148, 'key_benefits', 'Connect systems and eliminate manual data entry\r\nSync data instantly between platforms\r\nGenerate reports automatically on schedule\r\nFree up team time for strategic activities'),
(148, 'cta_button_text', 'Automate Workflows'),
(148, 'time_saved', '12hrs/week'),
(148, 'revenue_increase', '8%'),
(148, 'cost_reduction', '$300/month'),
(148, 'pricing_range', 'standard'),
(148, 'implementation_time', '2 weeks');

-- ===== Solution 149: Email Marketing Inefficiency =====
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(149, 'pain_point_name', 'Email Marketing Inefficiency'),
(149, 'pain_point_subtitle', 'Low open rates, rare clicks, sales that don''t move'),
(149, 'problem_description', 'Email campaigns without segmentation, personalization, and behavior-triggered follow-ups result in low open rates, poor engagement, and minimal sales impact.'),
(149, 'solution_overview', 'Automated, segmented email marketing systems that send the right message to the right person at the right time, based on their behavior and interests.'),
(149, 'key_benefits', 'Build segmented, personalized email campaigns\r\nSend right message to right person at right time\r\nTrigger follow-ups based on customer behavior\r\nIncrease open rates and click-through rates'),
(149, 'cta_button_text', 'Boost Email Marketing'),
(149, 'time_saved', '6hrs/week'),
(149, 'revenue_increase', '28%'),
(149, 'cost_reduction', '$150/month'),
(149, 'pricing_range', 'budget'),
(149, 'implementation_time', '1 week');
