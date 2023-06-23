import Modal from "react-modal";
import styles from "./styles.module.css";
import { useItemsHistory } from "../../../hooks/useItemsHistory";
import { useUsers } from "../../../hooks/useUsers";

const UserHistoryModal = ({
  chosenBookId,
  closeModal,
}: {
  chosenBookId: string;
  closeModal: () => void;
}) => {
  const [history] = useItemsHistory();
  const [users] = useUsers();

  const chosenBookHistory = history.filter(
    (item) => item.bookId === chosenBookId
  );

  return (
    <Modal
      isOpen={chosenBookId !== ""}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <h2>User history</h2>
        {chosenBookHistory.length > 0 ? (
          <ul>
            {chosenBookHistory.map((item, index) => (
              <li key={index}>
                Action: {item.action}; User username:{" "}
                {users.find((user) => user.id === item.userId)?.username || ""}
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
