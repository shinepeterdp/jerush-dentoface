import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  // Custom WhatsApp SVG icon
  const WhatsAppIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.59 1.97 14.121.945 11.993.945c-5.438 0-9.863 4.374-9.867 9.803-.001 1.77.462 3.5 1.342 5.027l-.95 3.47 3.58-.938zM18.06 14.86c-.33-.165-1.937-.957-2.231-1.063-.294-.106-.508-.16-.722.162-.214.32-.83.162-1.018-.053-.188-.216-.75-.276-1.43-.883-.529-.472-.887-1.055-.99-1.23-.105-.177-.01-.272.078-.36.08-.078.177-.207.265-.31.089-.104.119-.177.178-.295.06-.118.03-.222-.015-.31-.045-.088-.413-1.012-.567-1.373-.15-.359-.315-.31-.433-.31-.113-.005-.244-.006-.375-.006-.13 0-.342.049-.522.246-.18.197-.686.672-.686 1.637 0 .966.702 1.9.8 2.032.1.133 1.383 2.112 3.35 2.962.468.202.833.322 1.118.412.47.15.897.129 1.235.078.377-.058 1.144-.467 1.303-.92.158-.452.158-.84.11-.92-.047-.08-.175-.128-.507-.293z" />
    </svg>
  );

  const socialLinks = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      color: 'bg-green-500 hover:bg-green-600',
      icon: <WhatsAppIcon />,
      url: 'https://wa.me/919489160055',
    },
    {
      id: 'phone',
      name: 'Call Support',
      color: 'bg-brandSky hover:bg-brandSky/90',
      icon: <Phone className="w-5 h-5" />,
      url: 'tel:+919489160055',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:brightness-105',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/jerushdentoface',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: <Facebook className="w-5 h-5" />,
      url: 'https://facebook.com/jerushdentoface',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      color: 'bg-red-600 hover:bg-red-700',
      icon: <Youtube className="w-5 h-5" />,
      url: 'https://www.youtube.com/@jerushdentofacialandcosmetic',
    },
  ];

  return (
    <div className="fixed bottom-[140px] md:bottom-20 right-4 sm:right-6 z-[9999] flex flex-col items-center">
      {/* Floating Action Button List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="flex flex-col gap-3 mb-3 items-center"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.15 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer ${link.color} transition-all`}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-full flex items-center justify-center shadow-xl shadow-brandBlue/20 cursor-pointer relative z-20 outline-none border border-white/10"
        aria-label="Toggle contact channels"
      >
        {/* Pulse Effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brandSky/40 animate-ping opacity-60 pointer-events-none"></span>
        )}

        {/* Icon toggles */}
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            // Close icon
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          ) : (
            // Custom Message Icon
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
