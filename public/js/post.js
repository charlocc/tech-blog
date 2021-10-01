// Add a post
const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#content-desc').value.trim();
  const title = document.querySelector('#title-desc').value.trim();
  if (content && title) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ content , title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};

// Delete a Review
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('You can only delete your own posts.');
    }
  }
};



// Get a single post
// const linkHandler = async (event) => {
//   var postId = document.location.pathname
//   postId = postId.split('/');
//   postId = postId[2];
//   if (event.target.hasAttribute('data-id')) {
//     const response = await fetch(`/api/posts/${postId}`, {
//       method: 'GET',
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert('Post not available');
//     }
//   }
// };

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.posts-list')
  .addEventListener('click', delButtonHandler);

// document
//   .querySelector('.data-id')
//   .addEventListener('click', linkHandler);