import supabase from "./supabase.js";

export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.log(error);
        throw new Error('there was an error fetching cabins')
    }

    return data;
}