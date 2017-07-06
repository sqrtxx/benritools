
if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
  if ($(".project-support-link").length) {
    AllGoForIt();
    window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
  }
} else if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  if ($(".project-support-link").length != 0) {
    AllGoForIt();
    $.ajax({
      url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
      type: 'GET',
      success: function(data){
        var urls    = data.replace(/\n/g, ',').trim(',').split(',');
        var url_idx = urls.indexOf(location.href);
        for( var i=0; i < urls.length; i++  ) {
          var project_id = urls[i].match(/\d+/)
          var json = {"project_support":{"message":"","project_id": project_id,"post_to_fb_wall":false,"post_to_twitter":false,"post_to_linkedin":false}};
          $.ajax({
            type:"post",
            url:urls[i] + "/supports",
            data:JSON.stringify(json),
            contentType: 'application/json',
            dataType: "json"
          });
          console.log("応援しています。。。")
          if (i == urls.length - 1) {
            alert('応援完了です！\n本日もご協力ありがとうございました！')
            break;
          } 
        }
      }
    })
  }
} 

function AllGoForIt() {
  $('.projects-index-single').each(function(){
    var project_id = $(this).data('project-id');
    var json = {"project_support":{"message":"","project_id": project_id,"post_to_fb_wall":false,"post_to_twitter":false,"post_to_linkedin":false}};
    $.ajax({
      type:"post",
      url:"/projects/" + project_id + "/supports",
      data:JSON.stringify(json),
      contentType: 'application/json',
      dataType: "json"
    });
  });
}
