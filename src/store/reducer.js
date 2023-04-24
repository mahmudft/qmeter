import { ADD_TEMPLATE, REMOVE_TEMPLATE, UPDATE_TEMPLATE } from "./constants";

const initialState = {
  templates: [
    {
      id: 5,
      name: "hghghh",
      subject: "gfghfghfg",
      template: "1",
      from: "Qmeter or 2345",
      customer: "Customerh",
      date: "2023-04-12",
      ckdata: "<p>fghghfhg</p>",
      to: [],
      isSent: false,
    },
    {
      id: 6,
      name: "hghghh",
      subject: "gfghfghfg",
      template: "1",
      from: "Qmeter or 2345",
      customer: "Customerh",
      date: "2023-04-13",
      to: [],
      ckdata: "<p>fghghfhg</p>",
      isSent: true,
    },
  ],
};


export default function mainReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TEMPLATE:
        const template = [...state.templates, action.payload]
        return { ...state, templates: template };
      case REMOVE_TEMPLATE:
        let templates = [...state.templates].filter(row => row.id !== action.payload)
        return { ...state, templates };
      case UPDATE_TEMPLATE:
        let entries = [...state.templates]
        let current = entries.filter(el => el.id != action.payload.id)
        let new_entries = [...current, action.payload]
        return { ...state, templates: new_entries };
      default:
        return state;
    }
}