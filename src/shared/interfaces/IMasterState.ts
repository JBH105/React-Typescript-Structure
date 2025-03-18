export interface IMasterState<T> {
  data: T[];
  selectedId: string;
  isActive: boolean;
  loading: boolean;
  isSuccess?: boolean;
  error?: string | null;
}

export function buildInitialState<T>(): IMasterState<T> {
  return {
    data: [] as T[],
    selectedId: '',
    isActive: true,
    loading: false,
    error: null,
  };
}
