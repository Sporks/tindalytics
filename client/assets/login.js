 $(document).ready( function(){
	$(".button-primary").on('click', function(){
		$.post("server/login.js", {uid: $(".id").val(), ut: $(".token").val} function(){
			console.log("success");
		});
	});
});