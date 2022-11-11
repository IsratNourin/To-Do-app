export default interface TodoData {
  id?: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  deadline: string;
  completed?: boolean;
}
