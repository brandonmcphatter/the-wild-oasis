import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin as createCabinAPI} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

export function useCreateCabin() {

    const queryClient = useQueryClient();
    const {reset} = useForm();
    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createCabinAPI,
        onSuccess: () => {
            toast.success('New Cabin Created');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    })

return  {isCreating, createCabin}
}

