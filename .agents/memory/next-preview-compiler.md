---
name: Next.js preview compiler
description: Why the Digital Solutions development preview uses Turbopack instead of Webpack.
---

Keep the Digital Solutions development server on Turbopack unless a verified replacement fixes the proxy behavior.

**Why:** The Webpack development runtime repeatedly produced missing or failed page chunks through the Replit preview proxy, causing secondary invalid-hook errors. Cache removal and origin allowlisting alone did not resolve it; Turbopack removed the Webpack runtime and loaded cleanly.

**How to apply:** When changing the development command or debugging preview-only chunk failures, preserve or restore the Turbopack flag and verify the public preview domain rather than localhost alone.