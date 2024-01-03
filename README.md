## notes on creating my own front end framework 
based on mfrachet/create-frontend-framework

## template

> a template is a way of displaying information on the user's browser

### template literals

for simplification, mfrachet uses template literals as a template engine. 
(e.g. `Hello ${firstName}`)

we define div as an arrow function, that takes in the strings of an element we are
evaluating on, and the rest of the parameters.

```javascript
const div = (strings, ...args) => console.log(strings,args);
```

`...args` is called spreading the parameters.

when we call `` div `Hello ${firstName} !` ``, div is called as a tagFunction.
It puts in our strings, and ...args that we have given and returns the value of the template literal.

`output: Hello David!`

### producing an understandable string

we can use [`array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to iterate over the array, and accumulate all the elements together,
into one final value 

```javascript
const createElement = tagName => (strings, ...args) => ({
  type: tagName, // this will be useful for the next chapter
  template: strings.reduce(
    (acc, currentString, index) => acc + currentString + (args[index] || ""),
    ""
  )
});
```

we have now created template literal, to create tag elements.

example:

```javascript
const p = createElement("p");
const { template } = p`Hello ${firstName} ${lastName} !`;
```

## creating the core

```javascript
export const init = (selector, component) => {
	const app = document.querySelector(selector);
	const newElement = document.createElement(component.type);
	const newTextContent = document.createTextNode(component.template);

	newElement.append(newTextContent);
	app.append(newElement);
};

// we can now use the function with e.g. init(" #app ", div`Hello ${firstName} !`);
// here, #app is the id of our div. querySelector returns the first element, that matches the selector
// newElement creates a new Element with the specified type of component (see element.js)
// textContent will then be added as a TextNode in the Document Object Model (DOM)
```

## virtual dom

document object model is a tree, that holds all the parents and children inside. 
it represents the html, for example a div tag, which has a p chidlren

as the manipulation of the dom itself is heavy and slow,
we compute all the objects in memory inside javascript, and then append it
finally onto a dom object.

in React, ReactDOM keeps the virtual dom in memory, while syncing it to the real DOM.
This process is called reconciliation

VDOM itself is more like a concept itself, how it holds information together and communicates between dom and virtual dom.

> for the sake of simplicity, we'll use [snabbdom](https://github.com/snabbdom/snabbdom)

### delegate to VDOM

```
const createElement = tagName => (strings, ...args) => ({
	type: "element",
	template: h(
		tagName,
		{},
		strings.reduce(
			(acc, currentString, index) => acc + currentString + (args[index] || ""),
			""
		)
	)
});
```

> `h` is commonly used to define virtual nodes

### adding event handlers.

we change the type, that every createElement produces, to "element".
> this helps us later to add different functionalities, because the template literals
> don't distinguish between DOM nodes or events attributes such as onClick
