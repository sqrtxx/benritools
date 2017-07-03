
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
        var text = data.replace(/\n/g, ',').replace(/[^0-9,]/g, '').toString();
        var project_ids = text.substr( 0, text.length-1 ).split(',');
        var first_project_id = project_ids[0];
        window.location = "https://www.wantedly.com/projects/" + first_project_id;
      }
    })
  }
} else {
  $.ajax({
    url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
    type: 'GET',
    success: function(data){
      var urls     = data.replace(/\n/g, ',').trim(',').split(',');
      
      var url_idx = urls.indexOf(location.href);
      
      if (url_idx != -1 && !$('div.disabled.wt-ui-support-button').length && $(".project-support-link").length) {
        GoForIt();
        if (urls.length - 1 != url_idx) {
          var next_url = urls[url_idx + 1]
          console.log(next_url)
          window.location = next_url;
        } else {
          alert('応援完了です！\n本日もご協力ありがとうございました！')
        }
      }
    }
  })
}


// 応援関数
function GoForIt() {
  // setTimeout(function() {
  //   if ($(".dialog-project-support").length === 0) {
  //     $(".project-support-link .wt-icon.wt-icon-support:first").click();
  //   }
  // }, 1000);
  // setTimeout(function(){
  //   $(".data-qtip input:checkbox:lt(1)").each(function(){if(this.checked){this.click()}});
  //   $(".data-qtip input:checkbox:lt(2)").each(function(){if(this.checked){this.click()}});
  //   $(".wt-ui-button.ng-binding")[0].click();
  // }, 2000);

  $('.wt-button.blue.noborder.project-support-link.ng-isolate-scope').each(function(){
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
};



// AllGoForItはプロジェクトを一括応援（/^\/companies\/hogehoge\/projects?$/))に利用可能。
// GoForItは-https://www.wantedly.com/projects/100406のようなものに対応する。
// TODO  プロフィールが更新されましたに対応する。
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




