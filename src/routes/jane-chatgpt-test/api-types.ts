export type ReplyRequest = Partial<{
  question: string;
}>;

export type ReplyResponse = {
  reply: string;
};
