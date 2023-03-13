var theSubjects = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: subjectList
});

// $('#subject').tagsinput({
//   typeaheadjs: {
//       highlight: true,
//       hint: true,
//       minLength: 1,
//       name: 'subjects',
//       source: theSubjects
//   }
// });


function addTypeAhead(elem) {
  var elt = $(elem);

  elt.tagsinput({
      freeInput: true
  });

  elt.tagsinput('input').typeahead({
        hint: false,
        highlight: true,
        minLength: 0
      },
      {
        name: 'subjects',
        source: theSubjects
      }
  ).bind('typeahead:selected', $.proxy(function (obj, selectedItem) {
      // add tag to tagsinput plugin
      this.tagsinput('add', selectedItem);
      // reset input of tagsinput plugin
      this.tagsinput('input').typeahead('val', '');
      $('.tt-input').attr('size', 1);
      // handle when user selects tag here
  }, elt));

  elt.on('itemRemoved', function (event) {
      // handle when user removes tag here
  });
}

addTypeAhead('#subject')