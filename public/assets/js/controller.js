class Controller {
    constructor() {
        console.log("executing constructor")
        this.delegate(document, "submit", ".create-div", this.createBurger.bind(this));
        this.delegate(document, "click", ".devour-button", this.devourBurger.bind(this));
        //   this.delegate(document, "submit", ".update-form", this.updateQuote.bind(this));
    }
  
    // https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
    delegate(el, evt, sel, handler) {
      el.addEventListener(evt, function(event) {
          let t = event.target;
          while (t && t !== this) {
            if (t.matches(sel)) {
              handler.call(t, event);
            }
            t = t.parentNode;
          }
      });
    };

    createBurger(event) {
      event.preventDefault();
  
      const newBurger = {
        'burger': document.querySelector("#new-burger").value.trim(),
        'devoured': false
      }
  
      const postConfig = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBurger)
      }
  
      fetch("/api/burger", postConfig)
        .then(response => {
          if (response.ok) {
            document.querySelector("#new-burger").value = "";
            return response.json()
          } else {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            })
          }
        })
        .then(jsObj => {
          //location.reload();
          console.log("jsObj = ", jsObj);
        })
        .catch(error => {
          console.log("Error status:", error.status);
          console.log("Error text:", statusText);
        }
      );
    }

    devourBurger(event) {
      event.preventDefault();
      const devourButtonEl = event.target;
      const burgerId = devourButtonEl.getAttribute("data-id");
      console.log("burgerId = ", burgerId);

      const devourBurger = {
        'id': burgerId,
        'devoured': true
      }

      const putConfig = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(devourBurger)
      }

      fetch(`/api/burger/devour/${burgerId}`, putConfig)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject({
              status: response.status,
              statusText: response.statusText
          })
        }
      })
      .then(jsObj => {
        console.log("jsObj = ", jsObj);
        location.reload();
      })
      .catch(error => {
        console.log("Error status:", error.status);
        console.log("Error text:", statusText);
      }
    );
  }
}
