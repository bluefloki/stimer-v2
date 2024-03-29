import type { Task } from '$lib/types';
import { writable } from 'svelte/store';

export const task = writable<Task>({
	title: '',
	timeInSeconds: 0
});

export const openDrawer = writable(false);

export const completedTasks = writable<Task[]>([]);
