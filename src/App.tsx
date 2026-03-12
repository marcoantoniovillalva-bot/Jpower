import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Wind, 
  Sun, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  Instagram, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import { ParticleBackground } from './components/ParticleBackground';

// --- Components ---

const COOKIE_CONSENT_KEY = 'jpower-cookie-consent';

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="w-12 h-12 bg-black border-2 border-[#F8C730] rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(248,199,48,0.3)]">
      <span className="text-white font-black text-[10px] leading-tight text-center tracking-tighter">
        J<br />POWER
      </span>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black tracking-tighter text-white leading-none">
        J<span className="text-[#F8C730]">POWER</span>
      </span>
      <span className="text-[8px] text-[#F8C730] font-bold tracking-[0.4em] uppercase">Electric Tech</span>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servizi', href: '#servizi' },
    { name: 'Chi Siamo', href: '#chi-siamo' },
    { name: 'Lavori', href: '#lavori' },
    { name: 'Contatti', href: '#contatti' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
      isScrolled 
        ? "bg-black/80 backdrop-blur-md border-white/10 py-3" 
        : "bg-transparent border-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Logo />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-[#F8C730] transition-colors uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="tel:3492453251"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F8C730] text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(248,199,48,0.4)] transition-all"
          >
            <PhoneCall size={16} />
            CHIAMA ORA
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:3492453251" 
                className="bg-[#F8C730] text-black p-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
              >
                <PhoneCall size={20} />
                349 2453251
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PrivacyConsentPopup = ({
  isOpen,
  onAccept,
  onNecessaryOnly,
}: {
  isOpen: boolean;
  onAccept: () => void;
  onNecessaryOnly: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 bottom-4 z-[90] md:inset-x-6 md:bottom-6"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/85 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(248,199,48,0.18),transparent_35%)]" />
          <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
            <div className="max-w-3xl">
              <span className="mb-3 inline-flex items-center rounded-full border border-[#F8C730]/30 bg-[#F8C730]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-[#F8C730]">
                Privacy e Cookie
              </span>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-white md:text-3xl">
                Gestiamo i cookie con trasparenza.
              </h3>
              <p className="text-sm leading-relaxed text-white/65 md:text-base">
                Usiamo cookie tecnici per il corretto funzionamento del sito e, con il tuo consenso, cookie aggiuntivi per migliorare esperienza e misurazione.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                <a href="/privacy.html" className="transition-colors hover:text-[#F8C730]">
                  Privacy Policy
                </a>
                <a href="/cookie.html" className="transition-colors hover:text-[#F8C730]">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[290px]">
              <button
                onClick={onAccept}
                className="rounded-2xl bg-[#F8C730] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Accetta tutti
              </button>
              <button
                onClick={onNecessaryOnly}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-[#F8C730]/40 hover:text-[#F8C730]"
              >
                Solo necessari
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceCard = ({ title, description, icon: Icon, image, delay, onClick }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <motion.div 
          animate={{ 
            borderRadius: ["20%", "40%", "20%"],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 bg-[#F8C730] p-3 text-black shadow-lg"
        >
          <Icon size={24} />
        </motion.div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#F8C730] transition-colors">
          {title}
        </h3>
        <p className="text-white/60 leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        <motion.button 
          onClick={onClick}
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-[#F8C730] font-bold text-sm uppercase tracking-widest"
        >
          Scopri di più <ChevronRight size={16} />
        </motion.button>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-[#F8C730]/0 via-[#F8C730]/20 to-[#F8C730]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const ServiceModal = ({ service, onClose }: { service: any, onClose: () => void }) => {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#F8C730] hover:text-black transition-all"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-[#F8C730] p-4 rounded-2xl text-black inline-block mb-4 shadow-xl">
                  <service.icon size={32} />
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <span className="text-[#F8C730] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Dettagli Servizio</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{service.title}</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {service.fullDescription || service.description}
              </p>

              <div className="space-y-6">
                <h4 className="font-bold text-white uppercase tracking-widest text-sm border-b border-white/10 pb-2">Cosa offriamo:</h4>
                <ul className="grid grid-cols-1 gap-4">
                  {service.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-6 h-6 bg-[#F8C730]/10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-[#F8C730]" size={14} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <a 
                  href="tel:3492453251" 
                  onClick={onClose}
                  className="inline-flex items-center gap-3 bg-[#F8C730] text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Richiedi un preventivo <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center p-2 md:p-6 overflow-y-auto"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl" 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl my-4 md:my-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#F8C730] hover:text-black transition-all"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-48 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                alt="Chi Siamo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="p-4 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[70vh]">
              <span className="text-[#F8C730] font-bold tracking-[0.3em] uppercase text-xs mb-2 md:mb-4 block">La Nostra Visione</span>
              <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">ECCELLENZA E <br />AFFIDABILITÀ.</h2>
              <div className="space-y-4 md:space-y-6 text-white/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                <p>
                  Fondata con l'obiettivo di ridefinire gli standard nel settore elettrico e tecnologico, J Power si è evoluta costantemente per abbracciare le sfide del futuro energetico.
                </p>
                <p>
                  La nostra forza risiede nella combinazione tra competenza artigianale e visione tecnologica. Ogni membro del nostro team è costantemente aggiornato sulle ultime normative e innovazioni del settore.
                </p>
                <p>
                  Siamo orgogliosi di servire sia il settore residenziale che quello industriale, portando lo stesso livello di dedizione e precisione in ogni intervento, dalla piccola riparazione alla grande infrastruttura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                <div className="p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <Clock className="text-[#F8C730] mb-2 md:mb-4" size={20} />
                  <h4 className="font-bold text-white mb-1 md:mb-2">Tempismo</h4>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed">Interventi rapidi e scadenze sempre rispettate.</p>
                </div>
                <div className="p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <ShieldCheck className="text-[#F8C730] mb-2 md:mb-4" size={20} />
                  <h4 className="font-bold text-white mb-1 md:mb-2">Sicurezza</h4>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed">Impianti certificati secondo le più rigide normative.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 40,
      y: (e.clientY / window.innerHeight - 0.5) * 40,
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Video/GIF Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.img 
          animate={{ 
            x: mousePos.x * 0.2,
            y: mousePos.y * 0.2,
            scale: 1.1
          }}
          src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1920" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Floating Objects */}
        <motion.div
          animate={{ 
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
            rotate: 15
          }}
          className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#F8C730]/10 blur-3xl rounded-full z-10"
        />
        <motion.div
          animate={{ 
            x: -mousePos.x * 0.3,
            y: -mousePos.y * 0.3,
            rotate: -15
          }}
          className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-[#F8C730]/5 blur-3xl rounded-full z-10"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 rounded-full border border-[#F8C730]/30 text-[#F8C730] text-xs font-bold tracking-[0.3em] uppercase mb-6 bg-[#F8C730]/5"
          >
            Energia • Tecnologia • Sicurezza
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            L'ENERGIA DEL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8C730] to-white">FUTURO</span> OGGI.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Soluzioni all'avanguardia per impianti elettrici, domotica e sicurezza. 
            Professionalità certificata al servizio della tua casa e della tua azienda.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="tel:3492453251"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(248,199,48,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#F8C730] text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all"
            >
              <PhoneCall size={24} />
              RICHIEDI PREVENTIVO
            </motion.a>
            <motion.a
              href="#servizi"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-sm transition-all"
            >
              I NOSTRI SERVIZI
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#F8C730] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const SectionWrapper = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={cn("relative z-10", className)}
  >
    {children}
  </motion.section>
);

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPrivacyConsentOpen, setIsPrivacyConsentOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      setIsPrivacyConsentOpen(true);
    }
  }, []);

  const savePrivacyConsent = (mode: 'accepted' | 'necessary') => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, mode);
    setIsPrivacyConsentOpen(false);
  };

  const galleryImages = [
    "/images/500633588_17854079946445501_2580549869276046222_n.webp",
    "/images/502173004_17854576911445501_8219889089375380371_n.webp",
    "/images/509713962_623781660094780_7862875565749660320_n.webp",
    "/images/552135250_17868381168445501_8204053416945411122_n.webp",
    "/images/557466926_17869320492445501_31454608500293540_n.webp",
    "/images/632288788_17886851496445501_1581709827445146653_n.webp",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const services = [
    {
      title: "Impianti Elettrici",
      description: "Progettazione e installazione di impianti civili e industriali certificati, con massima attenzione alla sicurezza e all'efficienza energetica.",
      fullDescription: "Offriamo soluzioni complete per impianti elettrici, dalla progettazione iniziale al collaudo finale. Utilizziamo solo materiali di altissima qualità per garantire sicurezza e durata nel tempo. Che si tratti di una nuova costruzione o di una ristrutturazione, il nostro team è pronto a soddisfare ogni esigenza tecnica.",
      features: [
        "Impianti civili e industriali",
        "Rifacimento quadri elettrici",
        "Illuminazione LED a basso consumo",
        "Certificazione di conformità",
        "Manutenzione programmata"
      ],
      icon: Zap,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
      delay: 0.1
    },
    {
      title: "Condizionamento",
      description: "Sistemi di climatizzazione di ultima generazione per il massimo comfort termico in ogni stagione, con tecnologie a basso consumo.",
      fullDescription: "Il comfort climatico della tua casa o del tuo ufficio è la nostra priorità. Installiamo sistemi di condizionamento efficienti e silenziosi, con tecnologia inverter per minimizzare i consumi energetici. Offriamo anche servizi di ricarica gas e sanificazione filtri.",
      features: [
        "Installazione condizionatori split e canalizzati",
        "Sistemi a pompa di calore",
        "Manutenzione e pulizia filtri",
        "Ricarica gas refrigerante",
        "Consulenza per detrazioni fiscali"
      ],
      icon: Wind,
      image: "/images/Whisk_0bfb1700c987cbbbeac4172d11f0cd01dr.jpeg",
      delay: 0.2
    },
    {
      title: "Fotovoltaico",
      description: "Trasforma la tua casa in una centrale energetica pulita. Installazione pannelli solari e sistemi di accumulo per l'indipendenza energetica.",
      fullDescription: "Investire nel fotovoltaico significa investire nel futuro. Progettiamo impianti su misura per massimizzare la produzione di energia pulita, integrando sistemi di accumulo per utilizzare l'energia solare anche durante la notte. Riduci drasticamente le tue bollette e il tuo impatto ambientale.",
      features: [
        "Progettazione impianti su misura",
        "Installazione pannelli ad alta efficienza",
        "Sistemi di accumulo (batterie)",
        "Monitoraggio produzione via app",
        "Pratiche burocratiche e incentivi"
      ],
      icon: Sun,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
      delay: 0.3
    },
    {
      title: "Antintrusione",
      description: "Proteggi ciò che ami con sistemi di sicurezza intelligenti, videosorveglianza e allarmi collegati h24 al tuo smartphone.",
      fullDescription: "La tua sicurezza non ammette compromessi. Installiamo i più avanzati sistemi antintrusione, integrimetrali, sensori di movimento e telecamere ad alta definizione. Tutto è gestibile comodamente dal tuo smartphone per una tranquillitàando allarmi per totale, ovunque tu sia.",
      features: [
        "Allarmi senza fili e cablati",
        "Videosorveglianza IP 4K",
        "Controllo remoto via smartphone",
        "Integrazione with forze dell'ordine",
        "Sistemi nebbiogeni"
      ],
      icon: ShieldCheck,
      image: "/images/Whisk_0039f7584cc896bb18a4a9ad9df39355eg.png",
      delay: 0.4
    },
    {
      title: "Citofonia",
      description: "Sistemi di videocitofonia moderni e smart. Rispondi al citofono direttamente dal tuo cellulare, ovunque tu sia.",
      fullDescription: "Evolvi il modo in cui accogli i tuoi ospiti. I nostri sistemi di videocitofonia smart ti permettono di vedere e parlare con chi suona alla porta anche quando non sei in casa. Sicurezza e comodità si fondono in dispositivi dal design elegante e funzionale.",
      features: [
        "Videocitofoni smart Wi-Fi",
        "Integrazione con domotica",
        "Apertura cancelli da remoto",
        "Registrazione chiamate perse",
        "Sostituzione vecchi impianti"
      ],
      icon: PhoneCall,
      image: "/images/Whisk_a95048babe1c8a0810f48e93804733dcdr.png",
      delay: 0.5
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#F8C730] selection:text-black">
      <ParticleBackground />
      <Navbar />
      
      <main>
        <Hero />

        {/* Stats Section */}
        <SectionWrapper className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Anni di Esperienza', value: '10+' },
                { label: 'Progetti Completati', value: '500+' },
                { label: 'Clienti Soddisfatti', value: '100%' },
                { label: 'Certificazioni', value: 'ISO' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-6xl font-black text-[#F8C730] mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Services Section */}
        <SectionWrapper id="servizi" className="py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-[#F8C730] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                >
                  Cosa Facciamo
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  SOLUZIONI TECNOLOGICHE <br />
                  <span className="text-white/20">SENZA COMPROMESSI.</span>
                </h2>
              </div>
              <p className="text-white/50 max-w-md">
                Dalla piccola riparazione domestica alla grande infrastruttura industriale, 
                portiamo innovazione e sicurezza in ogni progetto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <ServiceCard 
                  key={i} 
                  {...service} 
                  onClick={() => setSelectedService(service)}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        <AnimatePresence>
          {selectedService && (
            <ServiceModal 
              service={selectedService} 
              onClose={() => setSelectedService(null)} 
            />
          )}
          <AboutModal 
            isOpen={isAboutModalOpen} 
            onClose={() => setIsAboutModalOpen(false)} 
          />
        </AnimatePresence>

        {/* Testimonials Section */}
        <SectionWrapper className="py-32 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">DICONO DI NOI</h2>
              <div className="w-24 h-1 bg-[#F8C730] mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Marco V.', role: 'Privato', text: 'Professionalità e puntualità incredibili. Hanno rifatto l\'impianto elettrico di casa mia in tempi record.' },
                { name: 'Elena R.', role: 'Azienda Agricola', text: 'L\'impianto fotovoltaico installato da J Power sta superando le aspettative. Ottimo investimento.' },
                { name: 'Giuseppe T.', role: 'Ristoratore', text: 'Il sistema di condizionamento è silenzioso ed efficiente. Assistenza post-vendita eccellente.' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900 p-8 rounded-[2rem] border border-white/5"
                >
                  <div className="flex gap-1 mb-6 text-[#F8C730]">
                    {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={16} />)}
                  </div>
                  <p className="text-white/70 italic mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F8C730] rounded-full flex items-center justify-center text-black font-black">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* CTA Section */}
        <SectionWrapper id="contatti" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#F8C730] to-[#d4a81e] rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-black relative overflow-hidden group"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                    PRONTO A <br />
                    PARTIRE?
                  </h2>
                  <p className="text-lg md:text-xl font-medium mb-8 md:mb-12 opacity-80">
                    Contattaci oggi per un sopralluogo gratuito e un preventivo personalizzato. 
                    Il tuo progetto merita il meglio.
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-black/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                        <PhoneCall size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] md:text-xs uppercase font-black opacity-50">Telefono</div>
                        <div className="text-xl md:text-2xl font-black tracking-tight">349 2453251</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-black/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                        <Mail size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] md:text-xs uppercase font-black opacity-50">Email</div>
                        <div className="text-lg md:text-2xl font-black tracking-tight break-all">jpowermoroni@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/5 backdrop-blur-sm border border-black/10 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem]">
                  <form className="space-y-4 md:space-y-6">
                    <div className="space-y-1 md:space-y-2">
                      <label className="text-[10px] md:text-xs uppercase font-black opacity-50">Nome Completo</label>
                      <input type="text" className="w-full bg-white/50 border border-black/10 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Mario Rossi" />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <label className="text-[10px] md:text-xs uppercase font-black opacity-50">Email</label>
                      <input type="email" className="w-full bg-white/50 border border-black/10 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="mario@esempio.it" />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <label className="text-[10px] md:text-xs uppercase font-black opacity-50">Messaggio</label>
                      <textarea className="w-full bg-white/50 border border-black/10 rounded-xl p-3 md:p-4 h-24 md:h-32 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Descrivi il tuo progetto..." />
                    </div>
                    <button className="w-full bg-black text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:scale-[1.02] transition-transform active:scale-95">
                      INVIA RICHIESTA
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Instagram Section */}
        <SectionWrapper id="lavori" className="py-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-16"
            >
              <Instagram className="mx-auto mb-6 text-[#F8C730]" size={48} />
              <h2 className="text-4xl md:text-6xl font-black mb-4">SEGUICI SU INSTAGRAM</h2>
              <p className="text-white/40">Resta aggiornato sui nostri ultimi lavori e novità tecnologiche.</p>
            </motion.div>

            {/* Dynamic Gallery with Manual Navigation */}
            <div className="relative">
              {/* Main Image Display */}
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
                {galleryImages.map((img, i) => (
                  <AnimatePresence key={i}>
                    {currentImageIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <motion.a
                          href="https://www.instagram.com/jpower_insta"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full relative group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <img 
                            src={img} 
                            alt={`Lavori J Power ${i + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                            <div>
                              <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-[#F8C730] p-3 rounded-full inline-flex mb-4"
                              >
                                <Instagram className="text-black" size={24} />
                              </motion.div>
                              <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white text-2xl font-black"
                              >
                                J POWER
                              </motion.p>
                              <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/60"
                              >
                                Impianti Elettrici & Climatizzazione
                              </motion.p>
                            </div>
                          </div>
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#F8C730] hover:text-black transition-all z-10"
                >
                  <ChevronRight className="rotate-180" size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#F8C730] hover:text-black transition-all z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold z-10">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                      currentImageIndex === i 
                        ? 'ring-2 ring-[#F8C730] ring-offset-2 ring-offset-black scale-110' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <motion.a
              href="https://www.instagram.com/jpower_insta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-12 text-[#F8C730] font-bold border-b-2 border-[#F8C730] pb-1 hover:gap-4 transition-all"
            >
              Vedi tutti i lavori <ArrowRight size={20} />
            </motion.a>
          </div>
        </SectionWrapper>

        {/* Chi Siamo Section */}
        <SectionWrapper id="chi-siamo" className="py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 group">
                  <img 
                    src="/images/Whisk_1a788b1bf96a6d490bd496a6f13dd122dr.png" 
                    alt="Team J Power" 
                    className="w-full h-64 md:h-auto md:aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 z-20 bg-[#F8C730] text-black p-8 rounded-3xl shadow-[0_20px_50px_rgba(248,199,48,0.3)] hidden md:block"
                >
                  <div className="text-4xl font-black leading-none">10</div>
                  <div className="text-xs font-bold uppercase tracking-widest">Anni di<br />Eccellenza</div>
                </motion.div>

                {/* Decorative Circles */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#F8C730]/10 blur-3xl rounded-full -z-10" />
              </motion.div>

              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#F8C730] font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
                >
                  La Nostra Storia
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black mb-8 leading-tight"
                >
                  PASSIONE PER <br />
                  <span className="text-white/20 text-stroke-white">L'INNOVAZIONE.</span>
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 text-white/60 text-lg font-light leading-relaxed"
                >
                  <p>
                    J Power nasce dalla visione di portare l'eccellenza tecnica nel mondo dell'energia e della tecnologia. 
                    Siamo un team di professionisti specializzati che crede fermamente nel potere dell'innovazione per migliorare la vita quotidiana.
                  </p>
                  <p>
                    Ogni progetto che affrontiamo è guidato da tre pilastri fondamentali: 
                    <span className="text-white font-bold"> sicurezza</span>, 
                    <span className="text-white font-bold"> efficienza</span> e 
                    <span className="text-white font-bold"> futuro</span>. 
                    Non ci limitiamo a installare impianti; progettiamo soluzioni intelligenti che durano nel tempo.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-8 mt-12"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F8C730]/10 rounded-2xl flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-[#F8C730]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Qualità</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Materiali Certificati</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F8C730]/10 rounded-2xl flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-[#F8C730]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Supporto</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Assistenza H24</p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsAboutModalOpen(true)}
                  className="mt-12 flex items-center gap-2 text-[#F8C730] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                >
                  Scopri di più sulla nostra storia <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* CTA Section */}
        <SectionWrapper id="contatti" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#F8C730] to-[#d4a81e] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-black relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                >
                  HAI BISOGNO DI UN PREVENTIVO?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-black/70 text-lg md:text-xl font-medium mb-8"
                >
                  I nostri tecnici sono pronti a rispondere a tutte le tue domande.
                </motion.p>
                  
                <motion.a 
                  href="tel:3492453251"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                >
                  Richiedi un preventivo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>

      <PrivacyConsentPopup
        isOpen={isPrivacyConsentOpen}
        onAccept={() => savePrivacyConsent('accepted')}
        onNecessaryOnly={() => savePrivacyConsent('necessary')}
      />

      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left">
              <div className="text-3xl font-black mb-4">
                J<span className="text-[#F8C730]">POWER</span>
              </div>
              <p className="text-white/40 max-w-xs">
                Innovazione elettrica e tecnologica per un futuro più sicuro ed efficiente.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#F8C730]">Link Rapidi</h4>
                <ul className="space-y-4 text-white/60 text-sm">
                  <li><a href="#servizi" className="hover:text-white transition-colors">Servizi</a></li>
                  <li><a href="#chi-siamo" className="hover:text-white transition-colors">Chi Siamo</a></li>
                  <li><a href="#lavori" className="hover:text-white transition-colors">Lavori</a></li>
                  <li><a href="#contatti" className="hover:text-white transition-colors">Contatti</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#F8C730]">Legale</h4>
                <ul className="space-y-4 text-white/60 text-sm">
                  <li><a href="/privacy.html" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/cookie.html" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="/termini.html" className="hover:text-white transition-colors">Termini e Condizioni</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#F8C730]">Social</h4>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/jpower_insta" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#F8C730] hover:text-black transition-all">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 text-xs text-white/30 font-medium uppercase tracking-widest">
            <div>© 2024 J POWER. Tutti i diritti riservati.</div>
            <div>P.IVA: 14123770969</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.link/mkq8be"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-shadow"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}

