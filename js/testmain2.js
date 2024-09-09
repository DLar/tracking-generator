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
    $('#brand, #season, #vendor, #campaigns, #type, #placement, #version, #number, #objective, #audience, #partners, #categories, #categories2').selectize();
    $('').selectize({ maxItems: 4 });
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

    temp = $("#vendor").val();
    cid += (temp ? temp : "XX") + "_";
    
    temp = $("#campaigns").val();
    cid += (temp ? temp : "XX") ;
    
    temp = $("#type").val();
    cid += (temp ? temp : "XX") + "_";

    temp = $("#placement").val();
    cid += (temp ? temp : "XX") + "_";
    
    temp = $("#version").val();
    cid += (temp ? temp : "XX") + "_";
	
	temp = $("#objective").val();
    cid += (temp ? temp : "XX") + "_";
    
	temp = $("#audience").val();
    cid += (temp ? temp : "XXXX") + "_";
	
	temp = $("#categories").val();
    cid += (temp ? temp : "XX") + "_";
	
    temp = $("#number").val();
    cid += (temp ? temp : "X") + "_";
	
	temp = $("#partners").val();
    cid += (temp ? temp : "XXXX") + "_";
    
    
     temp = $("#uid").val();
    if (temp) {
        cid += "_" + temp.replace(/[^0-9a-z_]/gi,'');
    }
    
    $("#code").val(cid);
    history.replaceState({}, "", "?id=" + cid);
};// JavaScript Document
