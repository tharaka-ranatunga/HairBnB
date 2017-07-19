/**
 * Created by tharaka_ra on 7/18/2017.
 */
// $(document).ready(function() {
//     //toggle `popup` / `inline` mode
//     $.fn.editable.defaults.mode = 'popup';
//
//     //make username editable
//     $('#username').editable();
//
//     //make status editable
//     $('#status').editable({
//         type: 'select',
//         title: 'Select status',
//         placement: 'right',
//         value: 2,
//         source: [
//             {value: 1, text: 'status 1'},
//             {value: 2, text: 'status 2'},
//             {value: 3, text: 'status 3'}
//         ]
//         /*
//          //uncomment these lines to send data on server
//          ,pk: 1
//          ,url: '/post'
//          */
//     });
// });

var editBtn = document.getElementById('editBtn');
var editables = document.querySelectorAll('#title, #author, #content')

editBtn.addEventListener('click', function(e) {
    if (!editables[0].isContentEditable) {
        editables[0].contentEditable = 'true';
        editables[1].contentEditable = 'true';
        editables[2].contentEditable = 'true';
        editBtn.innerHTML = 'Save Changes';
        editBtn.style.backgroundColor = '#6F9';
    } else {
        // Disable Editing
        editables[0].contentEditable = 'false';
        editables[1].contentEditable = 'false';
        editables[2].contentEditable = 'false';
        // Change Button Text and Color
        editBtn.innerHTML = 'Enable Editing';
        editBtn.style.backgroundColor = '#F96';
        // Save the data in localStorage
        for (var i = 0; i < editables.length; i++) {
            localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
        }
    }
});

