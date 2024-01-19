import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinAPI} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

export function useDeleteCabin() {
    const {reset} = useForm();
    const queryClient = useQueryClient();

    const {mutate: deleteCabin, isLoading: isDeleting} = useMutation({
        mutationFn: deleteCabinAPI,
        onSuccess: () => {
            toast.success('Cabin Deleted Successfully');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    })

    return {isDeleting, deleteCabin}
}
