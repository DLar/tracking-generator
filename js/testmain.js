$(document).ready(() => {
    const id = getUrlParameter("id");

    if (id) {
        $("#code").val(id);
        $("#brand").val(id.substring(0, 4));
        $("#season").val(id.substring(5, 7));
        
        const groups = id.substring(8).split('_');
        for (let i = 0; i < groups.length; i++) {
            switch (i) {
            case 0:
                $("#vendor").val(groups[i].match(/.{1,2}/g));
                break;
            case 1:
                $("#campaigns").val(groups[i].match(/.{1,2}/g));
                break;
            case 2:
                $("#partners").val(groups[i].match(/.{1,4}/g));
                break;
            case 3:
                $("#categories").val(groups[i].match(/.{1,2}/g));
                break;
            case 4:
                $("#name").val(groups[i]);
                break;
            case 5:
                $("#date").val(groups[i].substring(0, 2) + '/' + groups[i].substring(2, 4) + '/20' + groups[i].substring(4));
                break;
            default:
                break;
            }
        }
    }
    
    $("select, input").change(setCode);
    $('#brand, #season, #vendor, #campaigns').selectize();
    $().selectize({ maxItems: 2 });
    $('#partners, #categories').selectize({ maxItems: 4 });
    $('#date').datepicker({ autoclose: true, todayHighlight: true, orientation: "bottom" });
    $('#code').click(function() {$(this).select();});
    $('#copy').click(function() {
        $('#code').select();
        document.execCommand("copy");
        setTimeout(function() {$('#copy').tooltip("hide");}, 500);
    }).tooltip({ placement: "bottom", trigger: "click", title: "Copied!" });
});

function getUrlParameter(sParam) {
    const sURLVariables = window.location.search.substring(1).split('&');
    let sParameterName = "";
    
    for (let i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function setCode() {
    let i = 0;
    let temp = $("#brand").val();
    let cid = (temp ? temp : "XXXX") + "_";

    temp = $("#season").val();
    cid += (temp ? temp : "XX") + "_";

    temp = $("#vendor").val();
    cid += (temp ? temp : "XX") + "_";
   
    temp = $("#campaigns").val();
    for (i = 0; i < 2; i++) {
        cid += temp[i] ? temp[i] : "XX";
    }
    cid += "_";

    temp = $("#partners").val();
    for (i = 0; i < 4; i++) {
        cid += temp[i] ? temp[i] : "XXXX";
    }
    cid += "_";

    temp = $("#categories").val();
    for (i = 0; i < 4; i++) {
        cid += temp[i] ? temp[i] : "XX";
    }
    
    temp = $("#name").val();
    if (temp) {
        cid += "_" + temp.replace(/[^0-9a-z_]/gi,'');
    }

    temp = $("#date").val();
    if (temp) {
        cid += "_" + temp.substring(0, 2) + temp.substring(3, 5) + temp.substring(8);
    }
    
    $("#code").val(cid);
    history.replaceState({}, "", "?id=" + cid);
};
