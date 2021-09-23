import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Component,
} from "react";

import Modal from "../components/Modal";

export const ModalContext = createContext<{
  modal?: any;
  handleModal?: any;
  modalContent?: any;
}>({});

/**
 * ModalProvider
 * @param {Object} props props
 * @returns jsx
 */
const ModalProvider = ({ children }: { children: ReactNode }) => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState<boolean | Component | null>(
    null
  );

  /**
   * handleModal
   * @param {JSX} content of the modal or false when there is no content
   */
  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    } else {
      setModal(false);
    }
  };

  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

/**
 * useModal hook
 * @returns Function
 */
const useModal = () => useContext(ModalContext);
export { ModalProvider, useModal };
