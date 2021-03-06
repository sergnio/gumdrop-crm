import React, { ChangeEvent, useState } from "react";
import Form from "../Form";
import Paper from "@material-ui/core/Paper";
import TextArea from "../../atoms/TextArea/TextArea";
import Button from "@material-ui/core/Button";
import useStyles from "../../../global-styles";
import PhoneDisabled from "@material-ui/icons/PhoneDisabled";
import { ContactButtonsRow } from "../../atoms/DatePicker/DPButtons";
import FlexCenter from "../../../styles/FlexCenter";
import Title from "../../styles/Title";
import useUpdateLibrary from "../../../hooks/useUpdateLibrary";
import noop from "../../../utils/noop";
import { useGlobalDatePickerState } from "../../../providers/GlobalDatePickerProvider";

export default function () {
  const { paddingTwo, longWidth } = useStyles();
  const { submitNewNote } = useUpdateLibrary();
  const { noteMessage } = useGlobalDatePickerState();
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);

  const onNoAnswer = () => submitNewNote({ newNote: "Called, but no answer." });

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const note = event.target.value;
    noteMessage.current = note;
    if (note != null && note !== "") {
      setButtonsDisabled(false);
    } else {
      setButtonsDisabled(true);
    }
  };

  return (
    // todo - fix? TextArea uses a form, but I don't actually use the form...
    <Form onSubmit={noop}>
      <Title>Create Notes</Title>
      <Paper className={paddingTwo}>
        <TextArea
          className={longWidth}
          name="New Note"
          placeholderText="Enter a new note here"
          onChangeFunction={onTextAreaChange}
        />
        <FlexCenter>
          <div className={paddingTwo}>
            <ContactButtonsRow disabled={buttonsDisabled} />
            <Button
              variant="outlined"
              onClick={onNoAnswer}
              disabled={buttonsDisabled}
            >
              No Answer{" "}
              <PhoneDisabled style={{ color: "red", paddingLeft: ".1em" }} />
            </Button>
          </div>
        </FlexCenter>
      </Paper>
    </Form>
  );
}
