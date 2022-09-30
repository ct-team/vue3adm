export interface SearchRequest {
  user: string;
  region: string;
}

export interface FormInfo {
  date: string;
  name: string;
  address: string;
}

export interface TableRow extends FormInfo {
  id: number;
}

export interface ResponseInfo {
  code: number;
  data: any;
  message: string;
}
