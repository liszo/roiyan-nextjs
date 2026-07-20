'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiBarChart,
  FiShield,
  FiAward,
  FiBookmark,
  FiShare2,
  FiExternalLink,
  FiChevronRight,
  FiLayers,
  FiPackage,
  FiSettings,
  FiActivity,
  FiMessageCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiTag,
  FiTool
} from 'react-icons/fi';
import { getSolutionBySlug, getRelatedSolutions, getRelatedTools, cleanHtmlContent, getTargetAudienceName, getCategoryName } from '@/lib/wordpress';
import { useTranslations } from '@/hooks/useTranslations';
import { toFarsiDigits } from '@/lib/farsiNumerals';

// Parse benefits from string
const parseBenefits = (benefitsString: string | string[] | null | undefined): string[] => {
  if (!benefitsString) return [];
  
  // If it's already an array, return it
  if (Array.isArray(benefitsString)) return benefitsString;
  
  // If it's a string, split by newlines or semicolons
  if (typeof benefitsString === 'string') {
    // First try newlines
    let benefits = benefitsString.split('\n').filter(Boolean);
    
    // If only one item, try semicolons
    if (benefits.length === 1) {
      benefits = benefitsString.split(';').filter(Boolean);
    }
    
    // If still only one item, try commas
    if (benefits.length === 1) {
      benefits = benefitsString.split(',').filter(Boolean);
    }
    
    return benefits.map(b => b.trim());
  }
  
  return [];
};

// Pricing range Farsi labels
const getPricingLabel = (range: string) => {
  if (range === 'budget') return 'اقتصادی';
  if (range === 'standard') return 'استاندارد';
  if (range === 'premium') return 'ویژه';
  return 'استاندارد';
};

export default function SolutionSinglePage() {
  const { t } = useTranslations();
  const params = useParams();
  const [solution, setSolution] = useState<any>(null);
  const [relatedSolutions, setRelatedSolutions] = useState<any[]>([]);
  const [relatedTools, setRelatedTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [audienceNames, setAudienceNames] = useState<Record<number, string>>({});
  const [categoryNames, setCategoryNames] = useState<Record<number, string>>({});

  // Fetch solution data
  useEffect(() => {
    async function fetchSolution() {
      try {
        setLoading(true);
        const solutionData = await getSolutionBySlug(params.slug as string);
        
        if (solutionData) {
          console.log('Solution Data:', solutionData);
          setSolution(solutionData);
          
          // Fetch audience names
          if (solutionData.target_audience && solutionData.target_audience.length > 0) {
            const names: Record<number, string> = {};
            for (const audienceId of solutionData.target_audience) {
              const name = await getTargetAudienceName(audienceId);
              names[audienceId] = name;
            }
            setAudienceNames(names);
            
            // Fetch related tools
            const relatedToolsData = await getRelatedTools(solutionData.id, solutionData.target_audience[0]);
            setRelatedTools(relatedToolsData.slice(0, 3));
          }
          
          // Fetch category names
          if (solutionData.solution_category && solutionData.solution_category.length > 0) {
            const names: Record<number, string> = {};
            for (const categoryId of solutionData.solution_category) {
              const name = await getCategoryName(categoryId, 'solution_category');
              names[categoryId] = name;
            }
            setCategoryNames(names);
            
            // Fetch related solutions
            const relatedSols = await getRelatedSolutions(solutionData.id, solutionData.solution_category[0]);
            setRelatedSolutions(relatedSols.slice(0, 3));
          }
        }
      } catch (error) {
        console.error('Error fetching solution:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.slug) {
      fetchSolution();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-lg"
          >
            {t('common.loading')}
          </motion.p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">راهکار یافت نشد</h1>
          <p className="text-gray-400 mb-6">راهکاری که به دنبال آن هستید وجود ندارد.</p>
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl"
            >
              بازگشت به راهکارها
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const benefits = parseBenefits(solution.key_benefits);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Bento Grid */}
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <FiChevronRight className="w-4 h-4 rotate-180" />
            <Link href="/solutions" className="hover:text-white transition-colors">{t('nav.solutions')}</Link>
            <FiChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-white">{cleanHtmlContent(solution.title?.rendered || solution.title)}</span>
          </motion.nav>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center"
                  >
                    <FiTarget className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    راهکار
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {cleanHtmlContent(solution.title?.rendered || solution.title)}
                </h1>
                
                {solution.pain_point_subtitle && (
                  <p className="text-xl text-gray-300 mb-4">
                    {cleanHtmlContent(solution.pain_point_subtitle)}
                  </p>
                )}
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  {cleanHtmlContent(solution.problem_description)}
                </p>
              </div>

              {/* Main Solution Content */}
              <div className="space-y-8">
                {/* Solution Overview */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">نمای کلی راهکار</h3>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed">
                      {cleanHtmlContent(solution.solution_overview)}
                    </div>
                  </div>
                </div>

                {/* Description from content */}
                {solution.content?.rendered && (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">توضیحات</h3>
                    <div className="prose prose-lg prose-invert max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: solution.content.rendered }}
                        className="text-gray-300"
                      />
                    </div>
                  </div>
                )}

                {/* Key Benefits - Individual Cards */}
                {benefits.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">مزایای کلیدی</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all"
                        >
                          <FiCheckCircle className="w-8 h-8 text-green-400 mb-3" />
                          <p className="text-white font-medium">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Image */}
                {solution.featured_image_url && (
                  <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={solution.featured_image_url}
                      alt={solution.title?.rendered || 'تصویر راهکار'}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sidebar - Smaller Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Implementation Time */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">زمان پیاده‌سازی</h3>
                  <FiClock className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{toFarsiDigits(solution.implementation_time || '')}</div>
                <p className="text-gray-300 text-sm">از شروع تا استقرار کامل</p>
              </motion.div>

              {/* Metrics Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-4">نتایج مورد انتظار</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiClock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">زمان صرفه‌جویی شده</span>
                    </div>
                    <span className="text-blue-400 font-semibold">{toFarsiDigits(solution.time_saved || '')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiTrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">افزایش درآمد</span>
                    </div>
                    <span className="text-green-400 font-semibold">{toFarsiDigits(solution.revenue_increase || '')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiShield className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">کاهش هزینه</span>
                    </div>
                    <span className="text-purple-400 font-semibold">{toFarsiDigits(solution.cost_reduction || '')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                {/* Target Audiences - Show ALL */}
                {solution.target_audience && solution.target_audience.length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FiUsers className="w-5 h-5 text-blue-400" />
                      مناسب برای
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {solution.target_audience.map((audienceId: number, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                        >
                          {audienceNames[audienceId] || `در حال بارگذاری...`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solution Categories */}
                {solution.solution_category && solution.solution_category.length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FiTag className="w-5 h-5 text-purple-400" />
                      دسته‌بندی‌ها
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {solution.solution_category.map((categoryId: number, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
                        >
                          {categoryNames[categoryId] || `در حال بارگذاری...`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Range */}
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FiDollarSign className="w-5 h-5 text-green-400" />
                    محدوده قیمت
                  </h3>
                  <p className="text-2xl font-semibold text-green-400">
                    بسته {getPricingLabel(solution.pricing_range)}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                  >
                    <span>شروع کنید</span>
                    <FiArrowRight className="w-5 h-5 rotate-180" />
                  </motion.button>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    onClick={() => setBookmarked(!bookmarked)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <FiBookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">ذخیره</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <FiShare2 className="w-4 h-4" />
                    <span className="hidden sm:inline">اشتراک‌گذاری</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8">ابزارهای پیشنهادی</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/tools/${tool.slug}`}>
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <FiTool className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white line-clamp-1">
                            {cleanHtmlContent(tool.title?.rendered || tool.title)}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                          {cleanHtmlContent(tool.tool_tagline || tool.excerpt?.rendered || '')}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 text-sm">
                            {tool.pricing_model === 'freemium' ? 'شروع رایگان' :
                             tool.base_price ? `$${toFarsiDigits(tool.base_price)}` : 'سفارشی'}
                          </span>
                          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                            <span>مشاهده</span>
                            <FiArrowRight className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Solutions */}
          {relatedSolutions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8">راهکارهای مرتبط</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSolutions.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/solutions/${related.slug}`}>
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                            <FiZap className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white line-clamp-1">
                            {cleanHtmlContent(related.title?.rendered || related.title)}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                          {cleanHtmlContent(related.problem_description || related.excerpt?.rendered || '')}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-sm">{toFarsiDigits(related.implementation_time || '۲ تا ۴ هفته')}</span>
                          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                            <span>بیشتر بدانید</span>
                            <FiArrowRight className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900/50 via-black to-cyan-900/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              آماده پیاده‌سازی این راهکار هستید؟
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              کارشناسان ما کمک می‌کنند این راهکار را مستقر کنید و ظرف چند هفته، نه چند ماه، نتیجه ببینید.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full flex items-center gap-3 hover:shadow-lg transition-all"
                >
                  <FiMessageCircle className="w-6 h-6" />
                  <span>رزرو مشاوره</span>
                </motion.button>
              </Link>
              <Link href="/tools">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                >
                  مشاهده ابزارها
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}