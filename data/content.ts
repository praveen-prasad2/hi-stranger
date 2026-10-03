/**
 * ─────────────────────────────────────────────────────────────
 *  FOR A STRANGER — all personal content lives in this file.
 * ─────────────────────────────────────────────────────────────
 *
 *  You should never need to touch a component to change words,
 *  photos or music. A few conventions:
 *
 *  • "\n" inside a string = a deliberate line break.
 *    (On small phones some breaks relax so lines don't wrap badly.)
 *  • There are no photos on purpose — the story is told in words.
 *  • Music lives at /public/audio/background.mp3. If the file isn't
 *    there, the music option simply never appears.
 *  • In the final letter, a paragraph that starts with "> " is shown
 *    as an emphasised line (the "> " itself is not displayed).
 */

export interface Memory {
  /** Optional, e.g. "June 2026". Leave empty to hide. */
  date?: string;
  title: string;
  description: string;
  /** Tiny handwritten aside shown after the description. */
  aside?: string;
  /** Centered closing entry — used for the last memory. */
  featured?: boolean;
}

export interface SiblingCard {
  front: string;
  /** Handwritten note revealed when the card is tapped. */
  back: string;
}

const sender = "Praveen";
const recipient = "Arshiya";

/** The day it all started. Used across the site. */
const firstMessageDate = "May 6, 2026";
/** Short form used in sentences ("When we first spoke on May 6…"). */
const firstMessageDay = "May 6";

export const siteConfig = {
  recipient,
  sender,

  /* ── The story's key details ──────────────────────────── */
  firstMessageDate,
  firstMessageDay,


  meta: {
    title: "For a Stranger",
    description: "Something small.",
  },

  loader: {
    text: "Something small…",
  },

  /* ── Opening ─────────────────────────────────────────── */
  opening: {
    greeting: "Hey Stranger…",
    tease: "You really thought you could surprise me\nand get away with it?",
    teaseSmile: ":)",
    setup: "Since you started this…",
    payoff: "…I thought I should finish it properly.",
    continueLabel: "Continue",
  },

  /* ── May 6 — the beginning ────────────────────────────── */
  beginning: {
    notTheShirt: "But this story didn't start with a shirt.",
    whileAgo: "It actually started a while ago.",
    // (the date itself comes from firstMessageDate)
    dateLabel: "The beginning.",
    oneMessage: "One message.",
    oneCounsellor: "One counsellor.",
    noIdea: "And absolutely no idea\nwhere any of this was going.",
    backThen: "Back then…",
    counsellor: "You were my counsellor.",
    me: "And I was just the guy\ntrying to figure out his France plan.",
    professional: "Very professional.",
    initially: "Initially, anyway.",
    initiallySmile: ":)",
  },

  /* ── Somewhere along the way ──────────────────────────── */
  alongTheWay: {
    france: "At first, it was about France.",
    serious: ["Applications.", "Plans.", "Documents."],
    seriousStuff: "And all the serious stuff.",
    somewhere: "But somewhere along the way…",
    changed: "The conversations changed.",
    more: ["We talked more.", "We knew more about each other."],
    without: "And without really noticing when it happened…",
    friend: "My counsellor became my friend.",
    somehow: "And somehow…",
    growing: "that friendship kept growing.",
  },

  /* ── Timeline ─────────────────────────────────────────── */
  memoriesHeading: "Somewhere between strangers and now…",

  memories: [
    {
      date: firstMessageDate,
      title: "One message.",
      description:
        "I had no idea that the person I was messaging about France\nwould eventually become this important to me.",
    },
    {
      date: "",
      title: "My counsellor.",
      description: "Back when our conversations were supposed to be\nabout France, applications and plans.",
      aside: "Supposed to be. :)",
    },
    {
      date: "",
      title: "Then we became friends.",
      description:
        "I couldn't tell you exactly when it happened.\n\nThere wasn't one particular moment.\n\nIt just happened naturally.",
    },
    {
      date: "",
      title: "The random conversations.",
      description: "Eventually, there were conversations\nthat had absolutely nothing to do with France.",
    },
    {
      date: "",
      title: "The bond.",
      description:
        "And somewhere between all those conversations,\nlaughs, arguments and random moments…\n\nyou became someone genuinely important to me.",
      featured: true,
    },
  ] satisfies Memory[] as Memory[],

  /** The hidden "don't tap this" in the timeline. */
  memoryEgg: {
    /** Shown right after this memory (0 = first). */
    afterMemory: 3,
    trigger: "don't tap this",
    first: "I literally told you not to.",
    second: "This is why we argue.",
    secondEmoji: "🙄",
    button: "Sorry",
    reply: "No you're not. 😂",
  },

  /* ── The first surprise ───────────────────────────────── */
  firstSurprise: {
    heading: "Then you did something nobody had done before.",
    surprised: "You surprised me.",
    gift: "With a gift.",
    didntRealize: "And you probably didn't realize\nhow much that meant to me.",
    first: "Because you were the first person\nwho ever surprised me with a gift.",
    cried: "I cried.",
    notTheGift: "Not because of what the gift was.",
    someone: "But because someone had actually\nthought about me…",
    decided: "…and decided to surprise me.",
    neverTold: "I don't think I've ever properly told you\nhow much that moment meant.",
  },

  /* ── …and then again ──────────────────────────────────── */
  again: {
    apparently: "And apparently…",
    notEnough: "once wasn't enough for you.",
    smile: ":)",
    didItAgain: "You did it again.",
  },

  /* ── The shirt ────────────────────────────────────────── */
  shirt: {
    thisTime: "This time…",
    wasAShirt: "…it was a shirt.",
    honestly: "And honestly…",
    happy: "I already would've been happy with that.",
    somethingElse: "But then I found something else.",
    openLabel: "Open",
    /** Written on the card when there's no photo of her letter. */
    cardGreeting: "Hey Stranger,",
    theLetter: "The letter.",
    handwritten: "Handwritten.",
    worse: "Of course you had to make it worse.",
    worseSmile: ":)",
  },

  /* ── Her words (a few phrases, not the whole letter) ──── */
  herWords: {
    greeting: "Hey Stranger…",
    phrases: ["A small token of love for you…", "I'm genuinely grateful\nto have a friend like you."],
    thankYou: "Thank you for being there.",
    noIdea: "You have no idea what reading that did to me.",
    yeah: "Yeah…",
    cryAgain: "you made me cry again.",
    cryAgainSmile: ":)",
    iKnow: "I know.",
    embarrassing: "Embarrassing.",
    keeping: "But I'm keeping this one forever.",
  },

  /* ── Why this website exists ──────────────────────────── */
  understand: {
    so: "So…",
    why: "now you understand why this website exists.",
    notReturn: "This isn't me trying to return a gift.",
    notOwed: "This isn't because I felt like\nI had to do something back.",
    justWanted: "I just wanted you to know…",
    matter: "…that the things you do matter.",
    youMatter: "And that you matter to me.",
    moreThan: "More than just as a friend.",
  },

  /* ── Family ───────────────────────────────────────────── */
  family: {
    lines: [
      `When we first spoke on ${firstMessageDay}…`,
      "You were my counsellor.",
      "Then you became my friend.",
      "Then one of my closest friends.",
      "And somewhere along the way…",
    ],
    reveal: "You became family.",
    neverSaid: "I don't know if I've ever\nproperly said this to you.",
    notJustFriend: "But I don't just consider you my friend.",
    sister: "I consider you my sister.",
    reasons: [
      "Not because we're related.",
      "Not because we have to be.",
      "But because that's genuinely\nthe place you have in my life now.",
    ],
    timeline: {
      from: firstMessageDate,
      fromLabel: "My counsellor.",
      to: "Today",
      toLabel: "My sister.",
    },
    unfortunately: "Unfortunately for you…",
    stuck: "you're stuck with an annoying brother now.",
    smile: ":)",
  },

  /* ── Sibling cards ────────────────────────────────────── */
  sibling: {
    heading: "Being my unofficial sister apparently means…",
    hint: "(tap them)",
    cards: [
      { front: "Listening to my nonsense.", back: "Daily. Unpaid." },
      { front: "Giving advice I may or may not follow.", back: "Occupational hazard." },
      { front: "Random arguments.", back: "I was right, though." },
      { front: "Checking whether I'm alive.", back: "Still alive. Barely." },
      { front: "Making fun of each other.", back: "You started it." },
      { front: "Still being there afterwards.", back: "Every single time." },
    ] satisfies SiblingCard[] as SiblingCard[],
    outro: "Pretty accurate, actually.",
  },

  /* ── Life is changing ─────────────────────────────────── */
  future: {
    heading: "Life is changing.",
    more: "And it's going to change even more.",
    list: ["New places.", "New people.", "New responsibilities.", "New memories.", "New chapters."],
    beautiful: "And that's a beautiful thing.",
    lines: [
      "I don't know what our lives will look like\nyears from now.",
      "But wherever life takes us…",
      "I hope you're ridiculously happy.",
      "I hope you build a life\nthat makes you smile when you wake up.",
      "And whenever things get difficult…",
      "I hope you remember you're never completely alone.",
    ],
    somewhere: "Because somewhere out there…",
    brother: "…you've got an annoying brother.",
    smile: ":)",
  },

  /* ── The last envelope + final letter ─────────────────── */
  lastLetter: {
    intro: "One last thing.",
    envelopeLabel: "For the stranger.",
    openLabel: "Open when ready",
    closeLabel: "Fold it back",
    /** Written just before the hand-drawn signature. */
    signOff: "—",
  },

  letter: `Hey Stranger,

It's funny thinking about where all this started.

> ${firstMessageDate}.

You were my counsellor.

I was just trying to figure out my France plan.

And neither of us had any idea that one simple conversation would eventually turn into this.

Somewhere along the way,
you stopped being just my counsellor.

You became my friend.

Then one of the people I could genuinely count on.

And eventually…

> family.

There are things you've done that you probably don't even realize meant so much to me.

You were the first person who ever surprised me with a gift.

I still remember how that felt.

I cried.

Not because of the gift itself.

But because somebody had actually thought about me enough to plan a surprise.

> That person was you.

And now you've done it again.

The shirt was already enough.

But then I found your letter.

‘Hey Stranger…’

I read every line.

And when I reached,

‘Thank you for being there…’

yeah…

you made me cry again.

There are some things that are difficult to explain properly in normal conversations.

This is probably one of them.

So I'll just say it here.

> You're genuinely very special to me, ${recipient}.

You entered my life as my counsellor.

You stayed as my friend.

And somewhere along the way,
I started considering you the sister I got to choose in life.

I don't know where life is going to take either of us.

Things will change.

Plans will change.

People will come and go.

We'll both have completely different chapters ahead of us.

But wherever life takes you,
I'll always want to see you happy.

And if years from now you somehow find this little website again…

I hope you remember ${firstMessageDay}.

Because neither of us knew it then,

but that random conversation gave me someone
who would eventually become family.

You thanked me for being there.

So let me say it back properly.

Thank you for being there too.

Thank you for the surprises.

Thank you for the conversations.

Thank you for the memories.

> And thank you for becoming the sister
> I never expected to find.

Take care of yourself, Stranger.

And don't worry.

Your annoying brother isn't going anywhere.`,

  /* ── The fake ending ──────────────────────────────────── */
  fakeEnding: {
    thatsIt: "That's it.",
    seriously: "Seriously.",
    dots: "…",
    okay: "Okay.",
    enough: "That was enough emotion for one day.",
    backToNormal: "Back to normal.",
    button: "What now?",
  },

  /* ── P.S. ─────────────────────────────────────────────── */
  callback: {
    ps: "P.S.",
    nuts: "Don't forget to eat the nuts. 😌",
    andYes: "And yes…",
    website: "I made an entire website\nbecause of your letter.",
    technically: "Technically…",
    yourFault: "this whole thing is your fault.",
    laugh: "😂",
    button: `Shut up, ${sender}`,
    better: "Much better.",
    knowYou: `That's the ${recipient} I know.`,
    knowYouSmile: ":)",
    final: "Take care, sister. 🤍",
  },

  /* ── The star in the corner ───────────────────────────── */
  easterEgg: {
    label: "A tiny star",
    heading: "You found this?",
    lines: ["Fine.", "One extra message."],
    message: [
      "I'm genuinely proud of you, stranger.",
      "And whatever happens…",
      "don't forget how far you've come.",
    ],
    goBeHappy: "Now go be happy.",
    signature: "— your annoying brother 🤍",
    button: "🤍",
  },

  /* ── Music ────────────────────────────────────────────── */
  music: {
    src: "/audio/background.mp3",
    /** 0–1. Kept low on purpose. */
    volume: 0.45,
    prompt: "Music?",
    yes: "Yes",
    no: "Keep it quiet",
  },
};

export type SiteConfig = typeof siteConfig;
