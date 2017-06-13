
if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
  GoForIt();
  if ($(".project-support-link").length === 0) {
    window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
  }
}

// 応援関数
function GoForIt() {
  setTimeout(function() {
    if ($(".dialog-project-support").length === 0) {
      $(".project-support-link .wt-icon.wt-icon-support:first").click();
    }
  }, 1000);
  setTimeout(function(){
    $(".data-qtip input:checkbox:lt(1)").each(function(){if(this.checked){this.click()}});
    $(".data-qtip input:checkbox:lt(2)").each(function(){if(this.checked){this.click()}});
    $(".wt-ui-button.ng-binding")[0].click();
  }, 2000);
};

if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  GoForIt();
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
          return false;
        }
      }
    }
  }
})
