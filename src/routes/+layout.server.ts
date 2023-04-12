import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const { data }: { data: any } = await supabase.from('globals').select('*');

	return {
		globalData: data[0]
	};
}) satisfies LayoutServerLoad;
