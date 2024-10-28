export const PERSON_ACTIVITY_TYPE = {
  posts: 'posts',
  comments: 'comments',
  reactions: 'reactions',
} as const;
export type TPersonActivityType = (typeof PERSON_ACTIVITY_TYPE)[keyof typeof PERSON_ACTIVITY_TYPE];
