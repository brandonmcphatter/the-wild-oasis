import Button from "../../ui/Button.jsx";
import Window from "../../ui/Window.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Window.jsx";


function AddCabin(){

    return <Modal >
        <Window.Open opens={'cabin-form'}>
            <Button >Add New Cabin</Button>
        </Window.Open>
        <Window.Window name={'cabin-form'}>
            <CreateCabinForm/>
        </Window.Window>

    </Modal>
}
// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//
//     function closeModal() {
//         setIsOpenModal(false)
//     }
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(!isOpenModal)}>Add New Cabin</Button>
//             {isOpenModal && <Modal onClose={closeModal}><CreateCabinForm closeModal={closeModal}/></Modal>}
//         </div>
//     )
//
// }
//
export default AddCabin
