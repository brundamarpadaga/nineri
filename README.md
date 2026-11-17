# Nineri website

One-page site for Nineri, a baby monitor in development by Brunda Marpadaga.
It alerts a parent's phone when a sleeping baby rolls onto their tummy or their face gets covered, and video stays home.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build
```

## Where things are

- `app/page.tsx`: every section and all the copy
- `app/globals.css`: colours, type and layout (tokens at the top)
- `components/CribScene.tsx`: the night-vision crib illustration
- `components/Demo.tsx`: the interactive demo with the phone
- `components/Privacy.tsx`: the "Where the video goes" diagram and remote-view switch
- `lib/site.ts`: the contact email used by every "write to us" link

## Brand rules

- Milk background, night navy, one amber accent. Light by default; dark only for night scenes.
- Fraunces (soft) for headlines, Inter for everything else. No monospace or all-caps labels.
- Short copy. No SIDS, breathing or vital-sign claims. Say "not a medical device".
