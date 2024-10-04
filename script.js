
//Remove more imageless posts. Get the words to wrap. Add a circle to follow the mouse.
const postsContainer = document.getElementById('posts-container');

fetch('https://www.reddit.com/r/aww/.json')
    .then(response => response.json()) 
    .then(redditData => {
        const posts = redditData.data.children;

        posts.forEach(post => {

            const postData = post.data;

            if (postData.thumbnail && postData.thumbnail !== "self" && postData.thumbnail !== "default" && postData.thumbnail !== "nsfw") {
                const postDiv = document.createElement('div');

                const postTitle = document.createElement('h2');
                const postImage = document.createElement('img');
                const postLink = document.createElement('a');
                const postBtn = document.createElement('button');

                postDiv.classList.add('postDiv');
                postLink.classList.add('link');
                postBtn.classList.add('button');
                postTitle.classList.add('title');
                postImage.classList.add('image');

                postTitle.textContent = postData.title;
                postImage.src = postData.thumbnail;
                postLink.href = `https://www.reddit.com${postData.permalink}`;
                postLink.textContent = "Post Link";

                postImage.onload = () => {
                    postDiv.appendChild(postTitle);
                    postDiv.appendChild(postImage);
                    postDiv.appendChild(postBtn).appendChild(postLink);
                    postsContainer.appendChild(postDiv);
                };

                postImage.onerror = () => {
                    // If the image doesn't load, do nothing
                };
            }
        })

    })
    .catch(error => {
        console.log("Error fetching data: ", error);
    })

