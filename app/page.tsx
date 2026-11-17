import { CribView } from "@/components/CribScene";
import { Demo } from "@/components/Demo";
import { Privacy } from "@/components/Privacy";
import { CopyEmail } from "@/components/CopyEmail";
import { Logo, Mark } from "@/components/Logo";
import { IconArrow, IconCamera, IconChip, IconNo, IconPhone, IconTimer } from "@/components/icons";
import { mailto } from "@/lib/site";

const STEPS = [
  { icon: <IconCamera />, title: "An overhead camera", text: "Sees in the dark with invisible infrared." },
  { icon: <IconChip />, title: "A model on the device", text: "Reads posture and a covered face, a few times a second." },
  { icon: <IconTimer />, title: "A moment to be sure", text: "Waits for a steady reading before it speaks." },
  { icon: <IconPhone />, title: "Your phone", text: "A text alert, louder if nobody responds." },
];

const WONT = [
  "Send nursery video to the cloud",
  "Charge a subscription for safety alerts",
  "Measure breathing or heart rate",
  "Claim to prevent SIDS",
];

const PHASES = [
  { name: "Validate", text: "Talking with 20–30 parents", now: true },
  { name: "Prototype", text: "Tested on mannequins first" },
  { name: "Beta", text: "Our own board, outside security audit" },
  { name: "Crowdfund", text: "Pre-orders prove demand" },
  { name: "Launch", text: "Certify, manufacture, ship" },
];

const COFOUNDER = mailto(
  "Co-founding Nineri",
  "Hi Brunda,\n\nI'd like to talk about joining Nineri as a co-founder.\n\nWhat I'd bring:\nHours a week I could give:\n\n"
);
const VOLUNTEER = mailto(
  "Helping with Nineri",
  "Hi Brunda,\n\nI'd like to help with Nineri.\n\nWhat I can help with:\nHours a week I could give:\n\n"
);
const PARENT = mailto(
  "Parent interview for Nineri",
  "Hi Brunda,\n\nI'm a parent (or expecting) and happy to talk for 20 minutes.\n\nBaby's age or due date:\n\n"
);

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" aria-label="Nineri home"><Logo /></a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#demo">How it works</a>
            <a href="#privacy">Privacy</a>
            <a href="#story">Story</a>
          </nav>
          <a className="btn btn-primary btn-sm" href="#join">Help us build this</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                Alerts you when it matters.
                <span>Video stays home.</span>
              </h1>
              <p className="lede">
                A baby monitor that tells your phone when a sleeping baby rolls onto their tummy or their face gets covered.
              </p>
              <div className="actions">
                <a className="btn btn-primary" href="#join">Help us build this</a>
                <a className="btn btn-ghost" href="#demo">See it work <IconArrow size={18} /></a>
              </div>
              <p className="fine">In development · Not a medical device</p>
            </div>

            <div className="hero-visual">
              <div className="hero-cam">
                <CribView state="back" breathe detection={false} />
              </div>
              <div className="float float-calm">
                <Mark size={28} />
                <div>
                  <b>All calm</b>
                  <span>On their back · 2:14 am</span>
                </div>
              </div>
              <div className="float float-bytes">
                <span>Uploaded tonight</span>
                <b>0 bytes</b>
                <span>Video stayed home</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="container">
            <div className="section-head">
              <h2>Try it. Change what happens in the crib.</h2>
              <p>Quiet when all is well. Clear when it isn&apos;t.</p>
            </div>
            <Demo />
          </div>
        </section>

        <section className="section section-paper" id="privacy">
          <div className="container">
            <div className="section-head">
              <h2>Where the video goes.</h2>
              <p>Nowhere, unless you say so.</p>
            </div>
            <Privacy />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Baby monitors ask a lot of tired parents.</h2>
            </div>
            <div className="problems">
              <div>
                <h3>Someone has to keep watching.</h3>
                <p>Most monitors only stream video.</p>
              </div>
              <div>
                <h3>The smart ones send video away.</h3>
                <p>Nursery footage on someone else&apos;s servers.</p>
              </div>
              <div>
                <h3>Then come the false alarms.</h3>
                <p>And around $300, plus a subscription.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-tight" id="how">
          <div className="container">
            <div className="section-head">
              <h2>From camera to phone, all on the device.</h2>
            </div>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <span className="step-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container wont">
            <h2>What Nineri won&apos;t do.</h2>
            <ul>
              {WONT.map((w) => (
                <li key={w}>
                  <IconNo size={20} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-paper">
          <div className="container">
            <div className="section-head">
              <h2>Where we are.</h2>
              <p>On sale in 12 to 20 months, one gate at a time.</p>
            </div>
            <ol className="track">
              {PHASES.map((p) => (
                <li key={p.name} className={p.now ? "is-now" : undefined}>
                  <span className="track-dot" />
                  {p.now && <span className="track-here">We&apos;re here</span>}
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container story">
            <div className="story-person">
              <span className="avatar" aria-hidden="true">BM</span>
              <div>
                <b>Brunda Marpadaga</b>
                <span>Founder</span>
              </div>
            </div>
            <div className="story-copy">
              <h2>It started as a college project.</h2>
              <p>
                An Arduino cradle and a camera that watched a baby&apos;s face. The camera worked on a three-month-old.
                The research never became a paper — the idea felt too incremental. Then edge AI changed what was possible
                on a device. Nineri is that original idea, rebuilt with on-device inference so the video never leaves the room.
              </p>
            </div>
          </div>
        </section>

        <section className="section join" id="join">
          <div className="container">
            <div className="section-head">
              <h2>Help us build this.</h2>
              <p>Nineri is early. Join the people making it real.</p>
            </div>
            <div className="join-grid">
              <div className="join-card join-card-main">
                <h3>Join as a co-founder</h3>
                <ul className="tags">
                  <li>Embedded hardware</li>
                  <li>Computer vision</li>
                  <li>Mobile app</li>
                  <li>Business and operations</li>
                </ul>
                <a className="btn btn-primary" href={COFOUNDER}>Write about co-founding</a>
              </div>
              <div className="join-card">
                <h3>Help as a volunteer</h3>
                <ul className="tags">
                  <li>Design</li>
                  <li>Testing</li>
                  <li>Pediatric sleep</li>
                  <li>Regulation</li>
                  <li>Manufacturing</li>
                </ul>
                <a className="btn btn-ghost" href={VOLUNTEER}>Write about helping</a>
              </div>
            </div>
            <div className="join-foot">
              <p>
                New or expecting parent? <a href={PARENT}>Give us 20 minutes</a> and tell us what keeps you up.
              </p>
              <CopyEmail />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo size={26} />
          <p>
            Nineri is in development and is not a medical device. It does not prevent SIDS or measure vital signs.
          </p>
          <p>© 2026 Nineri</p>
        </div>
      </footer>
    </>
  );
}
