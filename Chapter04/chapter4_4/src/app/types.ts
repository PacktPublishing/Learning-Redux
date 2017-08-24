export type Post = {
  user: string;
  text: string;
};

export interface IAppState {
  filter?: string;
  posts?: Array<Post>;
}
