import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {

    const {data, error} = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.log(error);
        throw new Error('there was an error fetching cabins')
    }

    return data;
}

export async function deleteCabin(id) {

    const {error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error);
        throw new Error('there was an error deleting cabin')
    }

}

export async function createCabin(newCabin) {

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // create cabin
    const {data, error} = await supabase
        .from('cabins')
        .insert([{...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error);
        throw new Error('there was an error creating cabin')
    }

    // upload image
    if (hasImagePath) return data;
    const {error: storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // delete cabin if image upload error
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.log(storageError);
        throw new Error('there was an error uploading image (cabin not created)')
    }
    return data;
}

export async function editCabin(newCabin, id) {

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // edit cabin

    const { data, error } = await supabase
        .from('cabins')
        .update({ ...newCabin, image: imagePath})
        .eq('id', id)
        .select()



    if (error) {
        console.log(error);
        throw new Error('there was an error editing cabin')
    }

    // upload image
    const {error: storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // delete cabin if image upload error
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.log(storageError);
        throw new Error('there was an error uploading image (cabin not created)')
    }
    return data;
}