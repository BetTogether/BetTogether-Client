import React, { useState, useContext } from "react";
import {
  MainWrapper,
  Modal,
  IconButton,
  Top,
  Title,
  Wrapper,
  Container,
  FormWrapper,
  Form,
  Input,
  Button,
} from "./EmailModal.style";
import { ModalContext } from "store/context/ModalContext";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import { useEscapeKey } from "utils/hooks";

interface IEmailModalProps {
  isOpen: boolean;
}

const EmailModal = ({ isOpen }: IEmailModalProps) => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const [box, setBox] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_EMAIL_MODAL",
      payload: !modalState.emailModalIsOpen,
    });

  // Escape key hook
  //useEscapeKey(toggleModal);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await (box as any).private.set("email", newEmail);
  };

  return (
    <MainWrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Send email once resolved...</Title>
          <IconButton onClick={() => toggleModal()}>
            <CrossIcon />
          </IconButton>
        </Top>
        <Wrapper>
          <Container>
            <FormWrapper>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  required
                  placeholder="joe@gmail.com"
                  value={newEmail}
                  onChange={(e: any) => setNewEmail(e.target.value)}
                />
                <Button disabled={newEmail === ""}>Save</Button>
              </Form>
            </FormWrapper>
          </Container>
        </Wrapper>
      </Modal>
    </MainWrapper>
  );
};

export default EmailModal;
