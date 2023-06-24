import { useItemsHistory } from "../../../hooks/useItemsHistory";
import { useUsers } from "../../../hooks/useUsers";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

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
      closeModal={closeModal}
      title="User history"
    >
      <>
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
        <Button variant="secondary" label="Close modal" onClick={closeModal} />
      </>
    </Modal>
  );
};

export default UserHistoryModal;
