'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { useLocale } from '@/components/LocaleProvider';
import { 
  FiMenu,
  FiX,
  FiChevronDown,
  FiArrowRight,
  FiMessageCircle,
  FiCode,
  FiShoppingCart,
  FiCpu,
  FiZap,
  FiPenTool,
  FiCalendar,
  FiSearch,
  FiShield,
  FiHome,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiSend,
  FiTool,
  FiTarget,
  FiLayers,
  FiPackage
} from 'react-icons/fi';

const Header = () => {
  const { t, tRaw, locale } = useTranslations();
  const { isRTL } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [caseCategories, setCaseCategories] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const pathname = usePathname();

  // Fix hydration by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handling with proper progress calculation
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setIsScrolled(scrollTop > 10);
      setScrollProgress(scrollPercent);
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Fetch case categories
  useEffect(() => {
    const fetchCaseCategories = async () => {
      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/cases?per_page=50&_embed`);
        
        if (!response.ok) {
          response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/cases?per_page=50&_embed`);
        }
        
        if (!response.ok) {
          response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/cases?per_page=50&_embed`);
        }

        if (response.ok) {
          const casesData = await response.json();
          const allCategories: string[] = [];
          casesData.forEach((case_item: any) => {
            if (case_item.acf?.case_categories) {
              if (Array.isArray(case_item.acf.case_categories)) {
                allCategories.push(...case_item.acf.case_categories);
              } else {
                allCategories.push(case_item.acf.case_categories);
              }
            }
            if (case_item.acf?.industry) {
              allCategories.push(case_item.acf.industry);
            }
          });
          
          const uniqueCategories = [...new Set(allCategories.filter(Boolean))];
          setCaseCategories(uniqueCategories.length > 0 ? uniqueCategories.slice(0, 6) : (tRaw<string[]>('header.fallbackCategories') || []));
        } else {
          setCaseCategories(tRaw<string[]>('header.fallbackCategories') || []);
        }
      } catch (error) {
        setCaseCategories(tRaw<string[]>('header.fallbackCategories') || []);
      }
    };

    fetchCaseCategories();
  }, [locale]);

// Fetch tools for dropdown
useEffect(() => {
 const fetchToolsAndSolutions = async () => {
 try {
 // Fetch tools directly
 const toolsResponse = await fetch('https://api.roiyan.com/wp-json/wp/v2/tools?per_page=6');
 if (toolsResponse.ok) {
 const toolsData = await toolsResponse.json();
 setTools(toolsData);
 } else {
 console.warn('Tools API not available');
 setTools([]);
 }
 } catch (error) {
 console.warn('Error fetching tools:', error);
 setTools([]);
 }

 try {
 // Fetch solutions directly
 const solutionsResponse = await fetch('https://api.roiyan.com/wp-json/wp/v2/solutions?per_page=6');
 if (solutionsResponse.ok) {
 const solutionsData = await solutionsResponse.json();
 setSolutions(solutionsData);
 } else {
 console.warn('Solutions API not available');
 setSolutions([]);
 }
 } catch (error) {
 console.warn('Error fetching solutions:', error);
 setSolutions([]);
 }
 };

 if (mounted) {
 fetchToolsAndSolutions();
 }
}, [mounted]);

  // Services with proper titles and unique icons (translated)
  const serviceIcons = [FiCode, FiShoppingCart, FiCpu, FiZap, FiPenTool, FiCalendar, FiSearch, FiShield];
  const serviceIds = [64, 70, 47, 68, 69, 63, 73, 72];
  const megaServices = tRaw<{ title: string; slug: string; description: string }[]>('header.megaServices') || [];
  const services = megaServices.map((s, i) => ({
    id: serviceIds[i],
    title: s.title,
    slug: s.slug,
    description: s.description,
    icon: serviceIcons[i]
  }));

  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (!mounted) return text;
    
    const entities: { [key: string]: string } = {
      '&#038;': '&',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
      '&apos;': "'"
    };
    
    return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
  };

  const navigation = [
    { key: 'home', name: t('nav.home'), href: '/', icon: FiHome },
    {
      key: 'services',
      name: t('nav.services'),
      href: '/services',
      icon: FiBriefcase,
      hasDropdown: true,
      dropdownType: 'services'
    },
    {
      key: 'solutions',
      name: t('nav.solutions'),
      href: '/solutions',
      icon: FiTarget,
      hasDropdown: true,
      dropdownType: 'solutions'
    },
    {
      key: 'tools',
      name: t('nav.tools'),
      href: '/tools',
      icon: FiTool,
      hasDropdown: true,
      dropdownType: 'tools'
    },
    {
      key: 'portfolio',
      name: t('nav.portfolio'),
      href: '/cases',
      icon: FiBriefcase,
      hasDropdown: true,
      dropdownType: 'portfolio'
    },
    { key: 'about', name: t('nav.about'), href: '/about', icon: FiUser },
    { key: 'contact', name: t('nav.contact'), href: '/contact', icon: FiMail }
  ];

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="h-20"></div>;
  }

  return (
    <div>
      {/* DESKTOP VERSION - Hidden on mobile */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:block fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 pt-4">
          {/* Left Column - Logo and Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex items-center space-x-7 ${isRTL ? 'space-x-reverse' : ''} px-3 py-0 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg shadow-gray-900/10'
                : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
            }`}
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="UAE Digital Solutions"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-gray-900 leading-tight font-sans">
                    {locale === 'fa' ? t('footer.companyName') : 'UAE Digital'}
                  </h1>
                  {locale !== 'fa' && (
                    <h2 className="text-lg font-medium text-gray-900 leading-tight font-sans">Solutions</h2>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className={`flex items-center space-x-0.5 ${isRTL ? 'space-x-reverse' : ''}`}>
              {navigation.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-purple-600 bg-purple-50'
                        : item.key === 'home'
                        ? 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Desktop Dropdowns */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && item.dropdownType === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[600px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden`}
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-4">
                            {services.map((service, index) => {
                              const IconComponent = service.icon;

                              return (
                                <motion.div
                                  key={service.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                  >
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                                      <IconComponent className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-gray-900 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                                        {service.title}
                                      </h3>
                                      <p className="text-gray-500 text-xs mt-1 group-hover:text-gray-600 transition-colors">
                                        {service.description}
                                      </p>
                                    </div>
                                    <FiArrowRight className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/services"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                          >
                            {t('nav.viewAllServices')}
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Solutions Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && item.dropdownType === 'solutions' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[500px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden`}
                      >
                        <div className="p-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('header.digitalSolutions')}</h4>
                          <div className="space-y-3">
                            {solutions.length > 0 ? solutions.map((solution, index) => (
                              <motion.div
                                key={solution.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/solutions/${solution.slug}`}
                                  className="block p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <FiTarget className="w-5 h-5 text-blue-600" />
                                      </div>
                                      <div>
                                        <h3 className="text-gray-900 font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                                          {decodeHtmlEntities(solution.title?.rendered || solution.title)}
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                                          {solution.implementation_time || t('header.quickImplementation')}
                                        </p>
                                      </div>
                                    </div>
                                    <FiArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                  </div>
                                </Link>
                              </motion.div>
                            )) : (
                              <div className="text-center py-4">
                                <p className="text-gray-500 text-sm">{t('header.loadingSolutions')}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/solutions"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                          >
                            {t('nav.viewAllSolutions')}
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tools Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && item.dropdownType === 'tools' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[500px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden`}
                      >
                        <div className="p-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('header.digitalTools')}</h4>
                          <div className="space-y-3">
                            {tools.length > 0 ? tools.map((tool, index) => (
                              <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/tools/${tool.slug}`}
                                  className="block p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                        <FiTool className="w-5 h-5 text-purple-600" />
                                      </div>
                                      <div>
                                        <h3 className="text-gray-900 font-semibold text-sm group-hover:text-purple-600 transition-colors line-clamp-1">
                                          {decodeHtmlEntities(tool.title?.rendered || tool.title)}
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-0.5">
                                          {tool.tool_type || t('header.digitalTool')}
                                        </p>
                                      </div>
                                    </div>
                                    <FiArrowRight className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                  </div>
                                </Link>
                              </motion.div>
                            )) : (
                              <div className="text-center py-4">
                                <p className="text-gray-500 text-sm">{t('header.loadingTools')}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/tools"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                          >
                            {t('nav.viewAllTools')}
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.key && item.dropdownType === 'portfolio' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[500px] bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden`}
                      >
                        <div className="p-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('header.browseByCategory')}</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {caseCategories.length > 0 ? caseCategories.map((category, index) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/cases?category=${encodeURIComponent(category)}`}
                                  className="block p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-gray-900 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                                      {category}
                                    </h3>
                                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full">
                                      {t('common.view')}
                                    </span>
                                  </div>
                                  <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors">
                                    {category}
                                  </p>
                                </Link>
                              </motion.div>
                            )) : (
                              <div className="col-span-2 text-center py-4">
                                <p className="text-gray-500 text-sm">{t('header.loadingPortfolio')}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-100 p-4">
                          <Link
                            href="/cases"
                            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                          >
                            {t('nav.viewAllCases')}
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} px-6 py-3 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg shadow-gray-900/10'
                : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
            }`}
          >
            {/* Live Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-300 group relative"
            >
              <FiMessageCircle className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </motion.button>

            {/* Get In Touch Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                {t('nav.sayHello')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* MOBILE VERSION - Fixed Horizontal Scroll + Smaller Buttons */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-indigo-600/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20' 
            : 'bg-gradient-to-r from-purple-500/90 via-blue-500/90 to-indigo-500/90 backdrop-blur-sm'
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Mobile Header Bar - Constrained Width with Smaller Buttons */}
        <div className="relative z-10 w-full px-3 py-3">
          <div className="flex items-center justify-between max-w-full">
            {/* Enhanced Logo Section - Smaller */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <Link href="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                {/* Smaller Logo */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center shadow-lg">
                    <Image
                      src="/logo.png"
                      alt="UAE Digital Solutions"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-white/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>

                {/* Smaller Company Name */}
                <div className="min-w-0">
                  <h1 className="text-sm font-bold text-white leading-tight">
                    {locale === 'fa' ? t('footer.companyName') : 'UAE Digital'}
                  </h1>
                  {locale !== 'fa' && (
                    <p className="text-xs text-white/80 leading-tight -mt-0.5">
                      Solutions
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Action Buttons - Much Smaller */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex items-center space-x-1.5 ${isRTL ? 'space-x-reverse' : ''} flex-shrink-0`}
            >
              {/* Smaller CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''} px-2.5 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium text-xs shadow-lg hover:bg-white/30 transition-all duration-300`}
                >
                  <FiSend className="w-3 h-3 flex-shrink-0" />
                  <span>{t('nav.quote')}</span>
                </Link>
              </motion.div>

              {/* Much Smaller Burger Menu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300 flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative"
                    >
                      <FiX className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative"
                    >
                      {/* Smaller Animated Burger Lines */}
                      <div className="w-4 h-4 flex flex-col justify-center items-center space-y-0.5">
                        <motion.div
                          className="w-3.5 h-0.5 bg-white rounded-full"
                          animate={{ 
                            scaleX: [1, 0.8, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                        <motion.div
                          className="w-3 h-0.5 bg-white rounded-full"
                          animate={{ 
                            scaleX: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.2
                          }}
                        />
                        <motion.div
                        className="w-2.5 h-0.5 bg-white rounded-full"
                        animate={{ 
                          scaleX: [1, 0.9, 1],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.4
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Smaller Notification Dot */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Fixed Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full origin-left"
          style={{ 
            scaleX: scrollProgress / 100,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>
    </motion.div>

    {/* Mobile Full-Screen Menu - Fixed Width Issues */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: '100vh' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="lg:hidden fixed inset-0 top-[61px] bg-white z-40 overflow-y-auto"
        >
          <div className="px-4 py-6 max-w-full">
            {/* Navigation Items */}
            <nav className="space-y-1 mb-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} p-4 rounded-2xl transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-purple-50 text-purple-600 border-2 border-purple-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      pathname === item.href
                        ? 'bg-purple-100'
                        : 'bg-white'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        pathname === item.href ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {(tRaw<Record<string, string>>('header.mobileDescriptions') || {})[item.key]}
                      </p>
                    </div>
                    <FiArrowRight className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Services Quick Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('header.quickServices')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.slice(0, 4).map((service, index) => {
                  const IconComponent = service.icon;

                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl"
              >
                {t('nav.viewAllServices')}
              </Link>
            </motion.div>

            {/* Solutions & Tools Quick Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('header.solutionsTools')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/solutions"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <FiTarget className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {t('nav.solutions')}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {t('header.businessSolutions')}
                  </p>
                </Link>
                
                <Link
                  href="/tools"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <FiTool className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {t('nav.tools')}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {t('header.digitalToolsResources')}
                  </p>
                </Link>
              </div>
            </motion.div>

            {/* Contact Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('header.getInTouch')}</h3>

              <a
                href="tel:+971501234567"
                className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} p-4 bg-green-50 rounded-2xl border border-green-200`}
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{t('header.callNow')}</h4>
                  <p className="text-sm text-gray-600 truncate" dir="ltr">+971 50 123 4567</p>
                </div>
              </a>

              <a
                href="mailto:hello@uaedigital.com"
                className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} p-4 bg-blue-50 rounded-2xl border border-blue-200`}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{t('header.emailUs')}</h4>
                  <p className="text-sm text-gray-600 truncate" dir="ltr">hello@uaedigital.com</p>
                </div>
              </a>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} p-4 bg-purple-50 rounded-2xl border border-purple-200`}
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{t('header.contactForm')}</h4>
                  <p className="text-sm text-gray-600 truncate">{t('header.sendMessage')}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
 );
};

export default Header;
