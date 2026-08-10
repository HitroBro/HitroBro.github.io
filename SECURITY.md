# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in this project, please report it responsibly:

### Private Disclosure (Preferred)

**Email:** ghiahitarth@gmail.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

We will acknowledge receipt within 48 hours and provide a status update within 5 business days.

### Public Disclosure

If you prefer, you may open a GitHub issue with the `security` label. However, for critical vulnerabilities, private disclosure is strongly encouraged.

## Security Features

This project is a **static site** generated with Pelican. The deployed site contains no server-side code execution.

- **Zero Server-Side Processing:** Pure static HTML/CSS/JS served via GitHub Pages
- **No User Input Processing:** No forms with server-side handling (contact form uses Formspree)
- **Content Security Policy:** Headers configured via GitHub Pages
- **HTTPS Only:** Enforced by GitHub Pages
- **No Cookies/Tracking:** No analytics, no cookies, no third-party scripts by default
- **Dependency Review:** Pelican plugins reviewed and pinned

## Scope

This policy applies to the Pelican site configuration and theme only. Generated HTML/CSS/JS output is static and has no attack surface beyond standard web serving.

## Acknowledgments

We thank all security researchers who responsibly disclose vulnerabilities.