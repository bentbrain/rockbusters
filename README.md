# Rockbusters

A daily music guessing game based on Karl Pilkington's cryptic clues from the
XFM show. Each day presents one mangled clue and gives players five attempts to
name the artist or band.

Play it at [rockbusters.lol](https://rockbusters.lol).

## Features

- A new Rockbusters clue each day
- Tolerant answer matching and five guesses per round
- Optional audio clues
- Shareable results without answer spoilers
- Responsive, installable web app
- Product analytics through PostHog and performance monitoring through Vercel
- Unit, component, and end-to-end test coverage

## Stack

- Next.js 16 and React 19
- TypeScript and Tailwind CSS
- Vitest and Testing Library
- Playwright for component and end-to-end tests
- Vercel for hosting

## Local development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Create `.env.local` with the required local configuration:

```dotenv
FETCH_SELF_URL=http://localhost:3000
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
```

Audio clues can be enabled with `ROCKBUSTERS_AUDIO_BASE_URL` and
`ROCKBUSTERS_AUDIO_TOKEN_SECRET`. They are optional for local development.

Open [localhost:3000](http://localhost:3000).

## Useful commands

```sh
pnpm lint       # lint the codebase
pnpm test       # run unit tests
pnpm test:ct    # run component tests
pnpm test:e2e   # run browser tests
pnpm build      # create a production build
```

## How the daily puzzle works

The puzzle is selected from the question bank using the number of days since
the configured launch date. This keeps the daily answer deterministic without
requiring a database or scheduled job. Guesses and display preferences are
stored in the browser.

## Disclaimer

Rockbusters is an unofficial fan project. It is not affiliated with Karl
Pilkington, XFM, Global, or any artists referenced by the clues.
