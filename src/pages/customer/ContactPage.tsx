import React, { useState, useEffect } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { BookEyeTestModal } from '../../components/common/BookEyeTestModal';
import { generateWhatsAppLink } from '../../lib/utils';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
  Send,
  Calendar,
  CheckCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useShop();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Frame Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact & Showroom Location | AlNujoom Opticals';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Thank you! Your message has been received. Our team will contact you shortly.', 'success');
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello AlNujoom Opticals,\n\nInquiry from: ${form.name || 'Customer'}\nPhone: ${form.phone || 'N/A'}\nSubject: ${form.subject}\nMessage: ${form.message || 'I would like to inquire about frames/eye testing.'}`;
    const link = generateWhatsAppLink(settings.whatsapp_number, text);
    window.open(link, '_blank');
  };

  const faqs = [
    {
      q: 'Do I need an appointment for an eye test?',
      a: 'Walk-ins are warmly welcome! However, booking your preferred slot in advance guarantees zero waiting time with our chief optometrist.',
    },
    {
      q: 'How long does a comprehensive eye test take?',
      a: 'A standard clinical examination takes approximately 20 to 25 minutes, covering visual acuity, digital autorefraction, and eye wellness screening.',
    },
    {
      q: 'How fast can my prescription glasses be prepared?',
      a: 'Single-vision lenses in stock can often be edged and fitted within 1 to 2 hours in our in-house optical lab. Progressive and specialized custom coatings usually take 2 to 3 working days.',
    },
    {
      q: 'Do you offer warranty on frames and lenses?',
      a: 'Yes! All authentic designer frames carry a 1 to 2 year manufacturer warranty against defects. We also provide lifetime free frame tune-ups and adjustments.',
    },
  ];

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-slate-50 py-12 md:py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight mt-3">
              We’d Love to See You
            </h1>
            <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
              Visit our Dubai showroom or connect with our optical consultants on WhatsApp or phone for immediate assistance.
            </p>
          </div>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-2">Showroom Information</h2>
                <p className="text-xs text-gray-500 mb-6">
                  Feel free to drop in for complimentary frame styling, lens consultation, or ultrasonic eyewear cleaning.
                </p>
              </div>

              {/* Address */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Store Location
                  </h4>
                  <p className="text-sm font-semibold text-navy-900 leading-snug">
                    {settings.address}
                  </p>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Direct Phone
                    </h4>
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-sm font-bold text-navy-900 hover:text-brand-accent block"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      WhatsApp
                    </h4>
                    <a
                      href={generateWhatsAppLink(settings.whatsapp_number, 'Hello AlNujoom Opticals')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-600 hover:underline block"
                    >
                      {settings.whatsapp_number}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Store Hours
                  </h4>
                  <p className="text-sm font-semibold text-navy-900 leading-relaxed">
                    {settings.opening_hours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-semibold text-navy-900 hover:text-brand-accent transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Appointment CTA Box */}
              <div className="p-6 rounded-2xl bg-navy-900 text-white flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold">Need a Clinical Eye Exam?</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Schedule with our certified optometrist today.
                  </p>
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setIsBookModalOpen(true)}
                  icon={<Calendar className="w-4 h-4 text-amber-100" />}
                >
                  Book Exam
                </Button>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-soft-sm">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Send an Online Inquiry</h3>
              <p className="text-xs text-gray-500 mb-6">
                Have a question regarding lens options, prescription power, or frame availability? Fill out this quick form or send directly to WhatsApp.
              </p>

              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-navy-900">Message Received!</h4>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Thank you, <strong className="text-navy-900">{form.name}</strong>. Our customer care specialist will reach out to you within a few business hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSent(false);
                      setForm({ name: '', phone: '', email: '', subject: 'Frame Inquiry', message: '' });
                    }}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Tariq Mansoor"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Phone / Mobile Number"
                      type="tel"
                      placeholder="e.g. +971 50 123 4567"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address (Optional)"
                      type="email"
                      placeholder="e.g. you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <div>
                      <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
                      >
                        <option value="Frame Inquiry">Frame Inquiry & Stock</option>
                        <option value="Prescription Lenses">Prescription Lenses & Blue Shield</option>
                        <option value="Contact Lenses">Contact Lenses Fitting</option>
                        <option value="Eye Test Appointment">Eye Test Appointment</option>
                        <option value="Corporate Eyecare">Corporate Eyecare</option>
                        <option value="Other">Other Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wider mb-1.5">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what eyewear you are looking for or any vision concerns..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 p-3.5 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-100"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send via WhatsApp instead
                    </button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                      icon={<Send className="w-4 h-4" />}
                      iconPosition="right"
                      className="w-full sm:w-auto px-6"
                    >
                      Submit Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-soft-sm border border-gray-200 h-[380px] w-full">
            <iframe
              title="Showroom Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.28929971842!2d55.2428804684904!3d25.265742187317765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-slate-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
                Frequently Asked Optical Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft-sm"
                >
                  <h4 className="text-sm font-bold text-navy-900 flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <BookEyeTestModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
};
