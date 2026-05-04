export type User = {
	default_question: string;
	display_name: string;
	email: string;
	google_sub: string;
	id: number;
	joinedAt: string;
	name: string;
	picture_url: string;
	role: number;
};

export type Session = {
	id: number;
	user_id: number;
	device_id: number;
	question_id: number;
	question: string;
	date: string;
	first_answer_time: string;
	last_answer_time: string;
	stopped_at: string | null;
	votes: number[];
};

export type ApiSuccess<T> = {
	data: T;
	message: string;
	status: number;
	success: true;
	timestamp: string;
};

export type ApiError = {
	message: string;
	status: number;
	success: false;
	timestamp: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
