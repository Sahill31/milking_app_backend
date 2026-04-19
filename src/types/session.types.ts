export interface CreateSessionInput {
  start_time: string;
  end_time?: string;
  milk_quantity: number;
}

export interface GetSessionsQuery {
  page?: number;
  limit?: number;
}


export interface SessionResponse {
  _id: string;
  start_time: Date;
  end_time?: Date;
  duration?: number;
  milk_quantity: number;
}