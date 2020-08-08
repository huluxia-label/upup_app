import { UserAPI } from '@/interface';

export interface RootState {
  user: UserAPI | null
  cats: any
}