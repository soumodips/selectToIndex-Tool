$(function () {

    var uttIdx = 0;
    $('#btnAddUtterance').click(function () {
        populateUtterance();
    });

    $("#myInput").keyup(function (event) {
        //If user presses enter, the code will save into the table
        if (event.keyCode === 13) {
            populateUtterance();
            $('#exampleModal').modal('show');
        }
    });

    let userUtterance;
    let selectedTexts = []
    $('#contents').mouseup(() => {
        if(window.getSelection().toString()){    
            var selObj = window.getSelection().toString().trim();
            var start = userUtterance.indexOf(selObj);
            var end = (start + selObj.length);
            selectedTexts.push(`{"entity": "","value": "","start": `+start+`,"end": `+end+`}`);
            console.log(selectedTexts);
        }
    });
    function populateUtterance() {
        userUtterance = $('#myInput').val();
        $("#contents").html(userUtterance);
        $('#myInput').val('');
    }

    $('#btnSubmit').click(function (e) {
        if(selectedTexts !== "[]")
        saveText( selectedTexts , "selectedTexts.json" );
        else
        alert("Dont forget to select first!")
    });

    function saveText(text, fileName) {
        let a = document.createElement('a');
        a.setAttribute('href', `data:text/plain;charset=utf-u,${encodeURIComponent("["+text+"]")}`);
        a.setAttribute('download', fileName);
        a.click()
    }
});