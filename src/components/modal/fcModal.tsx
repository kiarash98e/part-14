import React from 'react'
import { useUi } from '../../redux/selectors/ui/uiState'
import AddTask from '../addTask/addTask';
import DeleteTask from '../deleteTask/deleteTask';
import EditTask from '../editTask/editTask';
import Modal from "./modal"



const ManagedModal: React.FC = () => {
   
    const { uiState, uiCloseModal } = useUi()
    const modalViwe = uiState.modalView

     return (
		<>
            <Modal open={uiState.displayModal} onClose={uiCloseModal}>
                {modalViwe === "Add" && <AddTask /> }
                {modalViwe === "Delete" && <DeleteTask /> }
                {modalViwe === "Edit" && <EditTask /> }
            </Modal>
        </>
	);
};

export default ManagedModal;
