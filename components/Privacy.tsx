"use client";

import { useState } from "react";
import { IconCamera, IconHouse, IconLock, IconPhone, IconRelay } from "./icons";

export function Privacy() {
  const [remote, setRemote] = useState(false);

  return (
    <div className={`flow${remote ? " is-remote" : ""}`}>
      <div className="flow-switch">
        <span id="remote-label">Remote view</span>
        <button
          type="button"
          role="switch"
          id="remote-switch"
          aria-checked={remote}
          aria-labelledby="remote-label"
          className="switch"
          onClick={() => setRemote((r) => !r)}
        >
          <span className="switch-knob" />
        </button>
        <span className="flow-switch-state">{remote ? "On" : "Off, until you turn it on"}</span>
      </div>

      <div className="flow-map">
        <div className="home">
          <div className="home-roof" aria-hidden="true" />
          <div className="home-label">
            <IconHouse size={18} /> Your home
          </div>
          <div className="home-nodes">
            <div className="node">
              <span className="node-icon amber"><IconCamera /></span>
              <b>Nineri</b>
              <span>Sees and thinks here</span>
            </div>
            <div className="link">
              <span className="link-line" />
              <span className="link-tag"><IconLock size={14} /> Encrypted, over your Wi-Fi</span>
            </div>
            <div className="node">
              <span className="node-icon"><IconPhone /></span>
              <b>Your phone</b>
              <span>Live view, no server</span>
            </div>
          </div>
        </div>

        <div className="away" aria-hidden={!remote}>
          <div className="link link-out">
            <span className="link-line" />
            <span className="link-tag"><IconLock size={14} /> Sealed end to end</span>
          </div>
          <div className="node node-relay">
            <span className="node-icon"><IconRelay /></span>
            <b>Relay</b>
            <span>Passes sealed packets. Holds no keys.</span>
          </div>
          <div className="link link-out">
            <span className="link-line" />
          </div>
          <div className="node">
            <span className="node-icon"><IconPhone /></span>
            <b>You, away</b>
            <span>Only your phone can open it</span>
          </div>
        </div>
      </div>

      <p className="flow-note">
        {remote
          ? "End-to-end encrypted. We can't see it, and neither can anyone else."
          : "Nothing leaves the house. Alerts are words, never pictures."}
      </p>
    </div>
  );
}
