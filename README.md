<div align="center">
  <p>
    <img src="./public/images/logo.png" width="72">
  </p>

  <h1>beecast</h1>

  <p>
    Your hard-working AI podcast companion.
  </p>

  <p>
    <a href="https://conventionalcommits.org" target="_blank">
      <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196" >
    </a>
    <img src="https://img.shields.io/github/license/experiment-station/beecast">
  </p>
</div>

<br />

---

<br />

## Introduction

beecast is a simple yet effective tool that enhances your podcast experience with AI powered summarizations.

Our aim is to provide a user-friendly platform that simplifies the way people interact with their favorite podcasts, especially for those looking to consume content in a more efficient manner.

## How it works

Here's a quick overview of beecast's features:

- Log in with GitHub: Use your GitHub account to sign in to beecast.
- Discover podcasts: Browse through the curated list of podcasts and add them to your library. These podcasts are currently imported via our Spotify accounts.
- Listen to podcasts: Listen to your favorite podcasts with the added benefits of AI-generated transcriptions and summaries.

### Upcoming features

Our initial idea was to use Spotify's API, but they have a six-week review process for new apps. We're planning to implement the following features once we get approved:

- Spotify integration: Log in with your Spotify account to sync your podcast library to beecast.
- Podcast matching: We match your podcasts with entries from the Podcast Index.
- Seamless continuation: beecast remembers where you left off, allowing for an uninterrupted listening experience.

## Tech stack

We are using the following technologies to build beecast:

- [Graphite](https://graphite.dev/) for the stacked PRs.
- [Next.js](https://nextjs.org/) as the full-stack framework.
- [Radix Themes](https://www.radix-ui.com/) for the UI.
- [Supabase Auth](https://supabase.com/docs/guides/auth) for user authentication via GitHub and Spotify.
- [Spotify API](https://developer.spotify.com/) for fetching user's podcasts.
- [Podcast Index API](https://github.com/Podcastindex-org) for fetching podcast metadata.
- [Supabase Database](https://supabase.com/docs/guides/database/overview) for the database.
- [Deepgram SDK](https://deepgram.com/) for transcription.
- [OpenAI SDK](https://platform.openai.com) for summarization.
- [Vercel AI SDK](https://sdk.vercel.ai/) for streaming the OpenAI response.
- [Sentry](https://sentry.io/) for error tracking.
- [Baselime](https://baselime.io/) for monitoring.

## Team

- [Okan](https://github.com/okanisildar)
- [Altay](https://github.com/altaywtf)
