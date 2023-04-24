import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormGroup, Label, Input, Row } from "reactstrap";
import SearchIcon from "@atlaskit/icon/glyph/search";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { useDispatch } from "react-redux";
import { ADD_TEMPLATE, UPDATE_TEMPLATE } from "./../../store/constants";
import { useParams } from "react-router-dom";
import _uniqueId from "lodash/uniqueId";
import Swal from "sweetalert2";
import "./thread.css";
import Chat from "./chat.png";

const DropdownIndicator = (
  props: DropdownIndicatorProps<ColourOption, true>
) => {
  return (
    <>
      <components.DropdownIndicator {...props}>
        <SearchIcon size="small" label="Emoji" primaryColor="lightgray" />
      </components.DropdownIndicator>
    </>
  );
};


const myRef = React.createRef();

const MailThread = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const rows = useSelector((state) => state.templates);
  const { id } = useParams();
  console.log(id);

  // const formatOptionLabel = ({ value, label }) => (
  //   <div style={{ display: "flex", backgroundColor: "lightgray" }}>
  //     <div>{label}</div>
  //     <div style={{ marginLeft: "10px", color: "#ccc" }}>+</div>
  //   </div>
  // );

  const [customers, setCustomers] = useState([
    {
      value: "customer2@gmail.com",
      label: "customer2@gmail.com",
      isSelected: false,
    },
    {
      value: "customer@gmail.com",
      label: "customer@gmail.com",
      isSelected: false,
    },
  ]);

  const [reciever, setReciever] = useState([]);

  const [state, setState] = useState({
    name: "",
    subject: "",
    template: 1,
    from: "Qmeter or 2345",
    customer: "Customer",
    date: "",
    ckdata: "",
    isSent: false,
  });

  const selectAll = () => {
    setReciever([...[...reciever].map((el) => ({ ...el, isSelected: true }))]);
    setCustomers([
      ...[...customers].map((el) => ({ ...el, isSelected: true })),
    ]);
  }

  const MenuList = (props) => {
    return (
      <components.MenuList {...props}>
        <button style={{border: 'none', backgroundColor: 'white', fontWeight: 600}} onClick={selectAll}>Select All</button>
        {props.children}
      </components.MenuList>
    );
  };

  useEffect(() => {
    getEmailThread();
  });

  const groupedOptions = [
    {
      label: "Customer",
      options: customers,
    },
    {
      label: "Recievers",
      options: reciever,
    },
  ];

  const formatOptionLabel = ({ value, label, isSelected }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "lightgray",
        color: "black",
        margin: "0px",
      }}
    >
      <div>{label}</div>
      <div style={{ color: "black", display: "inline" }}>
        {isSelected ? "✓" : null}
      </div>
    </div>
  );

  const handleFormInput = (event) => {
    let entry = { [event.currentTarget.name]: event.currentTarget.value };
    setState((previousState) => ({
      ...state,
      ...entry,
    }));
    console.log(state);
    console.log({ [event.currentTarget.name]: event.currentTarget?.value });
  };

  const handleOptionEvent = (data) => {
    let selecteds = data.map((el) => el.label);
    let cstm = [...customers];

    let newcstm = cstm.map((el) => {
      if (selecteds.includes(el.label)) {
        el.isSelected = true;
        return el;
      } else {
        el.isSelected = false;
        return el;
      }
    });

    let rcv = [...reciever];
    let newrcv = rcv.map((el) => {
      if (selecteds.includes(el.label)) {
        el.isSelected = true;
        return el;
      } else {
        el.isSelected = false;
        return el;
      }
    });
    setCustomers(newcstm);
    setReciever(newrcv);
  };

  const tryToSendEmail = () => {
    if (state.template.trim() && state.date && state.to.length) {
      Swal.fire({
        title: "Notice",
        text: "Do you want to send email",
        icon: "info",
        showCancelButton: true,
        cancenButtonText: "No",
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (state.id)
            dispatch({
              type: UPDATE_TEMPLATE,
              payload: {
                ...state,
                isSent: true,
                to: reciever.filter((el) => el.isSelected),
              },
            });
          else
            dispatch({
              type: ADD_TEMPLATE,
              payload: {
                ...state,
                id: _uniqueId(),
                isSent: true,
                to: reciever.filter((el) => el.isSelected),
              },
            });
          Swal.fire("Saved!", "", "success");
          history.push("/");
        } else {
          dispatch({
            type: ADD_TEMPLATE,
            payload: {
              ...state,
              id: _uniqueId(),
              isSent: false,
              to: reciever.filter((el) => el.isSelected),
            },
          });
          Swal.fire("Canceled: Saved as draft", "", "info");
          history.push("/");
        }
      });
      console.log({ ...state, id: _uniqueId() });
    }
  };

  const getEmailThread = () => {
    if (id) {
      let row = rows.find((el) => el.id == id);
      setState(row);
      setReciever(row.to);
    } else {
    }
  };
  const onKeyDown = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      let inputVal = event.target.value;
      let rcv = reciever
        .map((el) => el.label)
        .find((el) => el.includes(inputVal));
      let cust = customers
        .map((el) => el.label)
        .find((el) => el.includes(inputVal));
      //   const {select: {state: {menuIsOpen}}} = myRef.current;
      if (
        inputVal.includes("@") &&
        inputVal.lastIndexOf(".") > inputVal.lastIndexOf("@")
      ) {
        if (!rcv || !cust)
          setReciever((previousState) => [
            ...previousState,
            { label: inputVal, value: inputVal, isSelected: true },
          ]);
      }
      console.log(event.target.value);
    }
  };
  return (
    <div className="mail-thread">
      <div className="mail-body">
        <h4>Email thread</h4>
        <hr />
        <div>
          <Row xs="2">
            <FormGroup>
              <Label className="required-field" for="exampleEmail">
                Thread Name
              </Label>
              <Input
                id="name"
                size="md"
                name="name"
                onChange={handleFormInput}
                required
                disabled={state.isSent}
                value={state?.name}
                placeholder="Enter thread name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="template">Template</Label>
              <Input
                placeholder="SelectFeedback Template "
                id="template"
                size="md"
                disabled={state.isSent}
                onChange={handleFormInput}
                defaultValue={2}
                name="template"
                type="select"
              >
                <option value="1">Template 1</option>
                <option value="2">Template 2</option>
                <option value="3">Template 3</option>
              </Input>
            </FormGroup>
          </Row>
          <Row xs="2">
            <FormGroup>
              <Label for="exampleEmail">From</Label>
              <Input
                size="md"
                id="from"
                name="from"
                onChange={handleFormInput}
                placeholder=""
                disabled
                value={state.from}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label className="required-field" for="selectorTo">
                To
              </Label>
              <Select
                isDisabled={state.isSent}
                name="selectorTo"
                isClearable={false}
                closeMenuOnSelect={false}
                components={{ DropdownIndicator, MenuList }}
                onSelect={(event) => console.log(event.value)}
                onChange={(data) => handleOptionEvent(data)}
                styles={{
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "#ced4da",
                    margin: "4px",
                    color: "black",
                    paddingLeft: "20px",
                  }),
                }}
                formatOptionLabel={formatOptionLabel}
                hideSelectedOptions={false}
                value={[
                  ...customers.filter((el) => el.isSelected),
                  ...reciever.filter((el) => el.isSelected),
                ]}
                // onChange={handleOnChange}
                onKeyDown={(event) => onKeyDown(event)}
                placeholder="Add recipients"
                isMulti
                ref={myRef}
                options={groupedOptions}
              />
            </FormGroup>
          </Row>
          <Row xs="2">
            <FormGroup>
              <Label for="exampleEmail">If customer name is empty</Label>
              <Input
                disabled={state.isSent}
                id="customer"
                name="customer"
                onChange={handleFormInput}
                placeholder=""
                value={state.customer}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label className="required-field" for="exampleEmail">
                Start sending
              </Label>
              <Input
                disabled={state.isSent}
                onChange={handleFormInput}
                id="date"
                name="date"
                value={state.date}
                type="date"
              />
            </FormGroup>
          </Row>
          <Row xs="2">
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input
                disabled={state.isSent}
                id="subject"
                name="subject"
                onChange={handleFormInput}
                placeholder="Enter subject here"
                value={state.subject}
                type="text"
              />
            </FormGroup>
          </Row>
        </div>
        <hr />
        <h4>Content</h4>
        <div className="editor-upper-menu">
          <a href="#test"> &#123; Insert Name &#125; </a>
          <Input disabled={state.isSent} bsSize="sm" type="select">
            <option>Insert Feedback Links</option>
          </Input>
          <Input disabled={state.isSent} bsSize="sm" type="select">
            <option>Insert Template</option>
          </Input>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={state.ckdata}
          disabled={state.isSent}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setState((previousState) => ({ ...previousState, ckdata: data }));
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <hr />
        <div className="footer">
          <em>* Don't insert links if template is not selected</em>
          {state.isSent ? (
            <Button size="small" variant="contained">
              <Link to="/">Back</Link>
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "green",
                color: "white",
              }}
              size="small"
              variant="contained"
              onClick={tryToSendEmail}
            >
              Send
            </Button>
          )}
        </div>
      </div>
      <div className="mail-sidebar">
        <p>Sending Info</p>
        <hr />
        <div className="mail-sidebar-body">
          <img
            style={{ width: "30px", height: "30px" }}
            src={Chat}
            alt="chat"
          />
          <p>
            <h3 style={{ margin: "0px" }}>0</h3>
          </p>
          <p>Total email count</p>
        </div>
        <div className="mail-sidebar-bottom">
          <span>Customer Count</span>
          <span>0</span>
        </div>
        <hr />
        <div className="mail-sidebar-bottom">
          <span>Feedback balance</span>
          <span>9000</span>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default MailThread;
