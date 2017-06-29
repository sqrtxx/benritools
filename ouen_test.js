
if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {

// 応援済みであれば終了
// if ($(".project-support-link").length === 0) {
//    return false;
//  }

  AllGoForIt();

  if ($(".project-support-link").length === 0) {
    window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
  }
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

if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  AllGoForIt();
  if ($(".project-support-link").length === 0) {

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
}

$.ajax({
  url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
  type: 'GET',
  success: function(data){

    var text = data.replace(/\n/g, ',').replace(/[^0-9,]/g, '').toString();
    var project_ids = text.substr( 0, text.length-1 ).split(',');
    var project_id = location.pathname.replace(/[^0-9]/g,"");
    var first_project_id = project_ids[0];

    if(project_ids.indexOf(project_id) >= 0){
      if($('div.disabled.wt-ui-support-button').length){
      }else{
        GoForIt();
      }
      if ($(".project-support-link").length === 0) {
        if(project_ids.indexOf(project_id) + 1 != project_ids.length){
          var index = project_ids.indexOf(project_id)
          var next_project_number = project_ids[index + 1]
          window.location = "https://www.wantedly.com/projects/" + next_project_number;
        }else{
          if (location.pathname.match(/^\/projects\/108577$/)) {
            alert('応援完了です！\n本日もご協力ありがとうございました！')
          }
          return false;
        }
      }
    }
  }
})
