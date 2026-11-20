GSAP 3.13.0, pinned and vendored from https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js.

The upstream copyright/license notice is retained in full in `gsap.min.js`. GSAP is subject to its Standard License at https://gsap.com/standard-license, not the project's own license. No ScrollTrigger or other plugin is included. The distribution contains its license URL in the header rather than a separate LICENSE file.

The packaging script wraps this unmodified UMD build in a writable host object so it can run inside the application's strict ES module without assigning to the read-only `Window.window` property. It is served from the same origin in the existing animation asset; no runtime CDN or package installation is required.
