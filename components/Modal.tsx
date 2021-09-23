import { useModal } from "../custom-hooks/use-modal";

/**
 * @returns Modal Component
 * @param {props} Modal Component
 */
const Modal = () => {
  const { modalContent, modal } = useModal();

  if (modal) {
    return (
      <section
        className={`${
          modal ? `z-10` : "-z-1"
        }  modal-blur top-0 right-0 absolute h-screen w-screen overflow-y-hidden`}
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
        id="modal-container"
      >
        <div
          className="absolute top-0 h-full w-full"
          style={{ cursor: "auto" }}
        >
          {modalContent}
        </div>
      </section>
    );
  } else return null;
};

export default Modal;
