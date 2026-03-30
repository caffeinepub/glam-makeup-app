import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  ChevronRight,
  Heart,
  Home,
  MessageCircle,
  Phone,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type CategoryId =
  | "job"
  | "gharelu-hinsa"
  | "budhape-ki-madad"
  | "parent-care-service"
  | "maternity"
  | "relation"
  | "health"
  | "skin-health"
  | "legal"
  | "education"
  | "government"
  | "skill-training"
  | "job-apply";

interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  solutions: Solution[];
  showExpertContact: boolean;
}

interface Solution {
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

interface HelplineEntry {
  name: string;
  number: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const HELPLINES: HelplineEntry[] = [
  {
    name: "Women Helpline",
    number: "181",
    description: "Mahilaon ke liye rashtriya helpline — 24/7 uplabdh",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Police Helpline",
    number: "100",
    description: "Turant sahayata ke liye police ko call karein",
    icon: ShieldAlert,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    name: "National Emergency",
    number: "112",
    description: "Kisi bhi aapatstiti mein turant madad",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    name: "Childline",
    number: "1098",
    description: "Bachon aur maon ke liye sahayata",
    icon: Heart,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const EXPERT_PHONE = "8510995142";
const EXPERT_WA = `https://wa.me/91${EXPERT_PHONE}`;

const CATEGORIES: Category[] = [
  {
    id: "job",
    title: "Naukri / Job",
    subtitle: "Rozgaar aur Career",
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    description:
      "Job dhundhne mein madad, resume banana, interview tips aur career guidance.",
    showExpertContact: true,
    solutions: [
      {
        title: "Government Job Portals",
        description: "Sarkari naukri ke liye NCS portal par register karein",
        link: "https://www.ncs.gov.in",
        linkLabel: "NCS Portal Kholein",
      },
      {
        title: "MGNREGA Yojana",
        description:
          "100 din ke guaranteed rojgar ke liye MGNREGA mein register karein.",
      },
      {
        title: "Skill India Mission",
        description:
          "Free skill training ke liye Pradhan Mantri Kaushal Vikas Yojana join karein.",
        link: "https://www.pmkvyofficial.org",
        linkLabel: "PMKVY Portal",
      },
      {
        title: "Women Entrepreneurship",
        description:
          "Khud ka business shuru karne ke liye Mudra Loan lein — bina guarantor ke.",
      },
    ],
  },
  {
    id: "gharelu-hinsa",
    title: "Gharelu Hinsa",
    subtitle: "Domestic Violence",
    icon: ShieldAlert,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    description:
      "Gharelu hinsa se bachav, kanuni adhikar aur madad ke liye sampark karein.",
    showExpertContact: true,
    solutions: [
      {
        title: "Women Helpline 181",
        description:
          "Turant madad ke liye Women Helpline par call karein — bilkul muft, 24 ghante.",
      },
      {
        title: "Protection Officer",
        description:
          "Apne jile ke Protection Officer se milein — ye kanuni madad dene ke liye niyukt hain.",
      },
      {
        title: "Domestic Violence Act 2005",
        description:
          "Ghar mein hone wali hinsa ke khilaf court se protection order lein.",
      },
      {
        title: "Shelter Home",
        description:
          "Surakshit jagah ke liye apne shahar ke Shelter Home (Nari Niketan) se sampark karein.",
      },
    ],
  },
  {
    id: "budhape-ki-madad",
    title: "Budhapa Sahara — Elderly Help",
    subtitle: "Beta-Bahu Ghar Se Nikal Rahe Hain?",
    icon: Users,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    description:
      "Budhape mein bete ya bahu ghar se nikal rahein hain ya dhyan nahi rakh rahe? Aapke kanuni adhikar hain — sahara lein, akela mat rahein.",
    showExpertContact: true,
    solutions: [
      {
        title: "Maintenance and Welfare of Parents Act 2007",
        description:
          "Kanoon ke anusaar bete-beti par maata-pita ka poshan karna ZAROORI hai. Agar nahi karte to court se maintenance order liya ja sakta hai.",
      },
      {
        title: "Senior Citizen Helpline — 14567",
        description:
          "Elder abuse ya sahara na milne par rashtriya senior citizen helpline 14567 par call karein — bilkul muft.",
        link: "tel:14567",
        linkLabel: "14567 Par Call Karein",
      },
      {
        title: "Ghar Se Nikaala Ja Raha Hai?",
        description:
          "Apne hi ghar se nikaala ja raha hai? SDM ya District Magistrate ke paas complaint karein — turant sahayata milegi.",
      },
      {
        title: "Old Age Home / Shelter",
        description:
          "Agar ghar mein suraksha nahi hai to sarkari ya NGO ke Old Age Home mein rehne ki suvidha mil sakti hai.",
      },
      {
        title: "WhatsApp Par Madad Lein",
        description:
          "Agar koi baat nahi sunna chahta — WhatsApp par apni baat karein, hum sahi raasta dikhayenge.",
      },
    ],
  },
  {
    id: "parent-care-service",
    title: "Maa-Baap Ki Sewa — Care Service",
    subtitle: "Job ki wajah se sewa nahi kar pa rahe? Hum karenge",
    icon: Home,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
    description:
      "Agar aap naukri ya kaam ki wajah se apne maa-baap ya saas-sasur ki sewa nahi kar pa rahe hain, to hum unka dhyan rakhenge — room, khana-peena aur poori sewa hamare saath.",
    showExpertContact: true,
    solutions: [
      {
        title: "Kya Milega Is Service Mein?",
        description:
          "Maa-baap ko rehne ke liye surakshit room, teen waqt ka ghar jaisa khana, dawai ka dhyan, aur caring companion — sab ek jagah.",
      },
      {
        title: "Har Mahine Ka Kharcha",
        description:
          "Monthly fee mein room, khana-peena aur poori dekhbhal shamil hai. Neeche WhatsApp button dabayein aur fees/rate poochein.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20mujhe%20Maa-Baap%20Ki%20Sewa%20ki%20monthly%20fees%20aur%20rate%20jaanna%20hai.",
        linkLabel: "Fees/Rate WhatsApp Par Poochein",
      },
      {
        title: "Kaise Register Karein?",
        description:
          "Neeche WhatsApp button dabayein, apne maa-baap ka naam, umar aur zaroorat batayein — hum aapko poori jaankari denge.",
      },
      {
        title: "Surakshit Aur Bharosemand",
        description:
          "Aapke maa-baap aapke parivaar ki tarah hain — poori izzat aur pyaar ke saath dekhbhal ki jaati hai.",
      },
    ],
  },
  {
    id: "maternity",
    title: "Maatritv / Ma Banana",
    subtitle: "Maternity & Motherhood",
    icon: Heart,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    description:
      "Maa banne mein mushkil, fertility support, pradhan mantri matritva yojana aur sahayata.",
    showExpertContact: true,
    solutions: [
      {
        title: "Pradhan Mantri Matru Vandana Yojana",
        description:
          "Pehle bachche ke liye ₹5,000 ki sahayata sarkar se — aanganwadi se apply karein.",
      },
      {
        title: "Janani Suraksha Yojana",
        description:
          "Sarkari aspatal mein prasav par nakit sahayata aur muft delivery.",
      },
      {
        title: "Fertility Counseling",
        description:
          "Maa na ban pa rahi hain? Expert se baat karein — bahut se samadhan uplabdh hain.",
      },
      {
        title: "Poshan Abhiyan",
        description:
          "Garbhwati aur dudh pilane wali maon ke liye muft poshan sahayata.",
      },
    ],
  },
  {
    id: "relation",
    title: "Rishta / Relation Problem",
    subtitle: "Husband, Bachche, Parivaar",
    icon: Heart,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/20",
    description:
      "Pati se takraar, bachche baat nahi sunta, parivaar mein tanav — in sabka samadhan WhatsApp par counselor se baat karke dhundhein.",
    showExpertContact: true,
    solutions: [
      {
        title: "Pati-Patni Mein Takraar",
        description:
          "Ghar mein jhagde, samjhauta na hona — ek experienced counselor se baat karein aur relationship behtar banayein.",
      },
      {
        title: "Bachche Baat Nahi Sunta",
        description:
          "Bachche padhai nahi karte, gusse mein hain ya mobile mein rehte hain — parenting expert se guidance lein.",
      },
      {
        title: "Saas-Bahu Ya Parivaar Ki Takraar",
        description:
          "Ghar mein bade ya chhotoon se tanaav — neutral counselor se baat karke raasta dhundhein.",
      },
      {
        title: "Akelapan / Depression",
        description:
          "Ghar mein akela mehsoos karna, koi samajhne wala nahi — mental health expert se WhatsApp par baat karein.",
      },
      {
        title: "Talaaq Ya Alag Hone Ka Dar",
        description:
          "Rishta toot raha hai? Pehle counseling try karein — bahut se cases mein samadhan milta hai bina talaaq ke.",
      },
    ],
  },
  {
    id: "health",
    title: "Swasthya / Health",
    subtitle: "Mahila Swasthya",
    icon: Sparkles,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    description:
      "Mahilaon ke liye swasthya yojanayen, muft ilaj aur sehat ki jaankari.",
    showExpertContact: false,
    solutions: [
      {
        title: "Ayushman Bharat Yojana",
        description:
          "₹5 lakh tak ka muft ilaaj sarkari aur empanelled hospitals mein.",
      },
      {
        title: "Beti Bachao Beti Padhao",
        description: "Beti ke janm aur sehat ke liye sarkari sahayata.",
      },
      {
        title: "ASHA Workers",
        description:
          "Apne mohalle ki ASHA worker se muft swasthya sewa praapt karein.",
      },
    ],
  },
  {
    id: "skin-health",
    title: "Skin, Hair & Period Problem",
    subtitle: "Pimple, Hairfall, Periods — Gharelu Upaye",
    icon: Sparkles,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    description:
      "Pimple, hairfall ya period ki problem? WhatsApp par gharelu upaye poochein — koi side effect nahi, bilkul natural solution.",
    showExpertContact: true,
    solutions: [
      {
        title: "Pimple / Muhase Ki Samasya",
        description:
          "Chehre par pimple bar bar aa rahe hain? Haldi, neem, multani mitti jaise gharelu nuskhe se kaise theek karein — WhatsApp par poochein.",
      },
      {
        title: "Hairfall / Baalon Ka Jhadna",
        description:
          "Baal bahut jhad rahe hain? Coconut oil, amla, methi ke beej — natural tarike se baalon ko majboot banayein.",
      },
      {
        title: "Period / Maahwari Ki Takleef",
        description:
          "Periods mein dard, der se aana, ya band ho jaana — ajwain, aloe vera, kala til jaise gharelu upaye bina side effect ke.",
      },
      {
        title: "Periods Irregular Hain",
        description:
          "Kabhi jaldi kabhi der se periods? Diet aur gharelu nuskhe se cycle regular karne ke tarike poochein.",
      },
      {
        title: "Skin Dry Ya Oily Hai",
        description:
          "Dry skin ke liye malai-honey ya oily skin ke liye besan-nimbu — apni skin type ke liye natural upaye jaanein.",
      },
    ],
  },
  {
    id: "legal",
    title: "Kanuni Adhikar",
    subtitle: "Legal Rights",
    icon: BookOpen,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    description:
      "Mahilaon ke kanuni adhikar, muft vakil aur nyay pane ke tarike.",
    showExpertContact: false,
    solutions: [
      {
        title: "National Legal Services Authority",
        description: "Muft kanuni madad ke liye NALSA se sampark karein.",
        link: "https://nalsa.gov.in",
        linkLabel: "NALSA Website",
      },
      {
        title: "Mahila Aayog",
        description:
          "National Commission for Women — shikayat online darz karein.",
        link: "https://ncw.nic.in",
        linkLabel: "NCW Portal",
      },
      {
        title: "Cybercrime Report",
        description:
          "Online harassment ya fraud ke liye Cybercrime Portal par report karein.",
        link: "https://cybercrime.gov.in",
        linkLabel: "Report Karein",
      },
    ],
  },
  {
    id: "education",
    title: "Shiksha / Education",
    subtitle: "Padhai aur Scholarship",
    icon: Star,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
    description:
      "Ladkiyon aur mahilaon ke liye scholarship, muft coaching aur padhai ke avsar.",
    showExpertContact: false,
    solutions: [
      {
        title: "Beti Bachao Beti Padhao",
        description:
          "Beti ki padhai ke liye government scholarship aur support.",
      },
      {
        title: "National Scholarship Portal",
        description: "Scholarship ke liye NSP par apply karein.",
        link: "https://scholarships.gov.in",
        linkLabel: "Apply Karein",
      },
      {
        title: "Kasturba Gandhi Balika Vidyalaya",
        description:
          "Rural areas mein ladkiyon ke liye free residential school.",
      },
    ],
  },
  {
    id: "skill-training",
    title: "Skill Sikhein",
    subtitle: "Beauty Parlour, Computer, Tailoring & More",
    icon: Sparkles,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
    description:
      "Ghar baithe ya centre pe alag-alag skills seekhein — bilkul free ya subsidised training.",
    showExpertContact: true,
    solutions: [
      {
        title: "Beauty Parlour Training",
        description:
          "Makeup, facial, threading, mehndi — professional beauty parlour course join karein aur khud ka kaam shuru karein.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20Beauty%20Parlour%20Training%20ki%20fees%20aur%20details%20jaanna%20hai.",
        linkLabel: "Fees Poochein — WhatsApp",
      },
      {
        title: "Computer Basics & Typing",
        description:
          "Basic computer, MS Office, internet, typing — sarkari naukri ke liye zaroori skills seekhein.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20Computer%20Training%20ki%20fees%20aur%20details%20jaanna%20hai.",
        linkLabel: "Fees Poochein — WhatsApp",
      },
      {
        title: "Tailoring & Stitching",
        description:
          "Kapde silna seekhein, ghar se business shuru karein. Free stitching classes uplabdh hain.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20Tailoring%20Training%20ki%20fees%20aur%20details%20jaanna%20hai.",
        linkLabel: "Fees Poochein — WhatsApp",
      },
      {
        title: "Mehendi & Art",
        description:
          "Mehendi design seekhein aur shaadi-functions mein kaam karke kamaai karein.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20Mehendi%20Training%20ki%20fees%20aur%20details%20jaanna%20hai.",
        linkLabel: "Fees Poochein — WhatsApp",
      },
      {
        title: "Cooking & Catering",
        description:
          "Tiffin service ya catering business shuru karein — cooking training ke liye sampark karein.",
        link: "https://wa.me/918510995142?text=Namaste%2C%20Cooking%20Training%20ki%20fees%20aur%20details%20jaanna%20hai.",
        linkLabel: "Fees Poochein — WhatsApp",
      },
    ],
  },
  {
    id: "job-apply",
    title: "Kaam Ke Liye Apply Karein",
    subtitle: "Maid, Baby Care, Cook, Helper",
    icon: Home,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    description:
      "Ghar ka kaam, baby care, cooking ya helper job ke liye apply karein — apni city mein kaam dhundhein.",
    showExpertContact: true,
    solutions: [
      {
        title: "Ghar Ka Kaam (Maid)",
        description:
          "Safai, bartan, kapde — part-time ya full-time ghar ka kaam dhundhne mein madad milegi.",
      },
      {
        title: "Baby Care / Nanny",
        description:
          "Chote bachon ki dekhbhal ke liye nanny ka kaam dhundhein — achhi salary aur safe environment.",
      },
      {
        title: "Cook / Khana Banana",
        description:
          "Ghar mein khana pakane ka kaam dhundhein — ek ya zyada gharon mein kaam kar sakti hain.",
      },
      {
        title: "Helper / Peon Work",
        description:
          "Office ya ghar mein helper ki job ke liye apply karein — experience ki zaroorat nahi.",
      },
      {
        title: "Creche / Daycare Helper",
        description:
          "Crèche ya school mein bachon ki dekhbhal ka kaam — zyada jagah par demand hai.",
      },
    ],
  },
  {
    id: "government",
    title: "Sarkari Yojana",
    subtitle: "Government Schemes",
    icon: Users,
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
    borderColor: "border-border",
    description:
      "Mahilaon ke liye sabhi pramukh sarkari yojanaon ki jaankari ek jagah.",
    showExpertContact: false,
    solutions: [
      {
        title: "PM Ujjwala Yojana",
        description: "BPL parivaaron ko muft LPG connection.",
      },
      {
        title: "Sukanya Samriddhi Yojana",
        description: "Beti ke bhavishya ke liye high-interest savings scheme.",
      },
      {
        title: "Women SHG — Self Help Groups",
        description:
          "Apne gaon ya mohalle mein Self Help Group join karein aur loan lein.",
      },
      {
        title: "Jan Dhan Yojana",
        description:
          "Bank account khulwayein aur direct benefit transfer lein.",
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Expert Contact Card ───────────────────────────────────────────────────────
function ExpertContactCard() {
  return (
    <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Phone className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-sans font-bold text-foreground text-sm">
            Expert Se Baat Karein
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Hamara counselor aapki madad karega
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          asChild
          data-ocid="expert.primary_button"
          className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold shadow-card-hover"
          size="sm"
        >
          <a
            href={`tel:${EXPERT_PHONE}`}
            className="flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {EXPERT_PHONE} — Call Now
          </a>
        </Button>
        <Button
          asChild
          data-ocid="expert.secondary_button"
          variant="outline"
          className="flex-1 rounded-full border-success text-success hover:bg-success/10 font-sans font-semibold"
          size="sm"
        >
          <a
            href={EXPERT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Karein
          </a>
        </Button>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur border-b border-border shadow-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 h-16">
        {/* Logo */}
        <div
          className="flex items-center gap-2 flex-shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/wps-logo-transparent.dim_200x200.png"
            alt="WPS"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold text-primary leading-none">
              WPS
            </span>
            <p className="font-sans text-[10px] text-muted-foreground leading-none">
              Women Problem Solve
            </p>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="search.input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Apni problem search karein..."
              className="pl-9 pr-4 rounded-full bg-muted border-border font-sans text-sm"
            />
          </div>
        </form>

        {/* Emergency */}
        <Button
          asChild
          data-ocid="nav.primary_button"
          size="sm"
          className="flex-shrink-0 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-sans font-semibold text-xs shadow-card"
        >
          <a href="tel:181" className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Helpline</span> 181
          </a>
        </Button>
      </div>
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="py-16 sm:py-24 text-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.92 0.04 290) 0%, oklch(0.97 0.01 285) 50%, oklch(0.93 0.03 195) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src="/assets/generated/wps-logo-transparent.dim_200x200.png"
              alt="WPS Logo"
              className="w-20 h-20 rounded-full object-cover shadow-card"
            />
          </div>
          <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 font-sans text-xs px-3 py-1 rounded-full">
            महिला सशक्तिकरण — Women Empowerment
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4">
            Apni Problem Ka{" "}
            <span className="text-primary italic">Samadhan</span> Yahan Milega
          </h1>
          <p className="font-sans text-muted-foreground text-lg mb-8 leading-relaxed">
            Job, gharelu hinsa, swasthya, shiksha — har mushkil mein hum aapke
            saath hain.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold shadow-card-hover px-8"
              onClick={() => scrollTo("categories")}
            >
              <Search className="w-4 h-4 mr-2" />
              Problem Dhundhein
            </Button>
            <Button
              asChild
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="rounded-full border-destructive text-destructive hover:bg-destructive/10 font-sans font-semibold px-8"
            >
              <a href="tel:181" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Emergency: 181
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Helplines Section ─────────────────────────────────────────────────────────
function HelplinesSection() {
  return (
    <section id="helplines" className="py-14 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <Phone className="w-6 h-6 text-destructive" />
            Zaruri Helpline Numbers
          </h2>
          <p className="font-sans text-muted-foreground mt-2 text-sm">
            Kisi bhi aapatstiti mein turant call karein — sab muft hain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HELPLINES.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.a
                key={h.number}
                href={`tel:${h.number}`}
                data-ocid={`helplines.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full ${h.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-7 h-7 ${h.color}`} />
                </div>
                <div>
                  <p className={`font-serif text-3xl font-bold ${h.color}`}>
                    {h.number}
                  </p>
                  <p className="font-sans text-sm font-semibold text-foreground mt-0.5">
                    {h.name}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                    {h.description}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 font-sans text-xs font-semibold ${h.color} group-hover:underline`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  expanded,
  onToggle,
}: { cat: Category; expanded: boolean; onToggle: () => void }) {
  const Icon = cat.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-card border rounded-2xl shadow-card overflow-hidden transition-all duration-300 ${
        expanded
          ? "border-primary/40 shadow-card-hover"
          : "border-border hover:shadow-card-hover hover:-translate-y-0.5"
      }`}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full p-5 flex items-center gap-4 text-left group"
        onClick={onToggle}
      >
        <div
          className={`w-12 h-12 rounded-2xl ${cat.bgColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-6 h-6 ${cat.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
            {cat.title}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-0.5">
            {cat.subtitle}
          </p>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
        />
      </button>

      {/* Expanded Content */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5 border-t border-border"
        >
          <p className="font-sans text-sm text-muted-foreground mt-4 mb-4 leading-relaxed">
            {cat.description}
          </p>

          <div className="flex flex-col gap-3">
            {cat.solutions.map((sol) => (
              <div
                key={sol.title}
                className={`rounded-xl border ${cat.borderColor} bg-muted/40 p-4`}
              >
                <p className="font-sans text-sm font-semibold text-foreground mb-1">
                  {sol.title}
                </p>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {sol.description}
                </p>
                {sol.link && (
                  <a
                    href={sol.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 mt-2 font-sans text-xs font-semibold ${cat.color} hover:underline`}
                  >
                    {sol.linkLabel} <ChevronRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Expert Contact for specific categories */}
          {cat.showExpertContact && <ExpertContactCard />}
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection({ filter }: { filter: string }) {
  const [expandedId, setExpandedId] = useState<CategoryId | null>(null);

  const filtered = filter
    ? CATEGORIES.filter(
        (c) =>
          c.title.toLowerCase().includes(filter.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(filter.toLowerCase()) ||
          c.description.toLowerCase().includes(filter.toLowerCase()) ||
          c.solutions.some(
            (s) =>
              s.title.toLowerCase().includes(filter.toLowerCase()) ||
              s.description.toLowerCase().includes(filter.toLowerCase()),
          ),
      )
    : CATEGORIES;

  return (
    <section
      id="categories"
      className="py-14"
      style={{ backgroundColor: "oklch(0.965 0.012 285)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Apni Problem Category Chunein
          </h2>
          <p className="font-sans text-muted-foreground mt-2 text-sm">
            Category tap karein aur solution paayein
          </p>
        </motion.div>

        {filter && (
          <div className="mb-6 flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary border border-primary/20 font-sans text-xs">
              Search: &quot;{filter}&quot;
            </Badge>
            <span className="font-sans text-xs text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} mile
            </span>
          </div>
        )}

        {filtered.length === 0 ? (
          <div data-ocid="categories.empty_state" className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-sans text-muted-foreground">
              Koi result nahi mila. Doosra search karein.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                expanded={expandedId === cat.id}
                onToggle={() =>
                  setExpandedId(expandedId === cat.id ? null : cat.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="py-14 bg-background">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Humse Sampark Karein
          </h2>
          <p className="font-sans text-muted-foreground mt-2 text-sm">
            Kisi bhi problem mein hum aapke saath hain
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl shadow-card p-8 flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground text-center">
            WPS — Women Problem Solve
          </h3>
          <p className="font-sans text-sm text-muted-foreground text-center leading-relaxed">
            Job, gharelu hinsa, maternity ya koi bhi mahila sambandhit problem —
            hum sunenge aur madad karenge.
          </p>

          <div className="w-full border-t border-border" />

          <div className="text-center">
            <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Hamara Number
            </p>
            <p className="font-serif text-3xl font-bold text-foreground">
              {EXPERT_PHONE}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              asChild
              data-ocid="contact.primary_button"
              className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold shadow-card-hover"
              size="lg"
            >
              <a
                href={`tel:${EXPERT_PHONE}`}
                className="flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Karein
              </a>
            </Button>
            <Button
              asChild
              data-ocid="contact.secondary_button"
              variant="outline"
              className="flex-1 rounded-full border-success text-success hover:bg-success/10 font-sans font-semibold"
              size="lg"
            >
              <a
                href={EXPERT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* All helpline numbers */}
          <div className="w-full bg-muted/50 rounded-xl p-4">
            <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Rashtriya Helplines
            </p>
            <div className="grid grid-cols-2 gap-2">
              {HELPLINES.map((h) => (
                <a
                  key={h.number}
                  href={`tel:${h.number}`}
                  className={`flex items-center gap-2 p-2 rounded-lg ${h.bgColor} hover:opacity-80 transition-opacity`}
                >
                  <span className={`font-serif text-lg font-bold ${h.color}`}>
                    {h.number}
                  </span>
                  <span className="font-sans text-xs text-foreground leading-tight">
                    {h.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Floating WhatsApp ─────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href={EXPERT_WA}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating.primary_button"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-success rounded-full flex items-center justify-center shadow-card-hover hover:scale-110 transition-transform duration-200"
      aria-label="WhatsApp pe sampark karein"
    >
      <MessageCircle className="w-7 h-7 text-success-foreground" />
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-8 border-t border-border"
      style={{ backgroundColor: "oklch(0.22 0.05 290)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img
            src="/assets/generated/wps-logo-transparent.dim_200x200.png"
            alt="WPS"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-serif text-lg font-bold text-white">
            WPS — Women Problem Solve
          </span>
        </div>
        <p className="font-sans text-xs text-white/60 mb-1">
          Mahilaon ki har mushkil ka samadhan — Job, Gharelu Hinsa, Maternity,
          Legal Help
        </p>
        <p className="font-sans text-xs text-white/40">
          © {year} WPS — Women Problem Solve
        </p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar onSearch={setSearchFilter} />
      <main className="flex-1">
        <HeroSection />
        <HelplinesSection />
        <CategoriesSection filter={searchFilter} />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
