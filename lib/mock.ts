export const categories = [
  { id: 1, name: "Technology", slug: "technology" },
  { id: 2, name: "Design", slug: "design" },
  { id: 3, name: "Culture", slug: "culture" },
  { id: 4, name: "Science", slug: "science" },
  { id: 5, name: "Programming", slug: "programming" },
];

export const posts = [
  {
    id: 1,
    title: "The Quiet Revolution of Typographic Design in the Digital Age",
    slug: "typographic-design-digital-age",
    excerpt:
      "Typography is no longer just about choosing fonts — it has become the primary language through which digital experiences communicate personality, urgency, and trust.",
    content: `Typography is no longer just about choosing fonts — it has become the primary language through which digital experiences communicate personality, urgency, and trust.

For decades, designers treated type as a vessel for content: a neutral carrier that delivered words from page to reader. But somewhere between the desktop publishing revolution and the mobile-first era, something shifted. Typography became the content itself.

Consider the rise of editorial design studios like Order and Pentagram, who use oversized display type as the central visual element — not decoration, but structure. Their work treats letterforms as architecture: load-bearing, expressive, deliberate.

The web has finally caught up. Variable fonts, now supported across all major browsers, allow a single font file to contain an entire spectrum of weights, widths, and optical sizes. This isn't just a performance win — it's a creative unlock. Designers can now animate weight, stretch characters across breakpoints, and create typographic systems that feel alive.

What does this mean for the average product team? Everything. The era of "just use Inter and ship it" is ending. Typography is now a competitive differentiator, a brand signal, a trust mechanism. Teams that invest in typographic craft will stand apart in an increasingly homogenous digital landscape.

The question isn't whether to care about typography. It's whether you can afford not to.`,
    author: "Priya Nair",
    authorUsername: "priyanair",
    date: "Mar 9, 2026",
    readingTime: "5 min read",
    category: "Design",
    categorySlug: "design",
    tags: ["Typography", "Design", "Web"],
    featured: true,
  },
  {
    id: 2,
    title: "Why Most AI Products Will Fail in the Next 18 Months",
    slug: "ai-products-will-fail",
    excerpt:
      "The AI gold rush has produced thousands of products, but the majority are built on a fundamental misunderstanding of what people actually need from software.",
    content: `The AI gold rush has produced thousands of products, but the majority are built on a fundamental misunderstanding of what people actually need from software.

Here's the uncomfortable truth: most AI products are solutions in search of problems. They're built because the technology is impressive, not because there's a genuine unmet need. And that mismatch is about to become very expensive.

The products that will survive share three characteristics. First, they solve a problem that's genuinely painful — not just inconvenient, but painful enough that people actively seek relief. Second, they solve it meaningfully better than the existing alternative, whether that's another tool, a human, or doing nothing. Third, they fit into how people actually work, rather than demanding behavioral change.

The products that will fail are doing the opposite. They're building on top of capabilities that impress in demos but frustrate in daily use. They're replacing workflows that weren't broken. They're adding AI to things because they can, not because they should.

The next 18 months will be a shakeout. The companies that survive won't be the ones with the most impressive models — they'll be the ones who understood the problem before they wrote a line of code.`,
    author: "Marcus Webb",
    authorUsername: "marcuswebb",
    date: "Mar 8, 2026",
    readingTime: "7 min read",
    category: "Technology",
    categorySlug: "technology",
    tags: ["AI", "Startups", "Product"],
    featured: false,
  },
  {
    id: 3,
    title: "The Case for Slower Software",
    slug: "case-for-slower-software",
    excerpt:
      "Speed is worshipped in tech culture. But some of the most meaningful software experiences are built on deliberate friction, not frictionless flow.",
    content: `Speed is worshipped in tech culture. Faster load times, faster feedback loops, faster shipping cycles. The entire field has oriented itself around the elimination of waiting.

But there's a different tradition — one that's easy to miss when you're inside the industry. Some of the most meaningful software experiences are built on deliberate friction.

Consider Notion's early writing mode, which stripped away all formatting options and forced writers into a single column of text. Or Day One's morning journal prompt that appears only once, at a fixed time, and disappears if you don't respond. Or the original Instapaper, which removed everything from a webpage except the words.

These aren't accidents. They're design decisions rooted in a belief that friction, used well, creates presence. When software slows you down intentionally, it signals: this moment matters. Pay attention.

The counterintuitive insight is that users don't always want less friction. They want the right friction — the kind that creates meaning, not the kind that causes frustration. The distinction requires deep understanding of what people are actually trying to accomplish, and what they'd miss if it were gone.

Building slower software is harder than building faster software. It requires resisting the pressure to add features, to optimize conversion, to eliminate every point of hesitation. But for certain kinds of experiences — journaling, reading, deep work, creativity — it's the only approach that actually works.`,
    author: "Leila Osman",
    authorUsername: "leilaosman",
    date: "Mar 7, 2026",
    readingTime: "6 min read",
    category: "Design",
    categorySlug: "design",
    tags: ["UX", "Design", "Philosophy"],
    featured: false,
  },
  {
    id: 4,
    title: "Rust in Production: A Honest Assessment After Two Years",
    slug: "rust-in-production-honest-assessment",
    excerpt:
      "Two years ago we rewrote our core data pipeline in Rust. Here's what we got right, what we got wrong, and what we'd do differently.",
    content: `Two years ago we rewrote our core data pipeline in Rust. The decision was controversial at the time — our team was primarily Go and Python developers, and Rust has a reputation for steep learning curves and long compile times.

Two years in, here's our honest assessment.

What we got right: performance. Our pipeline now processes 40x more events per second on equivalent hardware. Memory usage dropped by 60%. Latency at the 99th percentile went from 800ms to under 50ms. These aren't marginal gains — they're transformative.

What we got wrong: hiring. Rust developers are scarce. We've lost two excellent engineers who were uncomfortable with the language, and onboarding has taken longer than expected. We underestimated how much institutional knowledge gets locked inside the borrow checker's mental model.

What we'd do differently: start with a smaller surface area. We rewrote too much at once. A better approach would have been to identify the single most performance-critical component and prove the value there before expanding.

The verdict: Rust is worth it if you have the right team and the right problem. It's not worth it as a prestige project or a hedge against future performance concerns that may never materialize. Solve real problems with it, and it will reward you generously.`,
    author: "Dev Sharma",
    authorUsername: "devsharma",
    date: "Mar 6, 2026",
    readingTime: "9 min read",
    category: "Programming",
    categorySlug: "programming",
    tags: ["Rust", "Engineering", "Systems"],
    featured: false,
  },
  {
    id: 5,
    title: "On the Ethics of Attention: What Social Media Took From Us",
    slug: "ethics-of-attention",
    excerpt:
      "The attention economy isn't just an economic model — it's a moral framework that has quietly reshaped how we value human time and experience.",
    content: `The attention economy isn't just an economic model — it's a moral framework that has quietly reshaped how we value human time and experience.

When we describe social media platforms as "attention merchants," we're reaching for a metaphor that feels apt but perhaps too gentle. Merchants sell things voluntarily. What social platforms do is closer to a kind of extraction: they've built systems optimized for capturing attention that would otherwise go elsewhere, then monetized that capture without compensating the people whose attention they've taken.

This isn't a new critique. But the moral weight of it has, I think, been underappreciated. Because attention is not an abstract resource. It's time. It's the medium through which we experience everything that matters in a human life: relationships, beauty, growth, rest. When we speak of attention being "captured" or "stolen," we're speaking literally.

The counterargument is familiar: people choose to use these platforms. No one is forced. But choice in environments specifically designed to override considered judgment is a strange kind of choice. We don't usually say that someone chose to be manipulated.

What would it mean to take this seriously as an ethical matter? It would mean treating the design of digital systems as a moral practice, not just an engineering one. It would mean measuring success differently — not by engagement, but by what people report their time was worth.

We're not there yet. But the conversation is beginning, and that's worth something.`,
    author: "Aisha Farooq",
    authorUsername: "aishafarooq",
    date: "Mar 5, 2026",
    readingTime: "8 min read",
    category: "Culture",
    categorySlug: "culture",
    tags: ["Ethics", "Social Media", "Philosophy"],
    featured: false,
  },
  {
    id: 6,
    title: "The James Webb Telescope Is Rewriting Cosmology",
    slug: "james-webb-changing-cosmology",
    excerpt:
      "Early galaxy observations from JWST are challenging our standard model of cosmology in ways scientists are still struggling to explain.",
    content: `Something unexpected is happening at the edge of the observable universe, and cosmologists are quietly scrambling to understand it.

The James Webb Space Telescope has been returning images of galaxies so massive, so well-formed, and so ancient that they shouldn't exist according to our current best models of how the universe evolved.

The standard model of cosmology predicts a gradual hierarchical assembly of galaxies. Small structures form first, then merge and grow over billions of years. The universe's earliest epochs should contain only small, irregular, chaotic proto-galaxies.

Instead, Webb is finding massive, disk-shaped, chemically complex galaxies appearing within the first billion years of cosmic history. Some of them are larger than the Milky Way. They look, structurally, like modern galaxies — but they have no business existing that early.

Three explanations are currently under serious discussion. First, Lambda-CDM is incomplete and needs modification. Second, the photometric redshifts being used to date these galaxies are systematically off. Third — and most provocatively — our understanding of how quickly stars can form and enrich their environments with heavy elements is wrong.

Science at its most honest looks like this: data arrives that doesn't fit, and everyone argues about what it means. We are, right now, in one of those rare moments.`,
    author: "Kofi Mensah",
    authorUsername: "kofimensah",
    date: "Mar 4, 2026",
    readingTime: "10 min read",
    category: "Science",
    categorySlug: "science",
    tags: ["Space", "Cosmology", "JWST"],
    featured: false,
  },
  {
    id: 7,
    title: "Building in Public: Six Months of Radical Transparency",
    slug: "building-in-public-six-months",
    excerpt:
      "We shared our revenue, our failures, and our product decisions publicly for six months. Here's what we learned about trust, attention, and the limits of openness.",
    content: `Six months ago we made a decision that made our investors nervous: we would share everything publicly. Revenue numbers. Churn rate. Failed experiments. Decisions we were uncertain about.

The results were surprising, and not in the ways we expected.

The first thing we learned is that transparency is exhausting. Not because of the writing — we'd underestimated how much energy goes into translating internal decisions into narratives that are honest without being misleading. There's a version of building in public that's just marketing with better aesthetics. We wanted something different.

The second thing we learned is that the right audience finds you. Our public posts attracted a specific kind of person: thoughtful, patient, interested in process as much as outcome. These became our best customers and our most useful critics.

The third thing — the one we didn't expect — is that public accountability changed how we made decisions. When you know you'll have to explain a choice to an audience that cares, you make better choices.

Would we do it again? Yes, but differently. We'd invest more in the writing quality earlier. We'd be more selective about what to share, rather than defaulting to everything. And we'd set clearer expectations with our team about the emotional labor involved.

Transparency isn't a strategy. It's a practice.`,
    author: "Nina Park",
    authorUsername: "ninapark",
    date: "Mar 3, 2026",
    readingTime: "8 min read",
    category: "Technology",
    categorySlug: "technology",
    tags: ["Startups", "Transparency", "Building"],
    featured: false,
  },
  {
    id: 8,
    title: "The Return of Long-Form Writing in the Age of Fragments",
    slug: "return-of-long-form-writing",
    excerpt:
      "Against all predictions, long-form writing is having a renaissance. But the audiences consuming it aren't the ones anyone expected.",
    content: `Against all predictions, long-form writing is having a renaissance.

For years, the received wisdom was that the internet was killing deep reading. Attention spans were fragmenting. Twitter had trained us to think in bursts. TikTok had trained us to think in clips. The future of communication was visual, short, immediate.

And yet: newsletter platforms are growing faster than ever. The most-shared articles on social media are increasingly long — not despite their length, but because of it.

What happened?

Part of the answer is saturation. When everything is short, length itself becomes a differentiator. Reading a 3,000-word essay signals commitment — both from the writer, who had the discipline to develop an idea fully, and from the reader, who is choosing depth over breadth.

Part of the answer is trust. Long-form writing, when it's honest, reveals how a person thinks. Not just what they conclude, but how they reason, what they notice, what they doubt. That kind of transparency creates a different relationship than a hot take can.

We never lost the appetite for depth. We just lost the infrastructure. Now it's back.`,
    author: "Priya Nair",
    authorUsername: "priyanair",
    date: "Mar 2, 2026",
    readingTime: "6 min read",
    category: "Culture",
    categorySlug: "culture",
    tags: ["Writing", "Media", "Culture"],
    featured: false,
  },
  {
    id: 9,
    title: "Zero-Knowledge Proofs: A Primer for Engineers Who Skipped Crypto Class",
    slug: "zero-knowledge-proofs-primer",
    excerpt:
      "ZK proofs are transforming how we think about privacy and verification. Here's the intuition behind them, without the math.",
    content: `Zero-knowledge proofs sound exotic, but the intuition behind them is simpler than you might expect.

Here's the core idea: a zero-knowledge proof allows one party (the prover) to convince another party (the verifier) that a statement is true, without revealing any information beyond the truth of the statement itself.

The classic example is the "Ali Baba cave" thought experiment. Imagine a circular cave with a magic door in the middle that requires a secret password to open. You want to prove to a friend that you know the password, without telling them the password.

Here's how you do it: your friend waits outside while you enter the cave and go down either the left or right path. Your friend then calls out a direction — left or right — and you must emerge from that direction. If you know the password, you can open the door and emerge from whichever direction is requested. Repeat this many times, and the probability of succeeding by luck approaches zero.

That's a zero-knowledge proof. You've proven you know the password, without revealing the password.

In practice, ZK proofs are used for privacy-preserving authentication, scalable blockchain verification, and confidential computing. The engineering applications are still early, but they're real.`,
    author: "Dev Sharma",
    authorUsername: "devsharma",
    date: "Mar 1, 2026",
    readingTime: "11 min read",
    category: "Programming",
    categorySlug: "programming",
    tags: ["Cryptography", "ZK", "Engineering"],
    featured: false,
  },
  {
    id: 10,
    title: "Grief in the Workplace: The Conversation We're Not Having",
    slug: "grief-in-the-workplace",
    excerpt:
      "Most companies have policies for bereavement. Almost none have a culture that actually accommodates grief. That gap costs everyone.",
    content: `Most companies have bereavement policies. Three days for a parent, one or two for a sibling, sometimes more for a spouse. You get your time, you return to work, and the expectation — rarely stated, always felt — is that you are functional again.

Grief doesn't work that way.

The research on grief is unambiguous: the acute phase often lasts months, not days. Cognitive function is measurably impaired. Memory, concentration, and decision-making all suffer. People who have experienced loss often describe feeling "present but absent" — physically at work, but unable to access their full selves.

And yet our workplace cultures treat grief as a discrete event with a known end date. You had your time. Now come back and contribute.

What would it look like to actually accommodate grief? It would mean flexible work arrangements that persist longer than a week. It would mean managers trained to check in meaningfully, not just once. It would mean measuring output rather than hours.

The conversation we're not having isn't about policy. It's about what we actually believe about the relationship between work and human experience.`,
    author: "Aisha Farooq",
    authorUsername: "aishafarooq",
    date: "Feb 28, 2026",
    readingTime: "7 min read",
    category: "Culture",
    categorySlug: "culture",
    tags: ["Work", "Mental Health", "Culture"],
    featured: false,
  },
];
