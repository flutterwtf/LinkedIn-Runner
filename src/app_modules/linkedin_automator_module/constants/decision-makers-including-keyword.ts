import { DECISION_MAKERS_POSITION } from './decision-makers-position';

export const DECISION_MAKERS_INCLUDING_KEYWORD = {
  [DECISION_MAKERS_POSITION.founder]: /(?<!-)\bfounder\b/i,
  [DECISION_MAKERS_POSITION.coFounder]: /\bco-founder\b/i,
  [DECISION_MAKERS_POSITION.managingPartner]: /(?=.*\bmanaging\b)(?=.*\bpartner\b)/i,
  [DECISION_MAKERS_POSITION.boardMember]: /(?=.*\bboard\b)(?=.*\bmember\b)/i,
  [DECISION_MAKERS_POSITION.president]: /(?<!vice\s+)\bpresident\b/i,
  [DECISION_MAKERS_POSITION.vicePresident]: {
    full: /(?=.*\bvice\b)(?=.*\bpresident\b)/i,
    short: /\bvc\b/i,
  },
  [DECISION_MAKERS_POSITION.head]: /\bhead\b/i,
  [DECISION_MAKERS_POSITION.director]: /\bdirector\b/i,
  [DECISION_MAKERS_POSITION.manager]: /\bmanager\b/i,
  [DECISION_MAKERS_POSITION.chiefExecutive]: {
    executive: /(?=.*\bchief\b)(?=.*\bExecutive\b)/i,
    ceo: /\bceo\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefTechnology]: {
    technology: /(?=.*\bchief\b)(?=.*\bTechnology\b)/i,
    cto: /\bcto\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefInformation]: {
    information: /(?=.*\bchief\b)(?=.*\bInformation\b)/i,
    cio: /\bcio\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefOperating]: {
    operating: /(?=.*\bchief\b)(?=.*\bOperating\b)/i,
    coo: /\bcoo\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefProduct]: {
    product: /(?=.*\bchief\b)(?=.*\bProduct\b)/i,
    cpo: /\bcpo\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefMarketing]: {
    marketing: /(?=.*\bchief\b)(?=.*\bMarketing\b)/i,
    cmo: /\bcmo\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefGrowth]: {
    growth: /(?=.*\bchief\b)(?=.*\bGrowth\b)/i,
    cgo: /\bcgo\b/i,
  },
  [DECISION_MAKERS_POSITION.chiefLegal]: {
    legal: /(?=.*\bchief\b)(?=.*\bLegal\b)/i,
    clo: /\bclo\b/i,
  },
  [DECISION_MAKERS_POSITION.anyChief]: {
    anyChief: /\bchief\b/i,
    anyCLevel: /\bC\w{1}O\b/i,
  },
} as const;
