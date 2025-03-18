import { ApiMethod } from "@shared/types/app.type";

export function pathWithId(url: string, id: string) {
  return `${url}/${id}`;
}

export const getAttendanceActionFromMethod = (method: ApiMethod): string => {
  switch (method) {
    case 'post':
      return 'assigned';
    case 'put':
      return 'updated';
    case 'delete':
      return 'removed';
    default:
      return 'performed';
  }
};

export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
export const getActionFromMethod = (method: ApiMethod): string => {
  switch (method) {
    case 'post':
      return 'Created';
    case 'put':
      return 'Updated';
    case 'delete':
      return 'Deleted';
    default:
      return 'Performed';
  }
};