export const convertFromSeconds = (totalSeconds: number) => {
	let h = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let m = Math.floor(totalSeconds / 60);
	let s = totalSeconds % 60;

	return { h, m, s };
};

export const formatTime = (value: number) => {
	const h = Math.floor(value / 3600);
	const m = Math.floor((value % 3600) / 60);
	const s = Math.floor((value % 3600) % 60);

	if (h !== 0)
		return `${padWithZeroes(h)} : ${padWithZeroes(m)} : ${padWithZeroes(s)}
    `;
	else
		return `${padWithZeroes(m)} : ${padWithZeroes(s)}
    `;
};

export const getTotalHours = (value: number) => {
	const h = Math.floor(value / 3600);

	return h;
};

export const getDifferenceInDays = (d1: Date) => {
	let date1 = new Date(d1);
	let date2 = new Date();

	const Difference_In_Time = date2.getTime() - date1.getTime();

	// To calculate the no. of days between two dates
	const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

	console.log(Difference_In_Days);

	return Math.floor(Difference_In_Days);
};

export const padWithZeroes = (number: number) => number.toString().padStart(2, '0');
