import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Flower2,
  Heart,
  Home,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Scissors,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Star,
  Twitter,
  User,
  Wand2,
  Wind,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MakeupLook } from "./backend.d";
import {
  useGetAllLooks,
  useGetAllTutorials,
  useLikeLook,
} from "./hooks/useQueries";

// ── Static sample data ────────────────────────────────────────────────────────
const STATIC_LOOKS: MakeupLook[] = [
  {
    id: BigInt(1),
    title: "Golden Hour Glow",
    creator: "@aurora.beauty",
    category: "eyes" as any,
    tags: ["Gold", "Editorial", "Evening"],
    likes: BigInt(2847),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    title: "Dewy Skin Perfection",
    creator: "@luminara",
    category: "face" as any,
    tags: ["Natural", "Glowing", "Everyday"],
    likes: BigInt(1923),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    title: "Classic Red Lip",
    creator: "@velvet.vanity",
    category: "lips" as any,
    tags: ["Retro", "Glamour", "Bold"],
    likes: BigInt(3541),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    title: "Rose Gold Sunset",
    creator: "@bloom.studio",
    category: "eyes" as any,
    tags: ["Warm", "Sunset", "Romantic"],
    likes: BigInt(2109),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    title: "Soft Bridal Radiance",
    creator: "@ivory.glam",
    category: "face" as any,
    tags: ["Bridal", "Soft", "Luminous"],
    likes: BigInt(4201),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    title: "Graphic Liner Art",
    creator: "@edge.artistry",
    category: "eyes" as any,
    tags: ["Avant-garde", "Minimal", "Bold"],
    likes: BigInt(1677),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(7),
    title: "Midnight Plum Eyes",
    creator: "@nyx.palette",
    category: "eyes" as any,
    tags: ["Smoky", "Night", "Dramatic"],
    likes: BigInt(2398),
    created: BigInt(Date.now()),
  },
  {
    id: BigInt(8),
    title: "All-Pink Monochrome",
    creator: "@rose.ritual",
    category: "lips" as any,
    tags: ["Monochrome", "Pink", "Trendy"],
    likes: BigInt(3012),
    created: BigInt(Date.now()),
  },
];

const LOOK_IMAGES = [
  "/assets/generated/look-1.dim_600x500.jpg",
  "/assets/generated/look-2.dim_600x500.jpg",
  "/assets/generated/look-3.dim_600x500.jpg",
  "/assets/generated/look-4.dim_600x500.jpg",
  "/assets/generated/look-5.dim_600x500.jpg",
  "/assets/generated/look-6.dim_600x500.jpg",
  "/assets/generated/look-7.dim_600x500.jpg",
  "/assets/generated/look-8.dim_600x500.jpg",
];

const STATIC_TUTORIALS = [
  {
    title: "Master the Perfect Smoky Eye",
    duration: BigInt(1245),
    image: "/assets/generated/tutorial-1.dim_800x450.jpg",
  },
  {
    title: "Morning Skincare Ritual",
    duration: BigInt(867),
    image: "/assets/generated/tutorial-2.dim_800x450.jpg",
  },
  {
    title: "Contouring & Highlighting Masterclass",
    duration: BigInt(1890),
    image: "/assets/generated/tutorial-3.dim_800x450.jpg",
  },
];

const CATEGORIES = [
  {
    name: "Eyes",
    desc: "Eyeshadow, liner & lash perfection",
    image: "/assets/generated/cat-eyes.dim_400x400.jpg",
  },
  {
    name: "Lips",
    desc: "Lippies, glosses & lip art",
    image: "/assets/generated/cat-lips.dim_400x400.jpg",
  },
  {
    name: "Face",
    desc: "Foundation, blush & contour",
    image: "/assets/generated/cat-face.dim_400x400.jpg",
  },
  {
    name: "Skincare",
    desc: "Serums, moisturizers & glow",
    image: "/assets/generated/cat-skincare.dim_400x400.jpg",
  },
];

type Service = {
  icon: React.ElementType;
  name: string;
  desc: string;
  price?: string;
};

const BEAUTY_SERVICES: Service[] = [
  {
    icon: Star,
    name: "Bridal Makeup",
    desc: "Flawless, long-lasting bridal look for your special day.",
    price: "₹5,000 se start",
  },
  {
    icon: Wand2,
    name: "Hair Style",
    desc: "Elegant updos, curls, and trendy hairstyling for every occasion.",
  },
  {
    icon: Wind,
    name: "Straight Hair",
    desc: "Silky smooth hair straightening for a sleek, polished finish.",
    price: "₹200",
  },
  {
    icon: Wind,
    name: "Permanent Hair Straightening",
    desc: "Long-lasting permanent straightening for smooth, frizz-free hair.",
    price: "₹5,000 se start",
  },
  {
    icon: Scissors,
    name: "Threading – Upper Lips",
    desc: "Precise upper-lip threading for clean, defined shaping.",
    price: "₹30",
  },
  {
    icon: Scissors,
    name: "Threading – Forehead",
    desc: "Forehead and hairline threading for a neat, refined look.",
    price: "₹30",
  },
  {
    icon: ShieldCheck,
    name: "Wax – Underarms",
    desc: "Gentle underarm waxing for smooth, hair-free skin.",
    price: "₹250 se start",
  },
  {
    icon: Sparkles,
    name: "Facial",
    desc: "Rejuvenating facial treatments customized for your skin type.",
    price: "Price varies",
  },
  {
    icon: Flower2,
    name: "Mehndi (Mehandi)",
    desc: "Beautiful bridal and festive mehndi designs applied with care.",
  },
];

type RentalService = {
  icon: React.ElementType;
  name: string;
  desc: string;
  price?: string;
};

const RENTAL_SERVICES: RentalService[] = [
  {
    icon: Shirt,
    name: "Designer Saree on Rent",
    desc: "Gorgeous designer sarees available on rent for weddings & functions.",
    price: "₹1,000 se start",
  },
  {
    icon: Sparkles,
    name: "Designer Lehenga on Rent",
    desc: "Exquisite bridal and party lehengas available on rent.",
    price: "₹1,000 se start",
  },
];

function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}

function formatLikes(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Navigation ────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "oklch(0.885 0.03 22)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            data-ocid="nav.link"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            onClick={() => scrollTo("home")}
          >
            <img
              src="/assets/generated/nitya-logo-transparent.dim_200x200.png"
              alt="Nitya Beauty Parlour logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Nitya Beauty Parlour
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
            <button
              type="button"
              data-ocid="nav_services.link"
              className="hover:text-primary transition-colors"
              onClick={() => scrollTo("services")}
            >
              Services
            </button>
            <button
              type="button"
              data-ocid="nav_trending.link"
              className="hover:text-primary transition-colors"
              onClick={() => scrollTo("trending")}
            >
              Gallery
            </button>
            <button
              type="button"
              data-ocid="nav_tutorials.link"
              className="hover:text-primary transition-colors"
              onClick={() => scrollTo("tutorials")}
            >
              Tutorials
            </button>
            <button
              type="button"
              data-ocid="nav_categories.button"
              className="flex items-center gap-1 hover:text-primary transition-colors"
              onClick={() => scrollTo("categories")}
            >
              Categories <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              data-ocid="nav_trending2.link"
              className="hover:text-primary transition-colors"
              onClick={() => scrollTo("trending")}
            >
              Trending
            </button>
            <button
              type="button"
              data-ocid="nav_contact.link"
              className="hover:text-primary transition-colors"
              onClick={() => scrollTo("contact")}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="search.button"
              className="p-2 rounded-full hover:bg-border transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              data-ocid="profile.button"
              className="p-2 rounded-full hover:bg-border transition-colors"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <div className="w-5 h-0.5 bg-foreground mb-1" />
              <div className="w-5 h-0.5 bg-foreground mb-1" />
              <div className="w-5 h-0.5 bg-foreground" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 font-sans text-sm">
            {[
              ["Services", "services"],
              ["Gallery", "trending"],
              ["Tutorials", "tutorials"],
              ["Categories", "categories"],
              ["Trending", "trending"],
              ["Contact", "contact"],
            ].map(([label, target]) => (
              <button
                key={label}
                type="button"
                className="text-left hover:text-primary"
                onClick={() => {
                  scrollTo(target);
                  setMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.935 0.018 25)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-0"
          >
            <p className="font-sans text-xs font-medium tracking-widest uppercase text-primary mb-4">
              New Season Collection
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6">
              Discover Your
              <em className="block text-primary italic">Perfect Look</em>
            </h1>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-4 max-w-md">
              Explore curated beauty inspiration, tutorials, and trending looks
              crafted by top creators worldwide.
            </p>
            <p className="font-serif text-base font-semibold text-primary mb-6">
              Nitya Beauty Parlour
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                type="button"
                data-ocid="hero.primary_button"
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-sans font-medium shadow-card-hover transition-all"
                onClick={() => scrollTo("services")}
              >
                Our Services
              </Button>
              <Button
                type="button"
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10 px-8 font-sans font-medium"
                onClick={() => scrollTo("tutorials")}
              >
                Watch Tutorials
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-14">
              {[
                ["10k+", "Looks"],
                ["500+", "Tutorials"],
                ["50k+", "Community"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {n}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <img
              src="/assets/generated/hero-beauty.dim_800x900.jpg"
              alt="Beauty editorial portrait"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Home Visit Banner ─────────────────────────────────────────────────────────
function HomeVisitBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      data-ocid="services.panel"
      className="mb-10 rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.88 0.07 0) 0%, oklch(0.82 0.09 355) 50%, oklch(0.78 0.11 10) 100%)",
      }}
    >
      <div className="px-6 py-7 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: "oklch(1 0 0 / 0.3)" }}
        >
          <Home className="w-7 h-7" style={{ color: "oklch(0.35 0.06 10)" }} />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3
            className="font-serif text-xl sm:text-2xl font-bold leading-snug mb-1"
            style={{ color: "oklch(0.22 0.04 10)" }}
          >
            🏠 Ghar Pe Beauty Service — Home Visit Available!
          </h3>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: "oklch(0.35 0.04 10)" }}
          >
            Parlour visit ke saath-saath hum aapke ghar bhi aate hain — Makeup,
            Mehndi aur aur bhi services ghar par available hain.
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/919693204116"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="services.primary_button"
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "oklch(0.22 0.04 10)",
            color: "oklch(0.97 0.01 22)",
          }}
        >
          <MessageCircle className="w-4 h-4" />
          Book Home Visit
        </a>
      </div>
    </motion.div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20"
      style={{ backgroundColor: "oklch(0.935 0.018 25)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground flex items-center justify-center gap-2">
            Our Services
            <Sparkles className="w-6 h-6 text-primary" />
          </h2>
          <p className="font-sans text-muted-foreground mt-3">
            Beauty treatments & designer rentals — all under one roof
          </p>
        </motion.div>

        {/* Home Visit Banner */}
        <HomeVisitBanner />

        {/* Beauty Services */}
        <div className="mb-10">
          <motion.h3
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2"
          >
            <span className="w-1.5 h-6 rounded-full bg-primary inline-block" />
            Beauty Services
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {BEAUTY_SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  data-ocid={`services.item.${i + 1}`}
                  className="bg-card border border-border rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col gap-3"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-foreground leading-snug">
                    {svc.name}
                  </h4>
                  {svc.price && (
                    <span className="inline-flex items-center self-start px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 font-sans text-xs font-bold text-primary">
                      {svc.price}
                    </span>
                  )}
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                  <Button
                    type="button"
                    data-ocid={`services.button.${i + 1}`}
                    size="sm"
                    variant="outline"
                    className="mt-auto rounded-full border-primary text-primary hover:bg-primary/10 font-sans text-xs w-fit"
                    onClick={() => scrollTo("contact")}
                  >
                    Book Now
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Rental Services */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2"
          >
            <span className="w-1.5 h-6 rounded-full bg-amber-500 inline-block" />
            Designer Rentals
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RENTAL_SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  data-ocid={`services.rental.item.${i + 1}`}
                  className="bg-card border-2 border-amber-400 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-3 relative overflow-hidden"
                >
                  {/* Rent badge */}
                  <span className="absolute top-4 right-4">
                    <Badge className="bg-amber-100 text-amber-700 border border-amber-300 font-sans text-[10px] px-2 py-0.5 rounded-full">
                      On Rent
                    </Badge>
                  </span>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-foreground leading-snug pr-16">
                    {svc.name}
                  </h4>
                  {svc.price && (
                    <span className="inline-flex items-center self-start px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 font-sans text-xs font-bold text-amber-700">
                      {svc.price}
                    </span>
                  )}
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                  <Button
                    type="button"
                    data-ocid={`services.rental.button.${i + 1}`}
                    size="sm"
                    className="mt-auto rounded-full bg-amber-500 hover:bg-amber-600 text-white font-sans text-xs w-fit shadow-card-hover"
                    onClick={() => scrollTo("contact")}
                  >
                    Enquire Now
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground flex items-center justify-center gap-2">
            Explore by Category
            <Sparkles className="w-6 h-6 text-primary" />
          </h2>
          <p className="font-sans text-muted-foreground mt-3">
            Find inspiration across all areas of beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`categories.item.${i + 1}`}
              className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {cat.name}
                </h3>
                <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trending Looks ────────────────────────────────────────────────────────────
function TrendingSection() {
  const [page, setPage] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const { data: backendLooks, isLoading } = useGetAllLooks();
  const likeMutation = useLikeLook();

  const looks =
    backendLooks && backendLooks.length > 0 ? backendLooks : STATIC_LOOKS;
  const perPage = 8;
  const totalPages = Math.ceil(looks.length / perPage);
  const visible = looks.slice(page * perPage, page * perPage + perPage);

  const handleLike = (look: MakeupLook) => {
    const key = look.id.toString();
    if (likedIds.has(key)) return;
    setLikedIds((prev) => new Set([...prev, key]));
    likeMutation.mutate(look.id, {
      onError: () => {
        toast.error("Couldn't like this look.");
        setLikedIds((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      },
    });
  };

  return (
    <section
      id="trending"
      className="py-20"
      style={{ backgroundColor: "oklch(0.935 0.018 25)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Trending Looks &amp; Inspiration
            </h2>
            <p className="font-sans text-muted-foreground mt-2">
              Curated by our community
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              data-ocid="trending.pagination_prev"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-ocid="trending.pagination_next"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index
              <div key={i} data-ocid="trending.loading_state">
                <Skeleton className="aspect-[4/3] rounded-2xl" />
                <Skeleton className="h-4 mt-3 rounded" />
                <Skeleton className="h-3 mt-2 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((look, i) => {
              const imgSrc =
                LOOK_IMAGES[(Number(look.id) - 1) % LOOK_IMAGES.length];
              const liked = likedIds.has(look.id.toString());
              return (
                <motion.div
                  key={look.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                  data-ocid={`trending.item.${i + 1}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={look.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      data-ocid={`trending.toggle.${i + 1}`}
                      onClick={() => handleLike(look)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                        liked
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/70 text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                      aria-label="Like"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>
                  <div className="p-3.5">
                    <p className="font-serif text-sm font-semibold text-foreground line-clamp-1">
                      {look.title}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-sans text-xs text-muted-foreground">
                        {look.creator}
                      </span>
                      <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                        <Heart className="w-3 h-3 text-primary" />
                        {formatLikes(look.likes + BigInt(liked ? 1 : 0))}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {look.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 rounded-full font-sans bg-secondary text-secondary-foreground border-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {looks.length === 0 && !isLoading && (
          <div
            data-ocid="trending.empty_state"
            className="text-center py-16 text-muted-foreground font-sans"
          >
            No looks yet. Be the first to add one!
          </div>
        )}
      </div>
    </section>
  );
}

// ── Tutorials ─────────────────────────────────────────────────────────────────
function TutorialsSection() {
  const [tutPage, setTutPage] = useState(0);
  const { data: backendTutorials, isLoading } = useGetAllTutorials();

  const rawTutorials =
    backendTutorials && backendTutorials.length > 0 ? backendTutorials : [];
  const tutorials = STATIC_TUTORIALS.map((st, i) => ({
    ...st,
    ...(rawTutorials[i]
      ? { title: rawTutorials[i].title, duration: rawTutorials[i].duration }
      : {}),
  }));

  const perPage = 3;
  const totalPages = Math.ceil(tutorials.length / perPage);
  const visible = tutorials.slice(
    tutPage * perPage,
    tutPage * perPage + perPage,
  );

  return (
    <section id="tutorials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Video Tutorials: Learn the Art
            </h2>
            <p className="font-sans text-muted-foreground mt-2">
              Step-by-step guides from master artists
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              data-ocid="tutorials.pagination_prev"
              onClick={() => setTutPage((p) => Math.max(0, p - 1))}
              disabled={tutPage === 0}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              data-ocid="tutorials.pagination_next"
              onClick={() => setTutPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={tutPage >= totalPages - 1}
              className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-40 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} data-ocid="tutorials.loading_state">
                <Skeleton className="aspect-video rounded-2xl" />
                <Skeleton className="h-4 mt-3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((tut, i) => (
              <motion.div
                key={tut.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`tutorials.item.${i + 1}`}
                className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={tut.image}
                    alt={tut.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-none text-xs font-sans">
                    {formatDuration(tut.duration)}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-foreground line-clamp-2 leading-snug">
                    {tut.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "oklch(0.935 0.018 25)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="font-sans text-muted-foreground mt-3">
            We&apos;d love to hear from you — reach out anytime!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl shadow-card p-8 flex flex-col items-center gap-5">
            {/* Logo */}
            <img
              src="/assets/generated/nitya-logo-transparent.dim_200x200.png"
              alt="Nitya Beauty Parlour"
              className="w-20 h-20 rounded-full object-cover"
            />

            {/* Business name */}
            <h3 className="font-serif text-2xl font-bold text-foreground text-center">
              Nitya Beauty Parlour
            </h3>

            {/* Address */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-sans text-sm">Vishwakarma Colony</span>
            </div>

            {/* Home Visit badge */}
            <div className="flex items-center gap-2 text-primary">
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="font-sans text-sm font-semibold">
                Home Visit Available
              </span>
            </div>

            <div className="w-full border-t border-border" />

            {/* Phone */}
            <div className="text-center">
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Phone / WhatsApp
              </p>
              <p className="font-serif text-3xl font-bold text-foreground tracking-wide">
                9693204116
              </p>
            </div>

            {/* Email */}
            <a
              href="mailto:lavtripathi4546@gmail.com"
              data-ocid="contact.link"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              lavtripathi4546@gmail.com
            </a>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                asChild
                data-ocid="contact.primary_button"
                className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-medium shadow-card-hover"
                size="lg"
              >
                <a
                  href="tel:9693204116"
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>

              <Button
                asChild
                data-ocid="contact.secondary_button"
                variant="outline"
                className="flex-1 rounded-full border-primary text-primary hover:bg-primary/10 font-sans font-medium"
                size="lg"
              >
                <a
                  href="https://wa.me/919693204116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  return (
    <footer
      className="py-10 px-4"
      style={{ backgroundColor: "oklch(0.44 0.05 15)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div
          className="flex flex-wrap gap-5 text-xs font-sans"
          style={{ color: "oklch(0.8 0.02 22)" }}
        >
          {["About", "Contact", "Terms", "Privacy"].map((l) => (
            <button
              key={l}
              type="button"
              data-ocid="footer.link"
              className="hover:text-white transition-colors"
              style={{ color: "oklch(0.8 0.02 22)" }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          {[
            { icon: Instagram, label: "Instagram" },
            { icon: Twitter, label: "Twitter" },
            { icon: Youtube, label: "YouTube" },
            { icon: Facebook, label: "Facebook" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="p-2 rounded-full transition-colors hover:opacity-80"
              style={{ color: "oklch(0.8 0.02 22)" }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p
            className="font-serif text-lg font-bold"
            style={{ color: "oklch(0.93 0.02 22)" }}
          >
            Nitya Beauty Parlour
          </p>
          <p
            className="font-sans text-[11px] mt-1"
            style={{ color: "oklch(0.68 0.02 22)" }}
          >
            &copy; {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CategoriesSection />
        <TrendingSection />
        <TutorialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
