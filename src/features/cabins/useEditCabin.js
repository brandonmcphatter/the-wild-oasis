import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editCabin as editCabinAPI} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {

    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isUpdating} = useMutation({
        mutationFn: ({ newCabinData, editId }) => editCabinAPI(newCabinData, editId),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    })

    return {editCabin, isUpdating}
}