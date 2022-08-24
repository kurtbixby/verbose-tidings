async function addButtonHandler(event) {
    event.preventDefault();
    console.log(event);

    const form = createPostForm();
    const postsList = document.querySelector('ol');
    postsList.insertAdjacentElement('beforebegin', form);

    event.currentTarget.style.display = 'none';
}

async function submitAddHandler(event) {
    event.preventDefault();
    console.log(event);

    const form = document.querySelector('form');
    const title = form.querySelector('#title').value;
    const body = form.querySelector('#body').value;

    try {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            console.error(response.json());
        }
    } catch (err) {
        console.error(err);
    }
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
            return;
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

function createPostForm() {
    const form = document.createElement('form');
    form.innerHTML = `<div>
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required>
        </div>
        <div>
            <label for="body" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Post Body</label>
            <input type="textarea" id="body" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post Body..." required>
        </div>`
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('text-white', 'bg-green-700', 'hover:bg-green-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-green-300', 'font-medium', 'rounded-lg', 'text-sm', 'w-full', 'sm:w-auto', 'px-5', 'py-2.5', 'text-center', 'dark:bg-green-600', 'dark:hover:bg-green-700', 'dark:focus:ring-green-800');
    button.textContent = 'Create New Post';
    form.appendChild(button);
    form.addEventListener('submit', submitAddHandler);

    return form;
}

document.querySelectorAll('.edit-btn').forEach(e => e.addEventListener('click', editButtonHandler));
document.querySelectorAll('.delete-btn').forEach(e => e.addEventListener('click', deleteButtonHandler));
document.querySelector('#addPostButton').addEventListener('click', addButtonHandler);