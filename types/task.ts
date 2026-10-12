
export type Tag = { id: number; tag_name: string; color: string };

export type Task = {
  id: number;
  title: string;
  description: string | null;
  role_over: boolean;
  tags: Tag[];
  date: string;
};
export type tagPriority = {
  id: number;
  priority: number;
  auth_id: string;
  tag_id: number;
};