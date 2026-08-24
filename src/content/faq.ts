export interface FaqItem {
  question: string;
  answer: string;
}

/** Answers the objections a buyer actually has. Also feeds FAQPage JSON-LD. */
export const FAQ: FaqItem[] = [
  {
    question: "What hours do you overlap with my team?",
    answer:
      "I work from Islamabad, which is UTC+5. I guarantee 8:00am to 12:00pm my time for Australian clients, which is 1:00pm to 5:00pm AEST. For the UK that is 2:00pm to 6:00pm my time, or 9:00am to 1:00pm GMT. For US Eastern clients the overlap is 5:00pm to 8:00pm my time, or 8:00am to 11:00am EDT. Outside those windows I work asynchronously and reply within one business day.",
  },
  {
    question: "Who owns the code and the IP?",
    answer:
      "You do. All intellectual property transfers to you on final payment, with no licence retained on my side. The system is deployed to your cloud account, and I hold no credentials after handover.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Yes, before any access is granted. Every case study on this site names an industry rather than a company for exactly this reason.",
  },
  {
    question: "How do you work with an existing in-house team?",
    answer:
      "In your repository, on your branch protection rules, through your review process. I open pull requests your engineers review, rather than delivering a finished black box. Where the team wants to learn the approach, I pair on the first few changes.",
  },
  {
    question: "What happens if the project overruns?",
    answer:
      "On fixed-scope work, an overrun caused by my estimate is my cost. If the scope changes, I re-quote the difference in writing before doing the work, and you decide whether to go ahead. You will not receive a surprise invoice.",
  },
  {
    question: "How do you invoice, and in what currency?",
    answer:
      "USD or AUD, by bank transfer, Wise or Payoneer. Fixed-scope work is 40% on start and 60% on delivery. Retainers are billed monthly in advance.",
  },
  {
    question: "What access do you need to our systems?",
    answer:
      "Read-only repository access to start, and a staging environment rather than production. For identity work I need a test tenant. I do not ask for production database credentials, and I do not need them.",
  },
  {
    question: "What do you not take on?",
    answer:
      "Front-end design work, mobile app development, data-warehouse and BI platform builds, foundation model training from scratch, and AI strategy advisory that does not end in a shipped system. I also turn down work that needs full US Pacific overlap, because I cannot cover those hours honestly.",
  },
  {
    question: "What happens when the engagement ends?",
    answer:
      "You get setup documentation, an architecture document, tests running in your CI, and a recorded walkthrough. Every build includes 30 days of support afterwards for defects in what I delivered. After that, you can bring me back for specific work or carry on without me, which is the point of documenting it properly.",
  },
  {
    question: "Are you a company or an individual?",
    answer:
      "An individual. This is a one-person practice, so you work directly with the engineer doing the work. There is no account manager, and no team behind me to hand your project to. If your project needs more than one engineer, I will tell you at the first call.",
  },
];
