import Image from "next/image";
import Link from "next/link";
import ReviewSlider from "./review-slider";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Phone,
  Presentation,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import styles from "./spoken-english-course.module.css";

const defaultReviews = [
  "Ooshas Prep helped me improve my spoken English and boost my confidence. Great learning experience!",
  "Ooshas Prep has made learning Spoken English easy and enjoyable. I feel more confident while speaking English now!",
  "Excellent Spoken English classes at Ooshas Prep! The teaching is easy to understand, and my communication skills have improved a lot.",
];

const defaultBenefits = [
  "Experienced & Certified Trainers – Learn from skilled instructors with practical teaching expertise.",
  "Personalised Learning Plans – Courses designed to match your goals, level, and learning pace.",
  "Practical Classroom Training – Improve fluency through conversations, activities, and real-life speaking practice.",
  "One Lakh+ Students Trained Since 1997 – Trusted by learners for quality English education.",
  "Online & Offline Learning Options – Flexible classes that fit your schedule and learning style.",
  "Cambridge University Press Content – Learn with internationally trusted English learning material.",
];

const defaultComparison = [
  { feature: "Class Type", individual: "Live 1:1 Classes", traditional: "Group Classes" },
  { feature: "Speaking Time", individual: "60–70% Speaking Time", traditional: "9–90% Speaking Time" },
  { feature: "Feedback", individual: "Instant Feedback", traditional: "Delayed Feedback" },
  { feature: "Flexibility", individual: "Flexible Scheduling", traditional: "Fixed Timings" },
  { feature: "Practice", individual: "Real Conversations", traditional: "Theory-Based Learning" },
  { feature: "Class Mode", individual: "100% Online", traditional: "Travel Required" },
  { feature: "Learning Module", individual: "Personalized Learning", traditional: "Same for Everyone" },
];

const stepIcons = [Phone, CalendarDays, Presentation, UsersRound];
const defaultSteps = [
  { title: "Contact Us", detail: "Call or fill out the form on our website to get started." },
  { title: "Schedule a Demo", detail: "Attend a free demo class to experience our teaching methods." },
  { title: "Choose your course", detail: "Select the course that matches your goals." },
  { title: "Begin Learning", detail: "Start your journey toward fluency with expert guidance." },
];

const defaultLearningPoints = [
  {
    title: "Daily Conversation Skills",
    detail: "Learn to speak naturally in everyday situations, from greetings and travel to social and work talks.",
  },
  {
    title: "English Grammar",
    detail: "Master grammar through interactive speaking activities, not rote learning, so you speak correctly without overthinking.",
  },
  {
    title: "Vocabulary for Everyday Use",
    detail: "Build a strong vocabulary with useful words and phrases for daily, academic, and professional communication.",
  },
  {
    title: "Pronunciation & Accent Improvement",
    detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises.",
  },
  {
    title: "Fluency & Confidence Building",
    detail: "Enhance clarity and confidence with guided pronunciation practice and voice modulation exercises.",
  },
  {
    title: "Real-Life Practice Session",
    detail: "Use English in lifelike situations like interviews, discussions, and everyday conversations that prepare you for the real world.",
  },
];

export default function SpokenEnglishTemplate({ pageInfo }: { pageInfo?: any }) {
  const fields = (section: string) => pageInfo?.sections?.[section]?.fields || {};
  const value = (section: string, name: string, fallback: string) =>
    fields(section)[name] || fallback;
  const items = <T,>(section: string, name: string, fallback: T[]): T[] => {
    const result = fields(section)[name];
    return Array.isArray(result) && result.length ? result : fallback;
  };

  const reviews = items("reviews", "items", defaultReviews.map((text) => ({ text, rating: "5" })));
  const benefits = items("why-choose-us", "items", defaultBenefits.map((text) => ({ text })));
  const comparison = items("comparison", "items", defaultComparison);
  const steps = items("course-process", "items", defaultSteps);
  const learningPoints = items("learning", "items", defaultLearningPoints);
  const classItems = items("classes", "items", [
    { title: "Best English Speaking Course in Delhi", description: "Oxford School of English offers one of the best English speaking courses in Delhi for beginners, students, working professionals, and job seekers. Our English course improves grammar, vocabulary, pronunciation, fluency, and communication skills through practical classroom training and personalised learning. We provide both online and offline English speaking classes to suit every learner’s schedule." },
    { title: "English Speaking Classes with Practical Learning", description: "Looking for an English speaking course near me? Our interactive classes focus on real-life communication through conversations, role-plays, presentations, group discussions, and speaking activities. With continuous trainer guidance and personalised feedback, students develop the confidence to communicate effectively in interviews, workplaces, business meetings, and everyday situations." },
    { title: "More Than an English Course", description: "Along with our English speaking course, we also offer IELTS, PTE, TOEIC, and Personality Development classes under one roof. Since 1997, Oxford School of English has trained more than One Lakh students using Cambridge University Press content, experienced trainers, smart classrooms, and personalised coaching through both online and offline learning." },
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroArt}>
          <Image
            src={value("hero", "image", "/spoken-english/hero.webp")}
            alt={value("hero", "imageAlt", "A student reading and enjoying a book")}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className={styles.heroImage}
          />
        </div>
        <div className={`${styles.heroInner} ${styles.container}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title">
              {value("hero", "title", "English Speaking Course")}
              <span>{value("hero", "subtitle", "Ooshas Prep Spoken Curriculum")}</span>
            </h1>
            <p className={styles.heroMeta}>{value("hero", "deliveryModes", "Classroom | Online | Personalised")}</p>
            <p className={styles.heroMeta}>{value("hero", "examTypes", "English | IELTS | PTE | PD | Competitive")}</p>
            <Link className={styles.primaryButton} href={value("hero", "buttonUrl", "#start-learning")}>
              {value("hero", "buttonText", "Start Spoken English Test")} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.reviews} ${styles.container}`} aria-labelledby="reviews-title">
        <h2 id="reviews-title"><span>{value("reviews", "title", "Student Reviews")}</span> &amp; {value("reviews", "suffix", "Google Rating")}</h2>
        <ReviewSlider reviews={reviews} />
      </section>

      <section className={styles.growth} aria-labelledby="growth-title">
        <div className={`${styles.growthInner} ${styles.container}`}>
          <div className={styles.growthCopy}>
            <h2 id="growth-title">{value("classes", "titleLead", "English Speaking ")}<span>{value("classes", "titleAccent", "Classes for Career Growth")}</span></h2>
            {classItems.map((item: any, index) => (
              <div key={`${item.title}-${index}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
            <Link className={styles.darkButton} href={value("classes", "buttonUrl", "#start-learning")}>{value("classes", "buttonText", "Start Spoken English Test")}</Link>
          </div>
          <div className={styles.verticalWord} aria-hidden="true">ENGLISH</div>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-title">
        <div className={`${styles.whyInner} ${styles.container}`}>
          <div className={styles.whyHeading}>
            <Image src={value("why-choose-us", "image", "/spoken-english/why-choose-us.webp")} alt={value("why-choose-us", "imageAlt", "A bright idea light bulb")} width={360} height={400} sizes="(max-width: 760px) 40vw, 280px" />
            <h2 id="why-title">{value("why-choose-us", "title", "WHY\nCHOOSE\nUS?").split("\n").map((line: string, index: number) => <span key={index}>{line}<br /></span>)}</h2>
          </div>
          <ul className={styles.benefitList}>
            {benefits.map((benefit: any, index: number) => (
              <li key={`${benefit.text || benefit}-${index}`}><Check size={18} strokeWidth={2.5} /><span>{benefit.text || benefit}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.comparisonSection} ${styles.container}`} aria-labelledby="comparison-title">
        <h2 id="comparison-title"><span>{value("comparison", "titleLead", "Speaking Fever")}</span> {value("comparison", "titleConnector", "vs")} {value("comparison", "titleTail", "Traditional English Classes")}</h2>
        <div className={styles.comparisonGrid}>
          <div className={`${styles.comparisonCard} ${styles.featureCard}`}>
            <h3>{value("comparison", "featureHeading", "Features")}</h3>
            {comparison.map((row: any, index: number) => <p key={`${row.feature}-${index}`}>{row.feature}</p>)}
          </div>
          <div className={`${styles.comparisonCard} ${styles.speakingCard}`}>
            <h3>{value("comparison", "individualHeading", "Speaking Fever 1:1")}</h3>
            {comparison.map((row: any, i: number) => <p key={i}><Check size={15} />{row.individual}</p>)}
          </div>
          <div className={`${styles.comparisonCard} ${styles.traditionalCard}`}>
            <h3>{value("comparison", "traditionalHeading", "Traditional Classes")}</h3>
            {comparison.map((row: any, i: number) => <p key={i}><X size={15} />{row.traditional}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.processInner}`}>
          <h2 id="process-title">{value("course-process", "titleLead", "How Our Online ")}<span>{value("course-process", "titleAccent", "English Speaking Course")}</span> {value("course-process", "titleTail", "Works?")}</h2>
          <div className={styles.stepGrid}>
            {steps.map(({ title, detail }: any, index: number) => {
              const Icon = stepIcons[index % stepIcons.length];
              return <article className={styles.step} key={`${title}-${index}`}>
                <div className={styles.stepIcon}><Icon size={27} strokeWidth={1.8} /></div>
                {index < steps.length - 1 && <span className={styles.stepArrow} aria-hidden="true">»</span>}
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.learn} ${styles.container}`} aria-labelledby="learn-title">
        <h2 id="learn-title"><span>{value("learning", "titleLead", "What")}</span> {value("learning", "titleTail", "You’ll Learn")}</h2>
        <div className={styles.learnLayout}>
          <div className={styles.learnColumn}>
            {learningPoints.slice(0, 3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
          <div className={styles.learnArt}>
            <Image src={value("learning", "image", "/spoken-english/what-you-learn.webp")} alt={value("learning", "imageAlt", "Illustration of communication and learning skills")} fill sizes="(max-width: 760px) 80vw, 32vw" />
          </div>
          <div className={styles.learnColumn}>
            {learningPoints.slice(3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.cta} ${styles.container}`} id="start-learning" aria-labelledby="cta-title">
        <div className={styles.ctaCopy}>
          <span className={styles.ctaPill}><Sparkles size={13} /> {value("final-cta", "eyebrow", "New Spoken English Test")}</span>
          <h2 id="cta-title">{value("final-cta", "title", "Start Your Spoken English Test")}</h2>
          <p>{value("final-cta", "subtitle", "Prep Your Journey with Ooshas Prep")}</p>
          <Link className={styles.primaryButton} href={value("final-cta", "buttonUrl", "/contact")}>{value("final-cta", "buttonText", "Start Spoken English Test")} <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.ctaImage}>
          <Image src={value("final-cta", "image", "/spoken-english/students.webp")} alt={value("final-cta", "imageAlt", "Students learning English together")} fill sizes="(max-width: 760px) 100vw, 45vw" />
        </div>
      </section>
    </main>
  );
}

function LearningPoint({ title, detail }: { title: string; detail: string }) {
  return (
    <article className={styles.learningPoint}>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}
