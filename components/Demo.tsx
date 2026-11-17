"use client";

import { useEffect, useRef, useState } from "react";
import { CribView, type CribState } from "./CribScene";
import { Mark } from "./Logo";

type Phase = "calm" | "checking" | "alert" | "blind";
type Note = { id: number; title: string; body: string };

const OPTIONS: { id: CribState; label: string }[] = [
  { id: "back", label: "On back" },
  { id: "tummy", label: "Rolls over" },
  { id: "cover", label: "Face covered" },
  { id: "blind", label: "Camera blocked" },
];

const RULES: Record<"tummy" | "cover", { ms: number; hint: string; title: string }> = {
  tummy: {
    ms: 3200,
    hint: "Confirming. The real device waits 15–30 seconds.",
    title: "Baby has rolled onto their tummy.",
  },
  cover: {
    ms: 1800,
    hint: "Confirming. A covered face gets a faster rule.",
    title: "Baby's face may be covered.",
  },
};

const STATUS: Record<Phase, string> = {
  calm: "All calm",
  checking: "Checking",
  alert: "Look now",
  blind: "Can't see",
};

export function Demo() {
  const [scene, setScene] = useState<CribState>("back");
  const [phase, setPhase] = useState<Phase>("calm");
  const [notes, setNotes] = useState<Note[]>([]);
  const [run, setRun] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(1);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function push(title: string, body: string) {
    const id = nextId.current++;
    setNotes((n) => [{ id, title, body }, ...n].slice(0, 3));
  }

  function choose(s: CribState) {
    if (timer.current) clearTimeout(timer.current);
    setScene(s);
    setRun((r) => r + 1);
    if (s === "back") {
      setPhase("calm");
      return;
    }
    if (s === "blind") {
      setPhase("blind");
      push("Nineri can't see the crib.", "No alert doesn't mean all is well. Check the camera.");
      return;
    }
    const rule = RULES[s];
    setPhase("checking");
    timer.current = setTimeout(() => {
      setPhase("alert");
      push(rule.title, "Text only. No picture is sent.");
    }, rule.ms);
  }

  function checked() {
    if (timer.current) clearTimeout(timer.current);
    setNotes([]);
    setScene("back");
    setPhase("calm");
  }

  const rule = scene === "tummy" || scene === "cover" ? RULES[scene] : null;

  return (
    <div className="demo">
      <div className="demo-stage">
        <CribView state={scene} breathe />
        <div className="demo-controls" role="group" aria-label="What happens in the crib">
          {OPTIONS.map((o) => (
            <button
              key={o.id}
              id={`demo-${o.id}`}
              type="button"
              className="pill"
              aria-pressed={scene === o.id}
              onClick={() => choose(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="demo-side">
        <div className="phone" aria-live="polite">
          <div className="phone-top">
            <span>2:14</span>
            <span className="phone-island" />
            <span>Wi-Fi</span>
          </div>
          <div className="phone-clock">2:14</div>
          <div className="phone-date">Tuesday, 18 November</div>

          <div className={`widget is-${phase}`}>
            <Mark size={26} />
            <div>
              <b>{STATUS[phase]}</b>
              <span>
                {phase === "calm" && "Baby on their back"}
                {phase === "checking" && rule?.hint}
                {phase === "alert" && "Tap the alert when you've checked"}
                {phase === "blind" && "The camera's view is blocked"}
              </span>
            </div>
            {phase === "checking" && rule && (
              <span className="widget-bar" key={run} style={{ animationDuration: `${rule.ms}ms` }} />
            )}
          </div>

          <div className="notes">
            {notes.map((n, i) => (
              <div className="note" key={n.id}>
                <div className="note-head">
                  <Mark size={18} />
                  <span>Nineri</span>
                  <span className="note-time">{i === 0 ? "now" : "earlier"}</span>
                </div>
                <b>{n.title}</b>
                <span>{n.body}</span>
                {i === 0 && (
                  <button type="button" className="note-btn" id="demo-checked" onClick={checked}>
                    I&apos;ve checked
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="demo-caption">
          Sped up for the demo. The amber dots are what the model reads; hollow ones are hidden from view.
        </p>
      </div>
    </div>
  );
}
