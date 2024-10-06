// page2.js

let postnr = 0;                                                                  // Keeping track of posts loaded.
let scrollTimeout;                                                               // Keeping track of scrolling timeout.
const url = "https://jsonplaceholder.typicode.com/posts";

function loadPost(){                                                       // Function using API to load and display placeholder posts.
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const post = data[postnr];                                           // Using index-variable to itterate through different posts.
            
            const newPar = document.createElement('p');                          // Creating a new H2 element.
            const newBody = document.createTextNode(capitalize(post.body));      // Storing post-text in new textnode.
            newPar.id = 'scrollParagraph';                                       // Assigning id to new element.
            newPar.appendChild(newBody);                                         // Appending post body to newly created element
            
            const newHead = document.createElement('h2');                        // Creating a new H2 element.    
            const newTitle = document.createTextNode(capitalize(post.title));    // Storing post-header in new textnode.
            newHead.id = 'scrollHeading';                                        // Assigning id to new element. 
            newHead.appendChild(newTitle)                                        // Appending post title to newly created element.  

            const currentDiv = document.getElementById("div1");                  // div1 element temp store in variable. 
            document.body.insertBefore(newHead, currentDiv);                     // Insert heading before currentDiv element. 
            document.body.insertBefore(newPar, currentDiv);                      // Insert text body before currentDiv element. 

            postnr++;                                                            // When done, increment postnr to display different next post.
    })
    .catch(error => { console.log('ERROR: ' + error)
    });
}

function loadInitialPosts() {                                                    // Function loads 10 first posts to fill the page, so that scroll will work. 
    for (let i = 0; i < 10; i++) 
        loadPost();
}

function onScroll() {                                                            // Function to detect if the user has scrolled to the bottom of the page.
    if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
        const scrollPos = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPos >= documentHeight - 10)                                    // Trigger post load when near bottom (and to prevent multiple calls on one scroll.
            loadPost();
    }, 100);                                                                     // Delay of 100ms. 
}

function capitalize(s) {                                                        // Function that capitilizes the FIRST letter of a string (s).
    return s[0].toUpperCase() + s.slice(1);
}

window.addEventListener('scroll', onScroll);

loadInitialPosts();