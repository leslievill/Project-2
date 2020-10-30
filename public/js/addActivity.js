$(document).ready(()=>{
    var detailsCol = $("#detailsCol")

    $(".activity-button").on("click", function(event) {
        event.preventDefault();
        // console.log($(this).data("catego"));
        //console.log($(".activity-button").data("catego"));
        detailsCol.css("display", "block");
        $("#category").val($(this).data("catego"));
    });

    $("#date").datepicker({
        format: "yyyy/mm/dd",
        autoclose: true
    });
});