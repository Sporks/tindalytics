 $(document).ready( function(){
	$(".button-primary").on('click', function(){
		var data = {uid: $(".id").val(), ut: $(".token").val()};
		data = JSON.stringify(data);
		$.ajax({
			type: "POST",
			url: "/login", 
			data: data,
			contentType: 'application/json',
			success: function(){
				console.log("success");
			}
		})
	})	
});