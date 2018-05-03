const BtnClass       = ".wt-icon.wt-icon-support";
const CheckedClass   = ".hGEaZt";
const UnCheckedClass = ".jeNOza";

if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
  loopSleep(2000);
}

if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  loopSleep(2000);
}

function loopSleep(_interval) {
  var interval = _interval;
  var loopFunc = function () {
    ouen_btn = $(`${UnCheckedClass} ${BtnClass}`).length
    ouen_zumi_btn = $(`${CheckedClass} ${BtnClass}`).length
    if (ouen_zumi_btn > 90 || ouen_btn === 0) {
      if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
        window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
      } else {
        ProccessPostGoForIt();
      }
      // break機能
      return;
    }
    GoForIt();
    setTimeout(loopFunc, interval);
  }
  loopFunc();
}

// 応援関数
function GoForIt() {
  document.body.style.backgroundColor = "Violet";
  if ($('img.close').length) {
    $('img.close:first').click();
  }
  setTimeout(function() {
    if ($(".dialog-project-support").length === 0) {
      $(`${UnCheckedClass} ${BtnClass}:first`).click();
    }
  }, 1000);
  setTimeout(function(){
    $("input#project-support-modal-checkbox-facebook").each(function(){if(this.checked){this.click()}})
    $("input#project-support-modal-checkbox-twitter").each(function(){if(this.checked){this.click()}})
    // シェアボタンを外せているか確認する余裕を持たしている
    setTimeout(function() {
      $("button.wt-ui-button").click();
    }, 500);
  }, 2000);
};

function ProccessPostGoForIt() {
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
