$(document).ready(() => {
    var allAct = $("#allActivities");
      //getActivityTitles();
    $('.toDo').on('click', function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var activityDiv = $('.activityDetails');
    console.log(id);
    activityDiv.each(function(i, ac) {
      if(this.attributes["data-ide"].value == id){
        $(this).css('display', 'block');
        console.log("hola")
      }
      else {
        $(this).css('display', 'none');
      }
      console.log(this.attributes["data-ide"].value, id)
  
    })
});
  

  $('body').on('click', '.deleteBtn', function (event) {
      event.preventDefault();
      var id = $(this).data("id");
      $.ajax("/api/posts/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("Activity Deleted");
        location.reload();
      })
    })
  });