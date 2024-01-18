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

export async function deleteCabin(id) {

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error);
        throw new Error('there was an error deleting cabin')
    }

}

export async function createCabin(newCabin) {

    const { data, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select()

    if (error) {
        console.log(error);
        throw new Error('there was an error creating cabin')
    }

    return data;
}