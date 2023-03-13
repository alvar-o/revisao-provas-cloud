// Quill
function createQuill(element) {
    return new Quill(element, {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'blockquote', 'strike', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }]
            ]
          },
        theme: 'bubble'
    })
}

let solutionQuill = createQuill('#solutionEditor');
let analysisQuill = createQuill('#analysisEditor');

// Populate fields with data from DB
if (question.time) {
    $('#time').text(question.time);
} else {
    $('#modalChronometer').modal('show');
}
if (question.diffLevel) {
    $('#diffLevel').val(question.diffLevel);
}
if (question.subject) {
    $('#subject').val(question.subject.join());
}
if (question.answer) {
    $('#answer').val(question.answer);
}
if (question.solution) {
    solutionQuill.setContents(JSON.parse(question.solution));
}
if (question.analysis) {
    analysisQuill.setContents(JSON.parse(question.analysis));
}

// Package form data before submitting
$('form').submit((e) => {
    $('#subject').tagsinput('items').forEach(element => {
        let option = `<option>${element}</option>`;
        $('#subjectInput').append(option);
    });

    $('#timeInput').val($('td#time').text());
    $('#subjectInput').val($('#subject').tagsinput('items'));
    $('#solutionInput').val(JSON.stringify(solutionQuill.getContents()));
    $('#analysisInput').val(JSON.stringify(analysisQuill.getContents()));
    return true;
});