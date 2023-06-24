import { useItemsHistory } from "../../../hooks/useItemsHistory";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Button from "../../Button";
import Modal from "../../Modal";

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
    <Modal isOpen={isModalOpen} closeModal={closeModal} title="User history">
      <>
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
        <Button variant="secondary" label="Close modal" onClick={closeModal} />
      </>
    </Modal>
  );
};

export default UserHistoryModal;
