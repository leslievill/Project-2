$(document).ready(()=>{
    $("#submitBtn").on("click", function(event){
        event.preventDefault()
        var category = $("#category").val().trim();
        var title = $("#title").val().trim();   
        var description = $("#description").val().trim();
        var date = $("#date").val().trim();
     
        // console.log(category);
        // console.log(title);
        // console.log(description);
        // console.log(date);
      
        var newActivity = {
            category: category,
            title: title,
            description: description,
            date: date,
            
        }
        // console.log(newActivity);
        postActivity(newActivity);
        
    });

function postActivity(newActivity) {
    var queryUrl = "/api/posts";
    $.post(queryUrl, newActivity, function(data){
        console.log("New post data: ", data);
        window.location.href = "/bucketlist"
    })
}

})