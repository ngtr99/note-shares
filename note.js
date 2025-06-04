//add more notes
document.querySelectorAll('.add-note').forEach(element => {
    element.addEventListener('click', () => {
        const note = document.createElement('div');
        note.className = 'note-container';
        note.innerHTML = `
            <p>Name: <input type="text" class="note-name-input"></p>
            <p class="average"></p>
            <button class="action-note">
            <span class="material-symbols-outlined">post_add</span>
            </button>
            <button class="delete-note">
            <span class="material-symbols-outlined">delete</span>
            </button>
            <button class="edit-note">
            <span class="material-symbols-outlined">edit</span>
            </button>
        `;

        // Make input disabled on Enter key
        const input = note.querySelector('.note-name-input');
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
            input.disabled = true;
            }
        });
        document.body.appendChild(note);
    });
});

// Event delegation for note actions
document.body.addEventListener('click', function(event) {
    let quality = 0;
    let price = 0;
    let time = 0;

    const noteInput = document.querySelector('.note-name-input');
    if (noteInput && noteInput.value !== '') {
        noteInput.disabled = true;
    }

    //delete note
    if (event.target.closest('.delete-note')) {
        const note = event.target.closest('.note-container');
        if (note) {
            note.remove();
        }
    }

    //edit note
    if (event.target.closest('.edit-note')) {
        const note = event.target.closest('.note-container');
        if (note) {
            const input = note.querySelector('input[type="text"]');
            if (input) {
                input.disabled = !input.disabled;
                if (!input.disabled) {
                    input.focus();
                }
            }
        }
    }


    //add note
    if (event.target.closest('.action-note')) {
        const note = event.target.closest('.note-container');
        const input = note ? note.querySelector('.note-name-input') : null;
        if (!input || input.value === '') {
            alert('Please enter a name for the note.');
            return;
        } else {
            // Prevent adding duplicate fields
            if (!note.querySelector('.note-extra-fields')) {
                const extraFields = document.createElement('div');
                extraFields.className = 'note-extra-fields';
                extraFields.innerHTML = `
                    <p>Quality: <input type="number" class="quality-input"> Price: <input type="number" class="price-input"></p>
                    <button class="save-note">
                        <span class="material-symbols-outlined">save</span>
                    </button>
                    <button class="remove-note">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                `;
                note.appendChild(extraFields);
            }
        }
    }

    //save note
    if (event.target.closest('.save-note')) {
        const note = event.target.closest('.note-container');
        if (note) {
            // Get previous values from the note element, or default to 0
            price = parseFloat(note.getAttribute('data-price')) || 0;
            quality = parseFloat(note.getAttribute('data-quality')) || 0;
            time = parseInt(note.getAttribute('data-time')) || 0;

            // Add new input values
            price += parseFloat(note.querySelector('.price-input').value) || 0;
            quality += parseFloat(note.querySelector('.quality-input').value) || 0;
            time += 1; // Increment time for each save

            // Store updated values back to the note element
            note.setAttribute('data-price', price);
            note.setAttribute('data-quality', quality);
            note.setAttribute('data-time', time);
            const qualityInput = note.querySelector('.quality-input');
            const priceInput = note.querySelector('.price-input');
            const averageDisplay = note.querySelector('.average');

            if (qualityInput && priceInput && averageDisplay) {
                if (quality > 0 && price > 0) {
                    const average = price / quality;
                    averageDisplay.textContent = `Average price of a share: ${average.toFixed(2)}`;
                } else {
                    averageDisplay.textContent = 'Average price of a share: N/A';
                }
            }

            // Append or update the summary info
            let summary = note.querySelector('.note-summary');
            if (!summary) {
                summary = document.createElement('p');
                summary.className = 'note-summary';
                note.appendChild(summary);
            }
            summary.innerHTML += `<p>Quality: ${note.querySelector('.quality-input').value} Price: ${note.querySelector('.price-input').value} Time: ${time}</p>`;

            // Remove extra fields after saving
            const extraFields = note.querySelector('.note-extra-fields');
            if (extraFields) {
                extraFields.remove();
            }
            

        }
    }

    //remove note
    if (event.target.closest('.remove-note')) {
        const note = event.target.closest('.note-container');
        if (note) {
            const extraFields = note.querySelector('.note-extra-fields');
            if (extraFields) {
                extraFields.remove();
            }
        }
    }

});