
export interface NetworkError {
  data: {
    error: string;
    statusCode: number;
    message: string;
  };
}