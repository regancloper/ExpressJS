fetch('/formsubmissions')
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            let h1 = document.createElement('h1');
            h1.textContent = user.name;
            document.body.append(h1);
        });
    });


document.querySelector('[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.querySelector('[type="text"]').value;
    let email = document.querySelector('[type="email"]').value;
    fetch('/signup-form', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                fetch('/formsubmissions')
                    .then(res => res.json())
                    .then(data => {

                        const headers = document.querySelectorAll('h1');
                        headers.forEach(header => document.body.removeChild(header));


                        data.forEach(user => {
                            let h1 = document.createElement('h1');
                            h1.textContent = user.name;
                            document.body.append(h1);
                        });

                    })
            }
        })
});

