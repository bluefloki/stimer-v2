import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { data }: { data: any } = await supabase.from('globals').select('*');

	if (!locals.user) throw redirect(302, '/login');

	return {
		globalData: data[0]
	};
};
