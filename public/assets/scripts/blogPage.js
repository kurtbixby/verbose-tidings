async function submitComment(event) {
    event.preventDefault();
    console.log(event);

    const form = document.querySelector('form');
    const id = form.dataset.postId;
    const body = form.querySelector('#comment').value;

    try {
        const response = await fetch(`/api/posts/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ body }),
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

document.querySelector('form').addEventListener('submit', submitComment);