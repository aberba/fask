/*In this example, “newMessage” is the custom event type. 
The second parameter is an object with three properties:
detail: a child object providing custom information about the event. 
In this example, we’ve added a message and time.

* bubbles: if true, events will bubble to ancestors of the element which 
  fired the event. unblock any website
* cancelable: if true, events can be canceled using the event object’s 
  stopPropagation() method.
* cancelable: if true, events can be canceled using the event object’s 
  stopPropagation() method.
*/
if (msg && window.CustomEvent) {
	var event = new CustomEvent("newMessage", {
		detail: {
		message: msg,
		time: new Date(),
	},
		bubbles: true,
		cancelable: true
	});

	//Now, we need to dispatch this event on a specific element, e.g.
	e.currentTarget.dispatchEvent(event); // OR
    //document.getElementById("msgbox").dispatchEvent(event);
}

// listen for newMessage event
document.addEventListener("newMessage", function() {}, false);