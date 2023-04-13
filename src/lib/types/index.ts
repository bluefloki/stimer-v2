export type Task = {
	id?: number;
	createdAt?: Date;
	title: string;
	timeInSeconds: number;
};

export type GlobalData = {
	id: number;
	createdAt: Date;
	key: string;
	value: Stats;
};

type Stats = {
	totalTimeSpent: number;
};
