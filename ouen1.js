// wantedlyのcjsコード：
// if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
//
//     $.ajax({
//     url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.js',
//     type: 'GET',
//     success: function(data){
//       eval(data);
//     }
//   })
// }
//
// wantedly応援先一覧：https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt
//
//  ６月１１日Bizcast→buysell-technologies→他の応援プロジェクトへ

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

if (location.pathname.match(/^\/companies\/estado\/projects?$/)) {
  GoForIt();
  window.location = "https://www.wantedly.com/companies/buysell-technologies/projects"
  window.alert("aaaa");
}

