import { useState, useCallback, useContext } from 'react'
import PreviewIcon from '@mui/icons-material/Preview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Modal from '@mui/material/Modal';
import styles from './ActionButton.module.scss'
import { Context } from '@/context/Context';

const ActionButton = ({idComment}: any) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { dispatch, findedComments } = useContext(Context)
    const { id, name, email, body } = findedComments

    const handleOpenModal = useCallback(() => {
        setModalIsOpen(!modalIsOpen)
        dispatch({type: 'OPEN_COMMENT', payload: idComment})
    }, [modalIsOpen])

    return (
        <>
            <div role='open-modal' className={styles.preview_icon} onClick={handleOpenModal}>
                <PreviewIcon />
            </div>
            {
                modalIsOpen ?
                <Modal
                    open={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div role='modal-container' className={styles.modal}>
                        <span role='close-modal' onClick={() => setModalIsOpen(false)}><CloseIcon /></span>
                        <div className={styles.user_comment}>
                            <div className={styles.user_info}>
                                <FingerprintIcon style={{color: '#f3732f'}} />
                                <span>{id}</span>
                            </div>
                            <div className={styles.user_info}>
                                <AlternateEmailIcon style={{color: '#f3732f'}}/>
                                <span>{email}</span> 
                            </div>
                        </div>
                        <div className={styles.comment_body}>
                            <div>
                                <AccountCircleIcon style={{color: '#f3732f'}}/>
                                <span>{name}</span>
                            </div>
                            <div className={styles.comment}>
                                <p>{body}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
                :
                null
            }
        </>
    )
}

export default ActionButton