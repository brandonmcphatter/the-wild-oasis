import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";









function CreateCabinForm() {
    const {register, handleSubmit, reset, getValues, formState} = useForm();

    const {errors} = formState;

    const queryClient = useQueryClient();

    const {mutate, isLoading: isCreating} = useMutation({
        mutationFn: createCabin,
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


    function onSubmit(data) {
        mutate(data);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label={'Cabin Name'} error={errors?.name?.message}>
                <Input type="text" id="name" {...register('name', {required: 'This Field is Required'})}/>
            </FormRow>

            <FormRow label={'Maximum Capacity'} error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" {...register('maxCapacity', {
                    required: 'This Field is Required',
                    min: {value: 1, message: 'Capacity cannot be less than 1'}
                })}/>
            </FormRow>

            <FormRow label={'Regular Price'} error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" {...register('regularPrice', {
                    required: 'This Field is Required',
                    min: {value: 1, message: 'Price cannot be less than 1'}
                })}/>
            </FormRow>

            <FormRow label={'Discount'} error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0} {...register('discount', {
                    required: 'This Field is Required', validate: (value) =>
                        value < getValues().regularPrice || 'Discount should be less than regular price'
                })}/>
            </FormRow>

            <FormRow label={'Description'} error={errors?.description?.message}>
                <Textarea type="number" id="description"
                          defaultValue="" {...register('description', {required: 'This Field is Required'})}/>
            </FormRow>

            <FormRow label={'Cabin Photo'}>
                <FileInput id="image" accept="image/*"/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
