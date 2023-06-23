import Modal from "react-modal";
import styles from "./styles.module.css";
import { useItemsHistory } from "../../../hooks/useItemsHistory";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

const UserHistoryModal = ({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
}) => {
  const [history] = useItemsHistory();
  const [currentUser] = useCurrentUser();

  if (!currentUser) return <div />;

  const currentUserHistory = history.filter(
    (item) => item.userId === currentUser.id
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <h2>User history</h2>
        {currentUserHistory.length > 0 ? (
          <ul>
            {currentUserHistory.map((item, index) => (
              <li key={index}>
                Action: {item.action}; Book id: {item.bookId}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history</p>
        )}
        <button onClick={closeModal}>Close modal</button>
      </div>
    </Modal>
  );
};

export default UserHistoryModal;
