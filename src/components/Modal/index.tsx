import { ReactNode } from "react";
import ReactModal from "react-modal";
import styles from "./styles.module.css";

const Modal = ({
  isOpen,
  closeModal,
  title,
  children,
}: {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
