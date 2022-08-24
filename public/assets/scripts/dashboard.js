async function addButtonHandler(event) {
    event.preventDefault();
    console.log(event);
}

async function deleteButtonHandler(event) {
    event.preventDefault();
    console.log(event);
    const smallBlogEl = event.target.closest('li');

    try {
        const url = `/api/posts/${smallBlogEl.dataset.postId}`;
        console.log(url)
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
            smallBlogEl.remove();
        } else {
            console.error(response.json());
            window.location.reload;
        }

    } catch (err) {
        console.error(err);
    }
}

async function editButtonHandler(event) {
    event.preventDefault();
    console.log(event);

    const smallBlogEl = event.target.closest('li');
    if (smallBlogEl.dataset.editing) {
        return;
    }
    console.log(smallBlogEl);

    smallBlogEl.dataset.editing = true;

    const postId = smallBlogEl.dataset.postId;

    try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {

        }

        const json = await response.json();
        const bodyText = json.body;
        console.log(json);

        const aEl = smallBlogEl.querySelector('a');
        const postTitle = aEl.textContent;
    
        const textInput = document.createElement('input');
        textInput.value = postTitle;

        aEl.style.display = 'none';
        smallBlogEl.insertAdjacentElement('afterbegin', textInput);
    
        const textArea = document.createElement('textarea');
        textArea.textContent = bodyText;
        smallBlogEl.insertAdjacentElement('beforeend', textArea);

        const submitBtn = document.createElement('button');
        submitBtn.classList.add('edit-submit-btn');
        submitBtn.textContent = 'Submit Edit';
        submitBtn.addEventListener('click', submitEditHandler);
        smallBlogEl.insertAdjacentElement('beforeend', submitBtn);

    } catch (err) {
        console.log(err);
    }
}

async function submitEditHandler(event) {
    // Get id
    const smallBlogEl = event.currentTarget.closest('li');
    const id = smallBlogEl.dataset.postId;

    // Get new title
    const titleEl = smallBlogEl.querySelector('input');
    const title = titleEl.value.trim();

    // Get new body
    const bodyEl = smallBlogEl.querySelector('textarea');
    const body = bodyEl.value;

    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const aEl = smallBlogEl.querySelector('a');
            const submitBtn = smallBlogEl.querySelector('.edit-submit-btn');

            titleEl.remove();
            bodyEl.remove();
            submitBtn.remove();

            aEl.style.display = 'initial';

            smallBlogEl.removeAttribute('data-editing');
        } else {
            console.error(response.json());
        }
    } catch (err) {
        console.error(err);
    }
}

document.querySelectorAll('.edit-btn').forEach(e => e.addEventListener('click', editButtonHandler));
document.querySelectorAll('.delete-btn').forEach(e => e.addEventListener('click', deleteButtonHandler));
document.querySelector('#addPostButton').addEventListener('click', )