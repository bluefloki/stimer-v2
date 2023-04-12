import type { GlobalData, Task } from '$lib/types';
import { writable } from 'svelte/store';

export const tasks = writable<Task[]>();
export const openDrawer = writable(false);
