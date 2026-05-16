#!/usr/bin/env python3
"""Append gd-* guide CSS classes to globals.css for SouthOrange.com guide pages."""
import pathlib

CSS_PATH = pathlib.Path.home() / "southorange-site" / "app" / "globals.css"

GUIDE_CSS = """
  /* ─────────────────────────────────────────────
     Guide / article pages  (gd-*)
  ───────────────────────────────────────────── */
  .gd-article {
    @apply mx-auto max-w-2xl px-6 py-14 md:py-20;
  }

  .gd-h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.1;
    color: #1A2332;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }

  .gd-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.3rem, 3vw, 1.75rem);
    color: #2D5016;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #C3D9A8;
  }

  .gd-h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1A2332;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .gd-lead {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #4B5563;
    margin-bottom: 2.5rem;
  }

  .gd-card {
    @apply rounded-2xl p-6 mb-5;
    background: #FFFFFF;
    border: 1.5px solid #E5DDD0;
    box-shadow: 0 2px 8px rgba(45,80,22,0.05);
  }

  .gd-card p {
    color: #4B5563;
    line-height: 1.7;
    font-size: 0.95rem;
    margin-top: 0.35rem;
  }

  .gd-addr {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.4rem;
  }

  .gd-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: #EDF4E5;
    color: #2D5016;
    border: 1px solid #C3D9A8;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .gd-link {
    color: #2D5016;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .gd-link:hover { color: #4A7A28; }

  .gd-list {
    @apply pl-5 mt-3 space-y-2;
    list-style-type: disc;
  }
  .gd-list li {
    color: #4B5563;
    line-height: 1.6;
    font-size: 0.95rem;
  }
  .gd-list li strong { color: #1A2332; }
"""

existing = CSS_PATH.read_text()

if "gd-article" in existing:
    print("gd-* styles already present — nothing to do.")
else:
    # Insert before the final closing brace of @layer utilities
    insert_at = existing.rfind("}")
    updated = existing[:insert_at] + GUIDE_CSS + existing[insert_at:]
    CSS_PATH.write_text(updated)
    print("Done — gd-* guide styles appended to globals.css")
    print("Restart npm run dev if it's already running.")
