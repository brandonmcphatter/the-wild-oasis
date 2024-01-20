import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings} from "./UseSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSettings} from "./useUpdateSettings.js";

function UpdateSettingsForm() {

    const {isUpdating, updateSettings} = useUpdateSettings();
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();

    if (isLoading) return <Spinner/>;

    function handleUpdate(e, field) {
        const {value} = e.target;
        if (!value) return;
        updateSettings({[field]: value})
    }

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input type='number' id='min-nights'
                       onBlur={(e) => handleUpdate(e, "minBookingLength")}
                       defaultValue={minBookingLength}
                       disabled={isUpdating}/>
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input type='number'
                       onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                       id='max-nights' defaultValue={maxBookingLength}/>
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input type='number'
                       onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                       id='max-guests' defaultValue={maxGuestsPerBooking}/>
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input type='number'
                       onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                       id='breakfast-price' defaultValue={breakfastPrice}/>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
