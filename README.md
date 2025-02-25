# Bespeak

### A blogging site similar to Medium & Substack

...but it's ad-free & without all the clutter.

## Features

- An article editor to share posts with [TipTap](https://tiptap.dev)
- Next.js SSR (this project was created over a year ago, so it is an outdated
  version of Next.js)
- Trending articles homepage
- Articles can have tags
- Users can create lists
- Users can follow other users, lists and tags, which show up in the user's feed
- Images are [thumbhashed](https://evanw.github.io/thumbhash/) for great UX

### Planned Features

- Publications: a shared newspaper-like section for multiple users to contribute
  to at once
- Subdomains: host your personal blog on Bespeak with
  `yourusername.bespeak.xyz`, and optionally have a custom domain pointed to it

## Notes

- This project is incomplete. There are a few features not added and
  functionality that requires users to be logged-in does not show error or
  "Please log in" messages yet.
- Feeds are semi-implemented, I just haven't linked them in the UI yet. Go to
  [/feed](https://bespeak-beta.vercel.app/feed) to see your feed. You can follow
  other users, tags and lists.
