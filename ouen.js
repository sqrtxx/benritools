if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
  GoForIt();
  already_ouen_num_biz = $(".disabled .wt-icon.wt-icon-support").length
  if (already_ouen_num_biz > 90 || $(".project-support-link").length === 0) {
    window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
  }
}

if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  GoForIt();
  already_ouen_num_sel = $(".disabled .wt-icon.wt-icon-support").length
  if (already_ouen_num_sel > 90 || $(".project-support-link").length === 0) {

    $.ajax({
      url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
      type: 'GET',
      success: function(data){
        var project_ids = data.split(/\n/g);
        project_ids.pop();
        setTimeout(function(){
          project_ids.forEach(function(project_id) {
            console.log("post to " + project_id);
            PostGoForIt(project_id);
          })
        }, 2000)
        alert('応援完了です！\n本日もご協力ありがとうございました！')
      }
    })
  }
}

// 応援関数
function GoForIt() {
  document.body.style.backgroundColor = "Violet";
  setTimeout(function() {
    if ($(".dialog-project-support").length === 0) {
      $(".project-support-link .wt-icon.wt-icon-support:first").click();
    }
  }, 1000);
  setTimeout(function(){
    $("input#checkbox-facebook").each(function(){if(this.checked){this.click()}})
    $("input#checkbox-twitter").each(function(){if(this.checked){this.click()}})
    // シェアボタンを外せているか確認する余裕を持たしている
    setTimeout(function() {
      $("button.wt-ui-button").click();
    }, 500);
  }, 2000);
};

function PostGoForIt(project_id) {
  var referer = "https://www.wantedly.com/projects/" + project_id;
  var json    = {
    "project_support": {
      "message":          "",
      "project_id":       project_id,
      "post_to_fb_wall":  false,
      "post_to_twitter":  false,
      "post_to_linkedin": false
    }
  };

  $.ajax({
    type:        "post",
    url:         "/projects/" + project_id + "/supports",
    data:        JSON.stringify(json),
    contentType: "application/json",
    dataType:    "json",
    headers:     { 'X-Alt-Referer': referer }
  })
}
