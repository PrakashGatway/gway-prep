import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "English Speaking Course | Ooshas Prep",
  description:
    "Build fluency and confidence with practical English speaking classes from Ooshas Prep. Learn online or in the classroom with personalized guidance.",
};

const reviews = [
  "Ooshas Prep helped me improve my spoken English and boost my confidence. Great learning experience!",
  "Ooshas Prep has made learning Spoken English easy and enjoyable. I feel more confident while speaking English now!",
  "Excellent Spoken English classes at Ooshas Prep! The teaching is easy to understand, and my communication skills have improved a lot.",
];

const benefits = [
  "Experienced & Certified Trainers – Learn from skilled instructors with practical teaching expertise.",
  "Personalised Learning Plans – Courses designed to match your goals, level, and learning pace.",
  "Practical Classroom Training – Improve fluency through conversations, activities, and real-life speaking practice.",
  "One Lakh+ Students Trained Since 1997 – Trusted by learners for quality English education.",
  "Online & Offline Learning Options – Flexible classes that fit your schedule and learning style.",
  "Cambridge University Press Content – Learn with internationally trusted English learning material.",
];

const comparison = [
  ["Class Type", "Live 1:1 Classes", "Group Classes"],
  ["Speaking Time", "60–70% Speaking Time", "9–90% Speaking Time"],
  ["Feedback", "Instant Feedback", "Delayed Feedback"],
  ["Flexibility", "Flexible Scheduling", "Fixed Timings"],
  ["Practice", "Real Conversations", "Theory-Based Learning"],
  ["Class Mode", "100% Online", "Travel Required"],
  ["Learning Module", "Personalized Learning", "Same for Everyone"],
];

const steps = [
  { title: "Contact Us", detail: "Call or fill out the form on our website to get started.", Icon: Phone },
  { title: "Schedule a Demo", detail: "Attend a free demo class to experience our teaching methods.", Icon: CalendarDays },
  { title: "Choose your course", detail: "Select the course that matches your goals.", Icon: Presentation },
  { title: "Begin Learning", detail: "Start your journey toward fluency with expert guidance.", Icon: UsersRound },
];

const learningPoints = [
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

export default function SpokenEnglishCoursePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroArt}>
          <Image
            src="/spoken-english/hero.webp"
            alt="A student reading and enjoying a book"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className={styles.heroImage}
          />
        </div>
        <div className={`${styles.heroInner} ${styles.container}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title">
              English Speaking Course
              <span>Ooshas Prep Spoken Curriculum</span>
            </h1>
            <p className={styles.heroMeta}>Classroom | Online | Personalised</p>
            <p className={styles.heroMeta}>English | IELTS | PTE | PD | Competitive</p>
            <Link className={styles.primaryButton} href="#start-learning">
              Start Spoken English Test <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.reviews} ${styles.container}`} aria-labelledby="reviews-title">
        <h2 id="reviews-title"><span>Student Reviews</span> &amp; Google Rating</h2>
        <ReviewSlider reviews={reviews} />
      </section>

      <section className={styles.growth} aria-labelledby="growth-title">
        <div className={`${styles.growthInner} ${styles.container}`}>
          <div className={styles.growthCopy}>
            <h2 id="growth-title">English Speaking <span>Classes for Career Growth</span></h2>
            <h3>Best English Speaking Course in Delhi</h3>
            <p>
              Oxford School of English offers one of the best English speaking courses in Delhi for beginners, students, working professionals, and job seekers. Our English course improves grammar, vocabulary, pronunciation, fluency, and communication skills through practical classroom training and personalised learning. We provide both online and offline English speaking classes to suit every learner’s schedule.
            </p>
            <h3>English Speaking Classes with Practical Learning</h3>
            <p>
              Looking for an English speaking course near me? Our interactive classes focus on real-life communication through conversations, role-plays, presentations, group discussions, and speaking activities. With continuous trainer guidance and personalised feedback, students develop the confidence to communicate effectively in interviews, workplaces, business meetings, and everyday situations.
            </p>
            <h3>More Than an English Course</h3>
            <p>
              Along with our English speaking course, we also offer IELTS, PTE, TOEIC, and Personality Development classes under one roof. Since 1997, Oxford School of English has trained more than One Lakh students using Cambridge University Press content, experienced trainers, smart classrooms, and personalised coaching through both online and offline learning.
            </p>
            <Link className={styles.darkButton} href="#start-learning">Start Spoken English Test</Link>
          </div>
          <div className={styles.verticalWord} aria-hidden="true">ENGLISH</div>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-title">
        <div className={`${styles.whyInner} ${styles.container}`}>
          <div className={styles.whyHeading}>
            <Image src="/spoken-english/why-choose-us.webp" alt="A bright idea light bulb" width={360} height={400} sizes="(max-width: 760px) 40vw, 280px" />
            <h2 id="why-title">WHY<br />CHOOSE<br />US?</h2>
          </div>
          <ul className={styles.benefitList}>
            {benefits.map((benefit) => (
              <li key={benefit}><Check size={17} strokeWidth={2.5} /><span>{benefit}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.comparisonSection} ${styles.container}`} aria-labelledby="comparison-title">
        <h2 id="comparison-title"><span>Speaking Fever</span> vs Traditional English Classes</h2>
        <div className={styles.comparisonGrid}>
          <div className={`${styles.comparisonCard} ${styles.featureCard}`}>
            <h3>Features</h3>
            {comparison.map(([feature]) => <p key={feature}>{feature}</p>)}
          </div>
          <div className={`${styles.comparisonCard} ${styles.speakingCard}`}>
            <h3>Speaking Fever 1:1</h3>
            {comparison.map(([, good], i) => <p key={i}><Check size={15} />{good}</p>)}
          </div>
          <div className={`${styles.comparisonCard} ${styles.traditionalCard}`}>
            <h3>Traditional Classes</h3>
            {comparison.map(([, , traditional], i) => <p key={i}><X size={15} />{traditional}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.processInner}`}>
          <h2 id="process-title">How Our Online <span>English Speaking Course</span> Works?</h2>
          <div className={styles.stepGrid}>
            {steps.map(({ title, detail, Icon }, index) => (
              <article className={styles.step} key={title}>
                <div className={styles.stepIcon}><Icon size={27} strokeWidth={1.8} /></div>
                {index < steps.length - 1 && <span className={styles.stepArrow} aria-hidden="true">»</span>}
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.learn} ${styles.container}`} aria-labelledby="learn-title">
        <h2 id="learn-title"><span>What</span> You’ll Learn</h2>
        <div className={styles.learnLayout}>
          <div className={styles.learnColumn}>
            {learningPoints.slice(0, 3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
          <div className={styles.learnArt}>
            <Image src="/spoken-english/what-you-learn.webp" alt="Illustration of communication and learning skills" fill sizes="(max-width: 760px) 80vw, 32vw" />
          </div>
          <div className={styles.learnColumn}>
            {learningPoints.slice(3).map((point) => <LearningPoint key={point.title} {...point} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.cta} ${styles.container}`} id="start-learning" aria-labelledby="cta-title">
        <div className={styles.ctaCopy}>
          <span className={styles.ctaPill}><Sparkles size={13} /> New Spoken English Test</span>
          <h2 id="cta-title">Start Your Spoken English Test</h2>
          <p>Prep Your Journey with Ooshas Prep</p>
          <Link className={styles.primaryButton} href="/contact">Start Spoken English Test <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.ctaImage}>
          <Image src="/spoken-english/students.webp" alt="Students learning English together" fill sizes="(max-width: 760px) 100vw, 45vw" />
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
