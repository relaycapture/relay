# AUTOPSY: TOP-TO-BOTTOM STRUCTURAL BREAKDOWN

**Product / Service:** Relay Capture  
**Category:** Zero-Credential DNS Deliverability & Cryptographic Ingress Auditor  
**Model:** Precision One-Time Execution (Zero Retainers, No Recurring SaaS)

---

## 00. GLOBAL HEADER & PERSISTENT NAVIGATION

### [Top-Left Floating Navbar]
* **Structure:** `[Geometric Triangle Logo] [CONTACT] [PRICING] [CHECK DOMAIN ↗]`
* **Behavior:** Fixed top-left floating glassmorphic pill. When user scrolls, `[CONTACT]` and `[PRICING]` smoothly collapse from right to left, and the triangle logo rotates 180° pointing straight down. Clicking the rotated logo opens a minimalistic dropdown menu with `Contact` and `Pricing` links.
* **Magnetic Physics:** Completely removed / rock-solid stability.

### [Top-Right Fixed Theme Switcher]
* **Element:** Minimal circular toggle button.
* **Modes:** Light Mode (`#F4F4F2` / `#fbfbfd`) ⇄ Dark Mode (`#0A0A0C` / `#060608`).

### [Bottom-Left Section Quick-Nav Proximity Dock]
* `01 // Overview`
* `02 // Domain Audit`
* `03 // Revenue Impact`
* `04 // Inbox Simulation`
* `05 // Protocol Stream`
* `06 // Live Resolver`
* `07 // Deliverables`
* `08 // Architecture FAQ`
* `09 // Engineering Contact`

---

## 01. HERO SECTION

### Main Headline
> **Your domain is speaking.**  
> **Do you know what it says?**

### Subheadline
> Since 2024, if your domain pisses off Google or Microsoft.  
> They grab it to a dark corner and beat it to death.

### Calls to Action
* **Primary Button:** `Scan Your Domain ↓` (Smoothly scrolls directly to the live diagnostic input)
* **Secondary Button:** `One-Time Pricing ↗` (Navigates to commercial deliverables)

---

## 02. REAL-TIME PUBLIC DNS DIAGNOSTIC AUDIT

### Section Headline
> **Probe any domain in milliseconds.**

### Section Subheadline
> Enter a domain to query root nameservers directly via Cloudflare DNS-over-HTTPS.  
> We inspect SPF syntax, probe DKIM selectors, and check DMARC enforcement.

### Live Diagnostic Input Box
* **Input Field Placeholder:** `Enter domain (e.g. yourcompany.com or acme.org)`
* **Instant Presets:** `TRY: airbnb.com stripe.com Linear.app`
* **CTA Button:** `Resolve DNS ↵`

### Live Scorecard Display (Rendered Upon Scan)
* **Header:** High-resolution domain logo / favicon fetched via Google Favicon API (fallback to neutral Globe icon) beside the computed health score.
* **Health Metric:** `Health Score [0–100]/100` (Weighted score: SPF 30pts, DKIM 35pts, DMARC 35pts).
* **Compliance Status Badge:** `Google / Yahoo Mandate: Compliant / Non-Compliant (RFC 7489)`
* **Record Audit Deep-Dive:**
  * **SPF (RFC 7208):** Evaluates `v=spf1`, IP ranges, recursive include lookups (flagging the RFC 10-lookup limit), and mechanism posture (`-all` vs `~all` vs `+all`).
  * **DKIM (RFC 6376):** Automatically probes 7 standard industry selectors (`google`, `selector1`, `selector2`, `k1`, `default`, `mandrill`, `zoho`) checking for active 2048-bit RSA public keys.
  * **DMARC (RFC 7489):** Identifies policy enforcement state (`p=none` vs `p=quarantine` vs `p=reject`), subdomain inheritance (`sp=`), and aggregate forensic reporting tags (`rua=`, `ruf=`).

### Zero-Access Architecture Footnote
> `ZERO CREDENTIAL ACCESS ARCHITECTURE • 100% PUBLIC DNS NAMESERVERS • NO API KEYS OR INBOX PERMISSIONS REQUIRED`

---

## 03. FINANCIAL EXPOSURE & PIPELINE REVENUE LEAKAGE

### Section Headline
> **Email risk rarely arrives with a warning.**

### Section Subheadline
> It appears as lost replies, rejected invoices, impersonated executives,  
> and a sender reputation that takes months to rebuild.

### Line Graph Topology Header
* **Synced Domain Identifier:** High-resolution domain logo next to domain name (e.g. `GOOGLE.COM` or `STRIPE.COM`) — completely replacing glowing dots.
* **Status Badges:**
  * `● Healthy` (Spam rate ≤ 10%, Emerald)
  * `● Uh oh...` (Spam rate 11%–24%, Amber)
  * `● Blacklisted` (Spam rate ≥ 25%, Red)

### 12-Node Mathematical Reputation Decay Polyline
* **Y-Axis Static Scale:** `$0`, `$10K`, `$20K`, `$30K`, `$40K`.
* **X-Axis Quarter Milestones:** `Q1 (Month 3)`, `Q2 (Month 6)`, `Q3 (Month 9)`, `Q4 (Month 12)`.
* **Vertex Tooltip:** Displays individual monthly compound decay: `[Month] — Decay: $[Amount]/mo`.

### Dynamic Output Metrics
1. **Monthly Revenue Leakage:** `$[quarantined * (opportunity_rate / 100) * deal_value]/mo`
2. **Annualized Pipeline Risk:** `$[Monthly Revenue Leakage * 12]/yr`
3. **Quarantined Outbound:** `~[outboundVolume * (bounceRate / 100)] emails`

### Transparent Mathematical Model Note
> **Model assumes 0.15% opportunity recovery on quarantined sends (Loss = Quarantined Sends × 0.15% × Deal Value).**  
> **≈[bounceRate]% of your sends ([quarantined] emails/mo) drop into quarantine.**

### Interactive Parameter Sliders
1. **Monthly Outbound Volume:** 1,000 to 100,000 sends (Default: `10,000`)
2. **Quarantine / Spam Rate:** 1% to 65% (Default: `35%`)
3. **Value per Deal:** $100 to $50,000+ (Default: `$3,500`)
4. **Opportunity Rate Assumption:** 0.05% to 0.50% (Default: `0.15%`)

---

## 04. GMAIL INBOX SIMULATION: BEFORE VS. AFTER

### Section Headline
> **Same email. Two destinations.**

### Section Subheadline
> Toggle between unauthenticated sending posture and full RFC 7489 enforcement  
> to see how Google Workspace and Microsoft 365 process your transactional emails.

### Exterior Toggle Dock
* **[BEFORE: Spam]** (Staggered red strikethroughs, 42.92% spam quarantine).
* **[AFTER: Enforced]** (Instant recovery, 99.82% inbox placement).

### Simulated Mailbox Folders
* **Inbox Folder:** `14,973 (99.82%)` in After mode vs. `8,562 (57.08%)` in Before mode.
* **Spam Folder:** `27 (0.18%)` in After mode vs. `6,438 (42.92%)` in Before mode.

### Exact Spam Emails (Before State):
1. **Bob Bearnt (`bearnt@hyper-growth-machine.co`):**
   * **Subject:** `Re: Re: Re: Re: Re: did you get eaten by a bear? 🐻`
   * **Warning Banner:** `! Why is this message in spam? Lots of messages from em5113.omblabla.com were identified as spam in the past [Report not spam]`
   * **Body:** *"Ive reached out a few times and havent heard back, so Im going to asume you were either eaten by a bear or the timing just isnt right for you to 10x your MRR this quarter 🚀..."*
2. **Steve Miller (`s.miller@apexglobalfreight.com`):**
   * **Subject:** `RE: Q3 Trans-Pacific routing & drayage capacity`
   * **Warning Banner:** `! Be careful with this message. Gmail could not verify that it actually came from apexglobalfreight.com. Avoid clicking links, downloading attachments, or replying with personal information. [Report spam] [Report phishing]`
   * **Body:** *"Sarah - following up on my note below regarding the capacity at Long Beach. With the announced GRI (General Rate Increases) hitting on the 15th, I'd love to run a quick benchmark on one of your current high-volume lanes..."*
3. **Steve Miller (`s.miller@apexglobalfreight.com`):**
   * **Subject:** `Q3 Trans-Pacific routing & drayage capacity`
   * **Warning Banner:** `! Be careful with this message. Gmail could not verify that it actually came from apexglobalfreight.com... [Report spam] [Report phishing]`
   * **Body:** *"Hey Sarah, Looking at Vanguard's recent expansion into the Dallas facility, I imagine you're evaluating Q3 container volumes out of Shenzhen. The spot market is tightening, but we just secured contracted space..."*
4. **Van Hunter | VP of Growth (`van.h@scale-max-synergy-ai.io`):**
   * **Subject:** `your crpyto SaaS scalling strategy`
   * **Warning Banner:** `X This message seems dangerous. Many people marked similar messages as phishing scams, so this might contain unsafe content... [Report dangerous] [Looks safe]`
   * **Body:** *"Hey friend, I know you're super busy crushing it. I was just looking at your site and honestly? You guys are leaving massive ARR on the table..."*

### Transition to After (Enforced State):
* **Phase 1 (Immediate):** The cold-spam Bearnt email and crypto phishing Van Hunter email slide off. The two Steve Miller emails turn white, lose their red strike lines, and slide down to positions 3 & 4.
* **Phase 2 (After short delay):** Sarah Chen's reply slides into position 2:
  * **From:** `Sarah Chen <s.chen@vanguardindustrial.com>`
  * **To:** `Steve Miller <s.miller@apexglobalfreight.com>`
  * **Subject:** `RE: Q3 Trans-Pacific routing & drayage capacity`
  * **Body:** *"Steve, We are actually dealing with a chassis shortage out of LB right now that is killing our lead times. I don't have time for a call next week, but if you can actually guarantee drayage, send me over your current rates for 40' HQ containers from Ningbo to our Dallas DC. I need transit times included. -SC"*
* **Phase 3 (Next incoming email on top):** Steve Miller's contract closing email arrives at position 1 (top of all):
  * **From:** `Steve Miller <s.miller@apexglobalfreight.com>`
  * **To:** `Sarah Chen <s.chen@vanguardindustrial.com>`
  * **Subject:** `RE: Q3 Trans-Pacific routing & drayage capacity`
  * **Body:** *"Sarah, Understood. We have dedicated assets on the ground at LB, so we aren't relying on the public chassis pools. That's how we bypass the bottleneck. I will have my pricing team pull the spot rates and transit time estimates for Ningbo to Dallas and shoot them over to you by Monday morning for your review. Have a good weekend, Steve Miller"*

### Background Emails
* All emails beneath the top 4 are permanently blurred to keep 100% focus on the core sales recovery narrative.

### Deliverability Reality Statement
> `Authenticated against the exact checks Gmail and Outlook run before deciding Inbox vs. Spam.`

---

## 05. GLOBAL PROTOCOL ENFORCEMENT STREAM

### Section Headline
> **Global mail standard enforcement stream.**

### Section Subheadline
> Major inbox providers mandate automated protocol compliance.  
> Ongoing transport policy enforcement stream.

### Moving Enforcement Chronology Cards
1. **Google Workspace Security (2024-06-01):**
   *One-Click Unsubscribe & Strict DMARC Quarantine Enforcement* — Mandatory RFC 8058 List-Unsubscribe headers enforced. Senders with unaligned SPF/DKIM identifiers face automatic transient 421/450 reject loops and domain reputation score throttling. *(Impact: Mandatory | RFC 8058)*
2. **Google & Yahoo Postmaster (2024-02-01):**
   *5,000/day Bulk Sender DMARC Mandate* — All senders transmitting >5,000 daily messages to Gmail and Yahoo Mail must publish valid SPF and DKIM, enforce DMARC (p=none minimum), and maintain spam rates below 0.3%. *(Impact: Mandatory | Postmaster Policy)*
3. **Apple Mail Privacy Protection (2023-09-20):**
   *iCloud Private Relay & Mail Authentication Rules* — Inconsistent DKIM signatures trigger automated quarantine and junk placement on macOS and iOS devices. *(Impact: Critical | iCloud Spec)*
4. **Microsoft 365 Defender (2023-04-12):**
   *Strict High-Confidence Phish & Sender ID Quarantine* — Exchange Online Protection (EOP) treats SPF neutral (~all) with missing DKIM as suspicious, routing straight to tenant quarantine. *(Impact: Standard | MSFT Security Bulletin)*
5. **AuthIndicators Working Group (2022-08-01):**
   *BIMI & Verified Mark Certificates (VMC)* — Requires DMARC policy at strict enforcement (p=quarantine pct=100 or p=reject) to render verified sender checkmarks in mobile inboxes. *(Impact: Standard | BIMI Draft)*
6. **IETF RFC 7489 (2015-03-18):**
   *Domain-based Message Authentication (DMARC)* — Standardization of policy reporting and conformance. Enforces how receiving mail transfer agents (MTAs) handle authentication failures (p=none, p=quarantine, p=reject). *(Impact: Critical | RFC 7489)*

---

## 06. AUTOMATED RESOLVER & PROBE ENGINE TERMINAL

### Section Headline
> **Automated deep probe and diagnostics.**

### Section Subheadline
> Watch our engine resolve root authoritative nameservers and evaluate SPF mechanics.  
> Verify 2048-bit DKIM keys and calculate DMARC policy enforcement live.

### Live Terminal Execution Engine
* **Header:** `RELAY ENGINE CORE // SCANNER RUNTIME` | `Cloudflare DoH 1.1.1.1 JSON (v2.4)`
* **Automated Demonstration Loop:**
  1. Simulated cursor inputs domain `auth.stripe-internal.io`
  2. Cursor clicks `Resolve DNS` button
  3. Live progress bar animates (0% to 100%) through query pipeline
  4. Authoritative TXT records resolved:
     * `SPF:` `v=spf1 include:_spf.google.com include:sendgrid.net ~all`
     * `DKIM:` 2048-bit RSA key verified on selector `google._domainkey`
     * `DMARC:` Evaluated at `v=DMARC1; p=reject; rua=mailto:dmarc-reports@relaycapture.com`
  5. Action button: `Download Hardened Remediation Bundle ↓`

---

## 07. DELIVERABLES & PRICING TABLE

### Section Headline
> **One Time. Zero Retainers.**

### Section Subheadline
> No recurring SaaS fees. No 30-minute discovery meetings.  
> We fix it in 24 hours, and get out of your way.

---

### Tier 1: Self-Serve Blueprint
* **Price:** `$247`
* **Billing Term:** `one-time deliverable`
* **Target Audience:** For teams with an in-house engineer or technical founder.
* **Included Features:**
  * ✓ Full-stack DNS deliverability & spoofing risk scorecard
  * ✓ Root SPF mechanism validation & 10-lookup limit audit
  * ✓ Authoritative DMARC policy check (p=quarantine / p=reject)
  * ✓ DKIM selector probing & syntax validation
  * ✓ Exact copy-paste DNS TXT records for your domain
  * ✓ Shareable confidential PDF + JSON bundle
* **Excluded Features:**
  * ✕ Direct infrastructure setup & live hands-on DNS execution
  * ✕ 14-day post-launch engineering verification & support
* **CTA Checkout Button:** `Select Self-Serve Blueprint →`

---

### Tier 2: Turnkey Remediation (POPULAR)
* **Badge:** `POPULAR`
* **Price:** `$547`
* **Billing Term:** `complete one-time execution`
* **Target Audience:** For founders who value their time and refuse to touch DNS records.
* **Included Features:**
  * ✓ Everything in Self-Serve Blueprint
  * ✓ Fully automated DNS records configuration
  * ✓ Provider recipes (Google Workspace, M365, and more)
  * ✓ Subdomain inheritance policy hardening & alignment
  * ✓ 14-day post-launch engineering support & verification check
  * ✓ Guaranteed 100% Google / Yahoo bulk sender compliance
* **CTA Checkout Button:** `Get Turnkey Remediation →`

---

## 08. TECHNICAL ARCHITECTURE FAQ

### Section Headline
> **Questions. Answered.**

### Section Subheadline
> Direct answers regarding DNS architecture, sender compliance,  
> and mailbox deliverability protection.

### FAQ Items
1. **01. How does Relay Capture inspect our domain without account credentials?**  
   *Email authentication protocols (SPF, DKIM, DMARC, BIMI) are by architectural design published on public DNS nameservers so receiving mail servers worldwide can verify them. Relay Capture acts identically to receiving mail transfer agents (MTAs) at Google and Microsoft: querying public authoritative nameservers via DNS-over-HTTPS. We never request API keys, OAuth tokens, inbox access, or sensitive message data.*
2. **02. What are the major receiving mailbox provider enforcement requirements?**  
   *Major mailbox providers mandate that sending domains must: 1) Publish valid SPF and DKIM authentication, 2) Enforce a DMARC policy of at least p=none, 3) Align From: headers with either SPF or DKIM domains, 4) Provide one-click RFC 8058 unsubscribe headers, and 5) Maintain spam complaint rates strictly below 0.3%. Failure to meet these criteria triggers automatic spam quarantine or permanent 550 SMTP rejection.*
3. **03. Why is an SPF "~all" (softfail) policy dangerous for outbound deliverability?**  
   *SPF softfail (~all) signals that unlisted IPs sending from your domain should not be explicitly rejected. While intended as a transitional posture, modern spam filters (Microsoft EOP, Gmail) treat ~all with suspicion, often downgrading sender reputation and routing messages to Spam or Quarantine. Enforcing DMARC at p=quarantine or p=reject removes ambiguity.*
4. **04. How does Relay Capture differ from ongoing SaaS monitoring tools?**  
   *Relay Capture is a precision infrastructure audit and enforcement service, not a monthly SaaS subscription. Most monitoring tools generate endless dashboard alerts without fixing the root DNS records. We deliver exact, validated, drop-in DNS configurations within 24 hours, verify end-to-end cryptographic alignment, and exit cleanly.*
5. **05. Will applying these DNS record changes disrupt our existing email operations?**  
   *No. Every remediation blueprint is generated specifically to preserve your existing authorized sending services (Google Workspace, Microsoft 365, Postmark, SendGrid, Amazon SES, HubSpot, etc.). We validate selector uniqueness and SPF mechanism limits (RFC 7208 10-lookup rule) to guarantee zero downtime during DNS propagation.*

---

## 09. DIRECT ENGINEERING CONTACT & FOOTER

### Section Headline
> **Speak directly with an email engineer.**

### Section Subheadline
> Have custom infrastructure with hybrid on-premise Exchange or multiple sub-brands?  
> Send us your domain parameters for a tailored architectural roadmap.

### Interactive Form
* **Fields:**
  * `Work Email *` (e.g. `alex@company.com`)
  * `Primary Domain` (e.g. `company.com`)
  * `Infrastructure Notes / Current ESPs` (e.g. `Google Workspace + SendGrid + HubSpot with 45k monthly transactional sends`)
* **Submit Action Button:** `Transmit Inquiry to Engineering →`
* **Response States:**
  * `Loading:` "Dispatching to Engineering Relay... Querying public nameservers"
  * `Success:` "Inquiry Dispatched Successfully — We've received your domain audit request. Please check your inbox soon at [email] — an email engineer will review your DNS records and follow up shortly."

### Footer Legal & Direct Contact
* **Direct Engineering Inbox:** `sam@relaycapture.com`
* **Legal Links:** `Terms of Service` • `Privacy Policy` • `Refund Policy`
* **Copyright Notice:** `© 2026 Relay Capture Inc. All rights reserved. Zero-Credential DNS Deliverability Engine.`
