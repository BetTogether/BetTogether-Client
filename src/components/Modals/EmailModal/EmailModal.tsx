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
import { LayoutContext } from "store/Context";
import { Clear } from "@rimble/icons";

interface IEmailModalProps {
  isOpen: boolean;
}

const EmailModal = ({ isOpen }: IEmailModalProps) => {
  const { state, dispatch } = useContext(LayoutContext);
  const [box, setBox] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toggleModal = () =>
    dispatch({ type: "TOGGLE_EMAIL_MODAL", payload: !state.emailModalIsOpen });

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
            <Clear />
          </IconButton>
        </Top>
        <Wrapper>
          <Container>
            <FormWrapper>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="string"
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
