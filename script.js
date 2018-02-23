$(function () {

    $("#tbl").hide();
    $("#btnDeleteRow").hide();
    $("#btnSubmit").hide();
    $("#btnSave").hide();
    var uttIdx = 0;
    $('#btnAddUtterance').click(() => {
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
    let allutterance = []
    $('#contents').mouseup(() => {
        if(window.getSelection().toString()){    
            var selObj = window.getSelection().toString().trim();
            var start = userUtterance.indexOf(selObj);
            var end = (start + selObj.length);
            selectedTexts.push(`{"entity": "`+selObj+`","value": "","start": `+start+`,"end": `+end+`}`);
            console.log(selectedTexts);
        }
    });
    function populateUtterance() {
        $("#tbl").show();
        $("#btnDeleteRow").show();
        $("#btnSubmit").show();
        $("#btnSave").show();
        userUtterance = $('#myInput').val();
        $("#contents").append(`<tr><td>select</td><td>`+userUtterance+`</td><td>output</td></tr>`);
        $('#myInput').val('');
    }

    $('#btnSubmit').click((e) => {
        if(selectedTexts !== "[]")
        saveText( allutterance , "allUtterances.json" );
        else
        alert("Dont forget to select first!")
    });
    
    $('#btnSave').click(() =>{
        //TODO save logic
        allutterance.push(`{"text": "`+userUtterance+`","intent": "extract-content","entities": [`+selectedTexts+`]}`);
        selectedTexts=[];
    });

    function saveText(text, fileName) {
        let a = document.createElement('a');
        a.setAttribute('href', `data:text/plain;charset=utf-u,${encodeURIComponent("["+text+"]")}`);
        a.setAttribute('download', fileName);
        a.click()
    }
});