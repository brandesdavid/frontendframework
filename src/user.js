import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

const initialState = { firstName: "David", lastName: "Brandes"}

const methods = {
	changeName: (state, firstName) => ({...state, firstName})
}

const template = ({ firstName, lastName, methods }) =>
	div`${onClick(() => 
			methods.changeName("Thomas")
		
		)} Hello ${firstName} ${lastName}`;

export const User = createComponent({ template, methods, initialState});