export const DECISION_MAKERS_POSITION = {
  founder: 'founder',
  coFounder: 'coFounder',
  managingPartner: 'managingPartner',
  boardMember: 'boardMember',
  chiefExecutive: 'chiefExecutive',
  chiefTechnology: 'chiefTechnology',
  chiefInformation: 'chiefInformation',
  chiefOperating: 'chiefOperating',
  chiefProduct: 'chiefProduct',
  chiefMarketing: 'chiefMarketing',
  chiefGrowth: 'chiefGrowth',
  chiefLegal: 'chiefLegal',
  anyChief: 'anyChief',
  president: 'president',
  vicePresident: 'vicePresident',
  head: 'head',
  director: 'director',
  manager: 'manager',
} as const;
export type TDecisionMakersPosition =
  (typeof DECISION_MAKERS_POSITION)[keyof typeof DECISION_MAKERS_POSITION];
