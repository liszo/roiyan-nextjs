'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
 FiMail, 
 FiPhone, 
 FiMapPin, 
 FiSend,
 FiMessageSquare,
 FiCalendar,
 FiClock,
 FiArrowRight,
 FiGlobe,
 FiZap,
 FiShield,
 FiHeart,
 FiStar,
 FiAward,
 FiUsers,
 FiTrendingUp,
 FiArrowLeft,
 FiCheckCircle,
 FiX,
 FiChevronDown,
 FiChevronUp,
 FiMessageCircle,
 FiVideo,
 FiMic,
 FiHeadphones
} from 'react-icons/fi';
import Calendar from '@/components/booking/Calendar';
import TimeSlots from '@/components/booking/TimeSlots';
import BookingForm from '@/components/booking/BookingForm';
import { useTranslations } from '@/hooks/useTranslations';
import { toFarsiDigits } from '@/lib/farsiNumerals';

export default function ContactPage() {
 const { t } = useTranslations();
 const [activeTab, setActiveTab] = useState('quote');
 const [bookingStep, setBookingStep] = useState(1);
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 const [selectedTime, setSelectedTime] = useState<string>('');
 const [isMobile, setIsMobile] = useState(false);
 const [expandedContact, setExpandedContact] = useState<number | null>(null);
 const [showSuccess, setShowSuccess] = useState(false);
 
 const [quoteForm, setQuoteForm] = useState({
 name: '',
 email: '',
 company: '',
 service: '',
 budget: '',
 message: '',
 timeline: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Detect mobile screen size
 useEffect(() => {
 const checkMobile = () => {
 setIsMobile(window.innerWidth < 768);
 };
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, []);

 const handleQuoteSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 try {
 // Send to API (which saves to WordPress)
 const response = await fetch('/api/contact', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 ...quoteForm,
 formType: 'Request Quote',
 timestamp: new Date().toISOString()
 }),
 });
 
 if (response.ok) {
 // Send email notifications using new EmailJS account
 try {
 if (typeof window !== 'undefined' && 
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID && 
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_PUBLIC_KEY) {
 
 const emailjs = (await import('@emailjs/browser')).default;
 
 // Initialize with new EmailJS account
 emailjs.init(process.env.NEXT_PUBLIC_CONTACT_EMAILJS_PUBLIC_KEY);

 // Send notification to admin (TO: admin email)
 await emailjs.send(
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID,
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_ADMIN_TEMPLATE!,
 {
 to_email: 'hello@uaedigitalteam.com', // Admin email
 customer_name: quoteForm.name,
 customer_email: quoteForm.email,
 customer_company: quoteForm.company || 'Not provided',
 customer_phone: 'Not provided', // Add phone field if needed
 service_requested: quoteForm.service,
 budget_range: quoteForm.budget || 'Not specified',
 timeline: quoteForm.timeline || 'Not specified',
 project_details: quoteForm.message,
 submission_date: new Date().toLocaleDateString(),
 submission_time: new Date().toLocaleTimeString()
 }
 );

 console.log('Admin notification sent');

 // Send confirmation to customer (TO: customer email)
 await emailjs.send(
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID,
 process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_CUSTOMER_TEMPLATE!,
 {
 to_name: quoteForm.name,
 to_email: quoteForm.email, // Customer email
 customer_name: quoteForm.name,
 service_requested: quoteForm.service,
 company_name: 'UAE Digital Team'
 }
 );

 console.log('Customer confirmation sent');
 }
 } catch (emailError) {
 console.error('Email notification failed:', emailError);
 // Don't fail the form submission if email fails
 }

 // Show success message
 setShowSuccess(true);
 
 // Reset form
 setQuoteForm({
 name: '',
 email: '',
 company: '',
 service: '',
 budget: '',
 message: '',
 timeline: ''
 });

 // Hide success message after 3 seconds
 setTimeout(() => setShowSuccess(false), 3000);
 } else {
 const data = await response.json();
 console.error('Server response:', data);
 alert('ارسال درخواست پیشنهاد قیمت با خطا مواجه شد. لطفاً دوباره تلاش کنید یا مستقیماً با ما تماس بگیرید.');
 }
 } catch (error) {
 console.error('Quote submission error:', error);
 alert('ارسال درخواست پیشنهاد قیمت با خطا مواجه شد. لطفاً دوباره تلاش کنید یا مستقیماً با ما تماس بگیرید.');
 } finally {
 setIsSubmitting(false);
 }
 };

 const resetBookingFlow = () => {
 setBookingStep(1);
 setSelectedDate(null);
 setSelectedTime('');
 };

 // Calculate tab indicator position for mobile
 const getTabIndicatorStyle = () => {
 if (activeTab === 'quote') {
 return {
 x: 4,
 width: 'calc(50% - 8px)'
 };
 } else {
 return {
 x: 'calc(50% + 4px)',
 width: 'calc(50% - 8px)'
 };
 }
 };

 const contactMethods = [
 {
 icon: FiMail,
 title: t('cta.sendEmail'),
 details: ['hello@uaedigitalteam.com', 'support@uaedigitalteam.com'],
 gradient: 'from-purple-600 to-blue-600',
 action: 'mailto:hello@uaedigitalteam.com'
 },
 {
 icon: FiPhone,
 title: t('cta.callUs'),
 details: ['+971 50 123 4567', '+971 4 123 4567'],
 gradient: 'from-blue-600 to-green-600',
 action: 'tel:+971501234567'
 },
 {
 icon: FiMapPin,
 title: t('cta.visitUs'),
 details: [`سیتی اینترنت دبی`, `ساختمان ${toFarsiDigits('123')}، دفتر ${toFarsiDigits('456')}`, 'دبی، امارات متحده عربی'],
 gradient: 'from-green-600 to-yellow-600',
 action: 'https://maps.google.com'
 }
 ];

 return (
 <div className="min-h-screen bg-black overflow-hidden">
 {/* Mobile Back Button */}
 {isMobile && (
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 className="fixed top-20 left-4 z-50"
 >
 <Link href="/">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
 >
 <FiArrowLeft className="w-5 h-5 text-white" />
 </motion.button>
 </Link>
 </motion.div>
 )}

 {/* Success Toast */}
 <AnimatePresence>
 {showSuccess && (
 <motion.div
 initial={{ opacity: 0, y: -100 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -100 }}
 className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
 >
 <FiCheckCircle className="w-5 h-5" />
 <span className="font-semibold">درخواست پیشنهاد قیمت با موفقیت ارسال شد!</span>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Mobile-First Hero Section */}
 <section className={`relative ${isMobile ? 'min-h-screen pt-20' : 'pt-32 pb-20'} overflow-hidden`}>
 {/* Enhanced Mobile Background */}
 <div className="absolute inset-0">
 {isMobile ? (
 <>
 <motion.div
 className="absolute inset-0 opacity-30"
 style={{
 background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(16, 185, 129, 0.4))',
 backgroundSize: '400% 400%'
 }}
 animate={{
 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
 }}
 transition={{
 duration: 10,
 repeat: Infinity,
 ease: 'linear'
 }}
 />
 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
 </>
 ) : (
 <>
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
 </>
 )}
 </div>

 <div className={`max-w-7xl mx-auto px-4 md:px-6 relative z-10 ${isMobile ? 'pt-8' : ''}`}>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="text-center mb-16"
 >
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className={`inline-flex items-center gap-2 ${isMobile ? 'mb-6' : 'mb-8'}`}
 >
 <FiZap className="w-5 h-5 text-purple-400" />
 <span className={`px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-purple-300 border border-purple-500/30 font-medium ${
 isMobile ? 'text-sm' : ''
 }`}>
 بیایید ارتباط برقرار کنیم و جادو بیافرینیم
 </span>
 </motion.div>

 <h1 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight ${
 isMobile ? 'text-4xl mb-6' : 'text-6xl md:text-8xl lg:text-9xl mb-8'
 }`}>
 {t('pages.contact.title')}
 </h1>

 <p className={`text-gray-300 max-w-4xl mx-auto leading-relaxed ${
 isMobile ? 'text-base px-4' : 'text-xl md:text-2xl'
 }`}>
 آماده‌اید کسب‌وکار خود را متحول کنید؟ بیایید درباره پروژه شما گفتگو کنیم و با هم چیزی
 <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold"> خارق‌العاده </span>
 بسازیم.
 </p>

 {/* Mobile: Quick Contact Cards */}
 {isMobile && (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="grid grid-cols-3 gap-3 mt-8 max-w-sm mx-auto"
 >
 <motion.a
 href="mailto:hello@uaedigitalteam.com"
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
 >
 <FiMail className="w-5 h-5 text-purple-400" />
 <span className="text-gray-300 text-xs font-medium">{t('pages.contact.email')}</span>
 </motion.a>
 <motion.a
 href="tel:+971501234567"
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
 >
 <FiPhone className="w-5 h-5 text-blue-400" />
 <span className="text-gray-300 text-xs font-medium">تماس</span>
 </motion.a>
 <motion.a
 href="https://maps.google.com"
 target="_blank"
 rel="noopener noreferrer"
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300"
 >
 <FiMapPin className="w-5 h-5 text-green-400" />
 <span className="text-gray-300 text-xs font-medium">بازدید</span>
 </motion.a>
 </motion.div>
 )}

 {/* Desktop: Floating Action Cards */}
 {!isMobile && (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="flex flex-wrap justify-center gap-4 mt-12"
 >
 <motion.div
 whileHover={{ scale: 1.05, y: -5 }}
 className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
 >
 <FiHeart className="w-5 h-5 text-red-400" />
 <span className="text-gray-300">مورد اعتماد بیش از {toFarsiDigits('50+')} مشتری</span>
 </motion.div>
 <motion.div
 whileHover={{ scale: 1.05, y: -5 }}
 className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
 >
 <FiShield className="w-5 h-5 text-green-400" />
 <span className="text-gray-300">پشتیبانی {toFarsiDigits('24/7')}</span>
 </motion.div>
 <motion.div
 whileHover={{ scale: 1.05, y: -5 }}
 className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300"
 >
 <FiGlobe className="w-5 h-5 text-blue-400" />
 <span className="text-gray-300">دسترسی جهانی</span>
 </motion.div>
 </motion.div>
 )}
 </motion.div>
 </div>
 </section>

 {/* Mobile-First Main Contact Section */}
 <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-b from-gray-900/50 to-black relative`}>
 <div className="max-w-7xl mx-auto px-4 md:px-6">
 <div className={`${isMobile ? 'space-y-8' : 'grid lg:grid-cols-5 gap-12'}`}>
 {/* Contact Info - Mobile Optimized */}
 <motion.div
 initial={{ opacity: 0, x: -50 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8 }}
 className={`space-y-6 ${isMobile ? 'order-2' : 'lg:col-span-2'}`}
 >
 <div>
 <motion.h2 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
 isMobile ? 'text-2xl text-center' : 'text-4xl lg:text-5xl'
 }`}
 >
 بیایید گفتگو را شروع کنیم
 </motion.h2>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className={`text-gray-400 mb-8 leading-relaxed ${
 isMobile ? 'text-base text-center px-4' : 'text-lg'
 }`}
 >
 ما اینجا هستیم تا به شما در دستیابی به اهداف دیجیتال کمک کنیم. از طریق هر یک از راه‌های زیر با ما در تماس باشید یا فرم را پر کنید تا شروع کنیم.
 </motion.p>
 </div>

 <div className="space-y-4">
 {contactMethods.map((item, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 whileHover={!isMobile ? { scale: 1.02, x: 10 } : {}}
 whileTap={isMobile ? { scale: 0.98 } : {}}
 className="group cursor-pointer"
 >
 {isMobile ? (
 // Mobile: Expandable Contact Cards
 <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
 <div 
 className="flex items-center gap-4 p-4"
 onClick={() => setExpandedContact(expandedContact === index ? null : index)}
 >
 <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
 <item.icon className="w-6 h-6 text-white" />
 </div>
 <div className="flex-1">
 <h3 className="text-white font-semibold text-base">{item.title}</h3>
 <p className="text-gray-400 text-sm" dir={item.icon === FiPhone ? 'ltr' : undefined}>{item.details[0]}</p>
 </div>
 <motion.div
 animate={{ rotate: expandedContact === index ? 180 : 0 }}
 transition={{ duration: 0.3 }}
 >
 <FiChevronDown className="w-5 h-5 text-gray-400" />
 </motion.div>
 </div>
 
 <AnimatePresence>
 {expandedContact === index && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="overflow-hidden border-t border-white/10"
 >
 <div className="p-4 space-y-2">
 {item.details.slice(1).map((detail, i) => (
 <p key={i} className="text-gray-400 text-sm" dir={item.icon === FiPhone ? 'ltr' : undefined}>{detail}</p>
 ))}
 <a
 href={item.action}
 target={item.action.startsWith('http') ? '_blank' : undefined}
 rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
 className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300"
 >
 <span>اکنون تماس بگیرید</span>
 <FiArrowRight className="w-3 h-3 rotate-180" />
 </a>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 ) : (
 // Desktop: Full Contact Cards
 <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
 <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
 <item.icon className="w-7 h-7 text-white" />
 </div>
 <div>
 <h3 className="text-white font-semibold mb-2 text-lg">{item.title}</h3>
 {item.details.map((detail, i) => (
 <p key={i} className="text-gray-400 leading-relaxed" dir={item.icon === FiPhone ? 'ltr' : undefined}>{detail}</p>
 ))}
 </div>
 </div>
 )}
 </motion.div>
 ))}
 </div>

 {/* Working Hours - Mobile Optimized */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className={`bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl border border-purple-500/20 ${
 isMobile ? 'p-4' : 'p-6'
 }`}
 >
 <h3 className={`text-white font-semibold mb-4 flex items-center gap-2 ${
 isMobile ? 'text-base' : 'text-lg'
 }`}>
 <FiClock className={`text-purple-400 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
 {t('cta.workingHours')}
 </h3>
 <div className={`space-y-3 text-gray-300 ${isMobile ? 'text-sm' : ''}`}>
 {[
 { day: 'دوشنبه تا جمعه', time: `${toFarsiDigits('9:00')} صبح تا ${toFarsiDigits('6:00')} عصر` },
 { day: 'شنبه', time: `${toFarsiDigits('10:00')} صبح تا ${toFarsiDigits('4:00')} عصر` },
 { day: 'یکشنبه', time: 'تعطیل' }
 ].map((schedule, i) => (
 <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
 <span className="font-medium">{schedule.day}</span>
 <span className="text-purple-300">{schedule.time}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </motion.div>

 {/* Enhanced Forms Section - Mobile Optimized */}
 <motion.div
 initial={{ opacity: 0, x: 50 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8 }}
 className={`${isMobile ? 'order-1' : 'lg:col-span-3'}`}
 >
 <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
 {/* Mobile-Optimized Tab Switcher */}
 <div className="relative mb-8">
 <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 ${
 isMobile ? 'p-1' : 'p-1.5'
 }`}>
 <div className="relative flex">
 {/* Tab Background Indicator */}
 <motion.div
 className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl"
 animate={getTabIndicatorStyle()}
 transition={{ duration: 0.3, ease: 'easeInOut' }}
 />
 
 {/* Tab Buttons */}
 <button
 onClick={() => setActiveTab('quote')}
 className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ${
 isMobile ? 'py-3 px-4 text-sm' : 'py-4 px-6'
 } ${
 activeTab === 'quote' 
 ? 'text-white' 
 : 'text-gray-400 hover:text-white'
 }`}
 >
 <FiSend className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
 <span>درخواست پیشنهاد قیمت</span>
 </button>
 
 <button
 onClick={() => {
 setActiveTab('meeting');
 resetBookingFlow();
 }}
 className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ${
 isMobile ? 'py-3 px-4 text-sm' : 'py-4 px-6'
 } ${
 activeTab === 'meeting' 
 ? 'text-white' 
 : 'text-gray-400 hover:text-white'
 }`}
 >
 <FiCalendar className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
 <span>رزرو جلسه</span>
 </button>
 </div>
 </div>
 </div>

 {/* Tab Content */}
 <AnimatePresence mode="wait">
 {activeTab === 'quote' ? (
 <motion.div
 key="quote"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.3 }}
 >
 <div className="mb-6">
 <h3 className={`font-bold text-white mb-2 ${
 isMobile ? 'text-xl' : 'text-2xl'
 }`}>
 پیشنهاد قیمت پروژه خود را دریافت کنید
 </h3>
 <p className={`text-gray-400 ${
 isMobile ? 'text-sm' : ''
 }`}>
 درباره پروژه خود به ما بگویید و ما ظرف {toFarsiDigits('24')} ساعت پیشنهاد قیمت دقیقی برای شما ارسال می‌کنیم.
 </p>
 </div>

 <form onSubmit={handleQuoteSubmit} className="space-y-6">
 <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 نام کامل *
 </label>
 <input
 type="text"
 value={quoteForm.name}
 onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 placeholder="نام و نام خانوادگی خود را وارد کنید"
 required
 />
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 آدرس ایمیل *
 </label>
 <input
 type="email"
 value={quoteForm.email}
 onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 placeholder="آدرس ایمیل خود را وارد کنید"
 dir="ltr"
 required
 />
 </motion.div>
 </div>

 <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 نام شرکت
 </label>
 <input
 type="text"
 value={quoteForm.company}
 onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 placeholder="نام شرکت خود را وارد کنید"
 />
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.4 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 خدمت مورد نیاز *
 </label>
 <select
 value={quoteForm.service}
 onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 required
 >
 <option value="">یک خدمت را انتخاب کنید</option>
 <option value="Website Design & Redesign">{t('footer.websiteDesign')}</option>
 <option value="E-commerce Enhancement & Marketing">{t('footer.ecommerceEnhancement')}</option>
 <option value="AI Process Automation">{t('footer.aiAutomation')}</option>
 <option value="Website Performance Optimization">{t('footer.performanceOptimization')}</option>
 <option value="UI/UX Design & Branding">{t('footer.uiuxBranding')}</option>
 <option value="Online Booking Systems">{t('footer.onlineBooking')}</option>
 <option value="Search Engine Optimization (SEO)">{t('footer.seo')}</option>
 <option value="Website Security Services">{t('footer.websiteSecurity')}</option>
 </select>
 </motion.div>
 </div>

 <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}`}>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.5 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 محدوده بودجه
 </label>
 <select
 value={quoteForm.budget}
 onChange={(e) => setQuoteForm({...quoteForm, budget: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 >
 <option value="">محدوده بودجه را انتخاب کنید</option>
 <option value="Under $5,000">{`کمتر از ${toFarsiDigits('5,000')} دلار`}</option>
 <option value="$5,000 - $10,000">{`${toFarsiDigits('5,000')} تا ${toFarsiDigits('10,000')} دلار`}</option>
 <option value="$10,000 - $25,000">{`${toFarsiDigits('10,000')} تا ${toFarsiDigits('25,000')} دلار`}</option>
 <option value="$25,000 - $50,000">{`${toFarsiDigits('25,000')} تا ${toFarsiDigits('50,000')} دلار`}</option>
 <option value="$50,000+">{`بیش از ${toFarsiDigits('50,000')} دلار`}</option>
 </select>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.6 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 بازه زمانی
 </label>
 <select
 value={quoteForm.timeline}
 onChange={(e) => setQuoteForm({...quoteForm, timeline: e.target.value})}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 >
 <option value="">بازه زمانی را انتخاب کنید</option>
 <option value="ASAP">در اسرع وقت</option>
 <option value="1-2 weeks">{`${toFarsiDigits('1')} تا ${toFarsiDigits('2')} هفته`}</option>
 <option value="1 month">{`${toFarsiDigits('1')} ماه`}</option>
 <option value="2-3 months">{`${toFarsiDigits('2')} تا ${toFarsiDigits('3')} ماه`}</option>
 <option value="3-6 months">{`${toFarsiDigits('3')} تا ${toFarsiDigits('6')} ماه`}</option>
 <option value="6+ months">{`بیش از ${toFarsiDigits('6')} ماه`}</option>
 </select>
 </motion.div>
 </div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.7 }}
 >
 <label className={`block text-white font-semibold mb-2 ${
 isMobile ? 'text-sm' : ''
 }`}>
 جزئیات پروژه *
 </label>
 <textarea
 value={quoteForm.message}
 onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
 rows={isMobile ? 4 : 6}
 className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none ${
 isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4'
 }`}
 placeholder="درباره پروژه، اهداف و هرگونه نیاز خاص خود برای ما بنویسید..."
 required
 />
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.8 }}
 >
 <motion.button
 type="submit"
 disabled={isSubmitting}
 whileHover={!isMobile ? { scale: 1.02 } : {}}
 whileTap={{ scale: 0.98 }}
 className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
 isMobile ? 'py-4 text-base' : 'py-5 text-lg'
 }`}
 >
 {isSubmitting ? (
 <>
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
 className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
 />
 <span>در حال ارسال درخواست...</span>
 </>
 ) : (
 <>
 <span>ارسال درخواست پیشنهاد قیمت</span>
 <FiSend className="w-5 h-5" />
 </>
 )}
 </motion.button>
 </motion.div>
 </form>
 </motion.div>
 ) : (
 <motion.div
 key="meeting"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.3 }}
 >
 <div className="mb-6">
 <h3 className={`font-bold text-white mb-2 ${
 isMobile ? 'text-xl' : 'text-2xl'
 }`}>
 رزرو جلسه
 </h3>
 <p className={`text-gray-400 ${
 isMobile ? 'text-sm' : ''
 }`}>
 یک مشاوره رایگان رزرو کنید تا درباره پروژه شما به‌طور مفصل گفتگو کنیم.
 </p>
 </div>

 {/* Mobile-Optimized Booking Steps */}
 <div className={`mb-6 ${isMobile ? 'space-y-2' : 'flex items-center gap-4'}`}>
 {[
 { step: 1, label: 'انتخاب تاریخ', icon: FiCalendar },
 { step: 2, label: 'انتخاب زمان', icon: FiClock },
 { step: 3, label: 'اطلاعات شما', icon: FiUsers }
 ].map((item, index) => (
 <div key={index} className={`flex items-center gap-3 ${
 isMobile ? 'p-2 rounded-xl' : ''
 } ${
 bookingStep === item.step 
 ? 'text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20' 
 : bookingStep > item.step 
 ? 'text-green-400' 
 : 'text-gray-500'
 }`}>
 <div className={`flex items-center justify-center rounded-full ${
 isMobile ? 'w-8 h-8' : 'w-10 h-10'
 } ${
 bookingStep === item.step 
 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
 : bookingStep > item.step 
 ? 'bg-green-600 text-white' 
 : 'bg-gray-700 text-gray-400'
 }`}>
 {bookingStep > item.step ? (
 <FiCheckCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
 ) : (
 <span className={`font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>{toFarsiDigits(item.step)}</span>
 )}
 </div>
 <span className={`font-semibold ${
 isMobile ? 'text-sm' : ''
 }`}>
 {item.label}
 </span>
 {!isMobile && index < 2 && (
 <FiArrowRight className="w-4 h-4 text-gray-600 mr-2 rotate-180" />
 )}
 </div>
 ))}
 </div>

 {/* Booking Content */}
 <div className="space-y-6">
 {bookingStep === 1 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Calendar
      selectedDate={selectedDate}
      onSelectDate={(date) => {
        setSelectedDate(date);
        setBookingStep(2);
      }}
    />
  </motion.div>
)}

 {bookingStep === 2 && selectedDate && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 <div className="flex items-center gap-4 mb-4">
 <button
 onClick={() => setBookingStep(1)}
 className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
 >
 <FiArrowLeft className="w-4 h-4" />
 <span className={`${isMobile ? 'text-sm' : ''}`}>بازگشت به تقویم</span>
 </button>
 </div>
 <TimeSlots
 selectedDate={selectedDate}
 selectedTime={selectedTime}
 onSelectTime={(time) => {
 setSelectedTime(time);
 setBookingStep(3);
 }}
 onBack={() => setBookingStep(1)}
/>
 </motion.div>
 )}

 {bookingStep === 3 && selectedDate && selectedTime && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 <div className="flex items-center gap-4 mb-4">
 <button
 onClick={() => setBookingStep(2)}
 className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
 >
 <FiArrowLeft className="w-4 h-4" />
 <span className={`${isMobile ? 'text-sm' : ''}`}>بازگشت به بازه‌های زمانی</span>
 </button>
 </div>
 <BookingForm
 selectedDate={selectedDate}
 selectedTime={selectedTime}
 onBack={() => setBookingStep(2)}
 />
 </motion.div>
 )}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* Mobile-First FAQ Section */}
 <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-b from-black to-gray-900/50`}>
 <div className="max-w-4xl mx-auto px-4 md:px-6">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-center mb-12"
 >
 <h2 className={`font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 ${
 isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'
 }`}>
 سوالات متداول
 </h2>
 <p className={`text-gray-400 ${
 isMobile ? 'text-base px-4' : 'text-lg'
 }`}>
 سوالی دارید؟ ما پاسخ داریم. در ادامه رایج‌ترین سوالاتی که مشتریان از ما می‌پرسند را می‌بینید.
 </p>
 </motion.div>

 <div className="space-y-4">
 {[
 {
 question: "تکمیل یک پروژه چقدر طول می‌کشد؟",
 answer: `زمان‌بندی پروژه بسته به پیچیدگی و دامنه کار متفاوت است. بازطراحی یک وب‌سایت ساده معمولاً ${toFarsiDigits('2')} تا ${toFarsiDigits('4')} هفته زمان می‌برد، در حالی که یک پلتفرم تجارت الکترونیکی پیچیده می‌تواند ${toFarsiDigits('2')} تا ${toFarsiDigits('3')} ماه طول بکشد. ما در مشاوره اولیه، زمان‌بندی دقیقی در اختیار شما قرار می‌دهیم.`
 },
 {
 question: "آیا پس از تکمیل پروژه، پشتیبانی مستمر ارائه می‌دهید؟",
 answer: "بله! ما بسته‌های پشتیبانی جامعی شامل نگهداری، به‌روزرسانی، پایش امنیتی و پشتیبانی فنی ارائه می‌دهیم. تیم ما به‌صورت شبانه‌روزی در دسترس است تا از عملکرد روان حضور دیجیتال شما اطمینان حاصل کند."
 },
 {
 question: "ساختار قیمت‌گذاری شما چگونه است؟",
 answer: "قیمت‌گذاری ما بر اساس پروژه و نیازهای خاص شما تعیین می‌شود. ما نرخ‌های رقابتی و طرح‌های پرداخت انعطاف‌پذیر ارائه می‌دهیم. برای دریافت پیشنهاد قیمت متناسب با نیاز خود با ما تماس بگیرید."
 },
 {
 question: "آیا با کسب‌وکارهای خارج از امارات نیز همکاری می‌کنید؟",
 answer: "قطعاً! اگرچه دفتر ما در دبی است، اما با مشتریانی در سراسر جهان همکاری می‌کنیم. ابزارها و فرآیندهای همکاری از راه دور ما، ارتباطی روان و بدون محدودیت مکانی را تضمین می‌کند."
 },
 {
 question: "چه چیزی تیم راهکارهای دیجیتال امارات را متمایز می‌کند؟",
 answer: "ما فناوری پیشرفته را با خلاقیت برجسته و سال‌ها تجربه ترکیب می‌کنیم. تیم ما بر ارائه نتایج قابل‌اندازه‌گیری و ایجاد همکاری‌های بلندمدت با مشتریان تمرکز دارد."
 }
 ].map((faq, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
 >
 <button
 onClick={() => setExpandedContact(expandedContact === index + 10 ? null : index + 10)}
 className={`w-full text-right flex items-center justify-between transition-all duration-300 ${
 isMobile ? 'p-4' : 'p-6'
 }`}
 >
 <h3 className={`font-semibold text-white pl-4 ${
 isMobile ? 'text-base' : 'text-lg'
 }`}>
 {faq.question}
 </h3>
 <motion.div
 animate={{ rotate: expandedContact === index + 10 ? 180 : 0 }}
 transition={{ duration: 0.3 }}
 className="flex-shrink-0"
 >
 <FiChevronDown className="w-5 h-5 text-purple-400" />
 </motion.div>
 </button>
 
 <AnimatePresence>
 {expandedContact === index + 10 && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="overflow-hidden border-t border-white/10"
 >
 <div className={`text-gray-300 leading-relaxed ${
 isMobile ? 'p-4 text-sm' : 'p-6'
 }`}>
 {faq.answer}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Mobile-First CTA Section */}
 <section className={`${isMobile ? 'py-16' : 'py-20'} bg-gradient-to-r from-purple-900/50 to-blue-900/50 relative overflow-hidden`}>
 <div className="absolute inset-0">
 {isMobile ? (
 <motion.div
 className="absolute inset-0 opacity-20"
 style={{
 background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
 backgroundSize: '400% 400%'
 }}
 animate={{
 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
 }}
 transition={{
 duration: 8,
 repeat: Infinity,
 ease: 'linear'
 }}
 />
 ) : (
 <>
 <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
 </>
 )}
 </div>

 <div className={`relative z-10 mx-auto px-4 md:px-6 text-center ${isMobile ? 'max-w-sm' : 'max-w-4xl'}`}>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 {isMobile ? (
 // Mobile CTA Layout
 <div className="space-y-6">
 <motion.div
 initial={{ scale: 0 }}
 whileInView={{ scale: 1 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
 >
 <FiZap className="w-8 h-8 text-white" />
 </motion.div>

 <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
 آماده شروع هستید؟
 </h2>

 <p className="text-gray-300 mb-8 leading-relaxed px-4 text-base">
 بیایید چشم‌انداز شما را به واقعیت تبدیل کنیم. تیم ما آماده است تا به شما در دستیابی به اهداف دیجیتال کمک کند.
 </p>

 <div className="space-y-4">
 <motion.button
 onClick={() => setActiveTab('quote')}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
 >
 <span>دریافت پیشنهاد قیمت</span>
 <FiSend className="w-5 h-5" />
 </motion.button>

 <motion.button
 onClick={() => setActiveTab('meeting')}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 className="w-full px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300"
 >
 رزرو جلسه
 </motion.button>
 </div>
 </div>
 ) : (
 // Desktop CTA Layout
 <div>
 <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
 آماده شروع هستید؟
 </h2>
 <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
 بیایید چشم‌انداز شما را به واقعیت تبدیل کنیم. تیم ما آماده است تا به شما در دستیابی به اهداف دیجیتال کمک کند.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <motion.button
 onClick={() => setActiveTab('quote')}
 whileHover={{
 scale: 1.05,
 boxShadow: '0 25px 50px rgba(139, 92, 246, 0.5)'
 }}
 whileTap={{ scale: 0.95 }}
 className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
 >
 دریافت پیشنهاد قیمت
 <FiSend className="w-5 h-5" />
 </motion.button>
 <motion.button
 onClick={() => setActiveTab('meeting')}
 whileHover={{
 scale: 1.05,
 backgroundColor: 'rgba(255, 255, 255, 0.15)'
 }}
 whileTap={{ scale: 0.95 }}
 className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:border-purple-500/50 transition-all duration-300"
 >
 رزرو جلسه
 </motion.button>
 </div>
 </div>
 )}
 </motion.div>
 </div>
 </section>

 {/* Mobile: Floating Action Buttons */}
 {isMobile && (
 <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
 <motion.a
 href="tel:+971501234567"
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5, delay: 1 }}
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.9 }}
 className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
 >
 <FiPhone className="w-5 h-5 text-white" />
 </motion.a>
 
 <motion.a
 href="mailto:hello@uaedigitalteam.com"
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5, delay: 1.2 }}
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.9 }}
 className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
 >
 <FiMail className="w-5 h-5 text-white" />
 </motion.a>
 </div>
 )}

 {/* Mobile: Contact Methods Modal */}
 {isMobile && (
 <div className="fixed bottom-24 left-4 right-4 z-40">
 <motion.div
 initial={{ opacity: 0, y: 100 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 1.5 }}
 className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20"
 >
 <div className="flex items-center justify-between mb-3">
 <h3 className="text-white font-semibold text-sm">تماس سریع</h3>
 <div className="flex gap-2">
 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
 <span className="text-green-400 text-xs font-medium">آنلاین</span>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-2">
 <motion.a
 href="mailto:hello@uaedigitalteam.com"
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-1 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
 >
 <FiMail className="w-4 h-4 text-purple-400" />
 <span className="text-white text-xs font-medium">{t('pages.contact.email')}</span>
 </motion.a>
 <motion.a
 href="tel:+971501234567"
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-1 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
 >
 <FiPhone className="w-4 h-4 text-blue-400" />
 <span className="text-white text-xs font-medium">تماس</span>
 </motion.a>
 <motion.button
 onClick={() => setActiveTab('meeting')}
 whileTap={{ scale: 0.95 }}
 className="flex flex-col items-center gap-1 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
 >
 <FiCalendar className="w-4 h-4 text-green-400" />
 <span className="text-white text-xs font-medium">جلسه</span>
 </motion.button>
 </div>
 </motion.div>
 </div>
 )}
 </div>
 );
}